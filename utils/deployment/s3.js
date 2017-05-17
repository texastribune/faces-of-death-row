'use strict';

const AWS = require('aws-sdk');
const cacheLookup = require('./cache-lookup');
const chalk = require('chalk');
const crypto = require('crypto');
const fs = require('fs');
const glob = require('globby');
const https = require('https');
const mime = require('mime-types');
const mkdirp = require('mkdirp');
const path = require('path');

AWS.config.update({
  httpOptions: {
    agent: new https.Agent({
      keepAlive: true,
      maxSockets: 20
    })
  }
});

const config = require('../../project.config');
const s3 = new AWS.S3({params: {
  Bucket: config.bucket
}});

/**
 * Uploads a file to S3. Checks to see if an identical version of the file
 * already exists, and aborts if so.
 *
 * @param  {String} filename
 * @param  {Object} options
 */
function uploadFile (filename, options) {
  const opts = Object.assign({}, {
    isPublicFile: false,
    shouldCache: false
  }, options);

  const Key = path.join(opts.dest, flattenPath(filename, opts.source));
  const fullS3Path = path.join(config.bucket, Key);

  isFileIdenticaltoS3File(filename, Key, (err, isIdentical) => {
    if (err) throw err;
    if (isIdentical) return console.log(chalk.gray(`${fullS3Path}: Has not changed`));

    const Body = fs.createReadStream(filename);
    const ContentType = mime.lookup(filename) || 'application/octet-stream';
    const ACL = opts.isPublicFile ? 'public-read' : 'private';

    const params = {
      ACL,
      Body,
      ContentType,
      Key
    };

    if (opts.shouldCache) {
      const cacheParams = cacheLookup(ContentType);
      if (cacheParams) params.CacheControl = cacheParams.control;
    }

    s3.putObject(params, (err, data) => {
      if (err) throw err;
      console.log(chalk.green(`Uploaded: ${fullS3Path}`));
    });
  });
}

/**
 * Accepts a glob and passes those files to `uploadFile`. Any supplied options
 * are also passed.
 *
 * @param  {String|Array.<String>} dir
 * @param  {Object} opts
 */
function uploadFiles (dir, opts) {
  opts = Object.assign({
    source: dir
  }, opts);

  glob(path.join(dir, '**', '*'), {nodir: true}).then((paths) => {
    paths.forEach((p) => uploadFile(p, opts));
  });
}

/**
 * Downloads an S3 file located at `Key`.
 * @param  {String} Key
 * @param  {Object} options
 */
function downloadFile (Key, options) {
  const opts = options || {};

  const localFilePath = path.join(opts.dest, flattenPath(Key, opts.s3Dir));

  isFileIdenticalToMD5(localFilePath, opts.ETag, (err, isIdentical) => {
    if (err) throw err;
    if (isIdentical) return console.log(chalk.gray(`${localFilePath}: File already present`));

    mkdirp(path.dirname(localFilePath), (err) => {
      if (err) throw err;

      const output = fs.createWriteStream(localFilePath);
      output.on('finish', () => console.log(chalk.green(`Downloaded: ${localFilePath}`)));
      s3.getObject({Key}).createReadStream().pipe(output);
    });
  });
}

/**
 * Accepts a directory on S3 and downloads those files to the local machine.
 *
 * @param  {String} s3Dir
 * @param  {Object} options
 */
function downloadFiles (s3Dir, options) {
  const Prefix = s3Dir;

  const params = {
    Prefix
  };

  // TODO: Support more than 1000 files
  s3.listObjectsV2(params, (err, data) => {
    if (err) throw err;

    data.Contents.forEach((o) => {
      const Key = o.Key;
      const ETag = o.ETag;

      const opts = Object.assign({}, options, {
        ETag,
        Key,
        s3Dir
      });

      downloadFile(Key, opts);
    });
  });
}

/**
 * Flatten a file's path against its source. Used to remove extra parts of
 * the path that shouldn't interact with S3.
 *
 * @param  {String} filepath
 * @param  {String} source
 * @return {String}
 * @example
 *
 * flattenPath('dist/scripts/main.js', 'dist')
 * # returns 'scripts/main.js'
 *
 * flattenPath('app/assets/images/corgi.jpg', './app/assets')
 * # returns 'images/corgi.jpg'
 */
function flattenPath (filepath, source) {
  const sep = path.sep;
  const distance = path.normalize(source).split(sep).length;

  return path.join.apply(path, filepath.split(sep).slice(distance));
}

/**
 * Takes a file and calculates the md5 hash for it. This is used to make
 * comparisons against the `ETag` of files on S3.
 *
 * @param  {String} filename
 * @param  {Function} callback
 */
function md5HashFile (filename, callback) {
  const file = fs.createReadStream(filename);
  const hash = crypto.createHash('md5');

  file.on('data', (data) => hash.update(data));
  file.on('error', (err) => {
    // if the file does not exist, that's fine, otherwise propagate the error
    // normally
    if (err.code === 'ENOENT') return callback(null, null);

    return callback(err);
  });
  file.on('end', () => callback(null, `"${hash.digest('hex')}"`));
}

/**
 * Retrieves the ETag of an object in S3. Because this doesn't try to get the
 * actual file, it's faster than something like `getObject`.
 *
 * @param  {String} Key
 * @param  {Function} callback
 */
function getS3ObjectETag (Key, callback) {
  const params = {
    Key
  };

  s3.headObject(params, (err, data) => {
    if (err) {
      // if the file does not exist, that's fine, otherwise propagate the error
      // normally
      if (err.code === 'NotFound') {
        return callback(null, null);
      }

      return callback(err);
    }

    callback(null, data.ETag);
  });
}

/**
 * Checks to see if a local file's MD5 hash matches another MD5 hash. Passes a
 * boolean result to a callback.
 *
 * @param  {String} filename
 * @param  {String} md5
 * @param  {Function} callback
 */
function isFileIdenticalToMD5 (filename, md5, callback) {
  md5HashFile(filename, (err, fileETag) => {
    if (err) return callback(err);

    callback(null, (fileETag === null || md5 === null) ? false : fileETag === md5);
  });
}

/**
 * Checks to see if a local file and a file on S3 have the same md5 hash.
 * Passes a boolean result to a callback. This function only does a HEAD check
 * against S3 and does not try to download the entire file.
 *
 * @param  {String} filename
 * @param  {String} Key
 * @param  {Function} callback
 */
function isFileIdenticaltoS3File (filename, Key, callback) {
  getS3ObjectETag(Key, (err, S3ETag) => {
    if (err) return callback(err);

    isFileIdenticalToMD5(filename, S3ETag, callback);
  });
}

module.exports = {
  downloadFiles,
  uploadFile,
  uploadFiles
};
