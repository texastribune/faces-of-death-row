'use strict';

const path = require('path');
const s3 = require('./s3');

const config = require('../../project.config');

s3.uploadFiles(config.assetsDir, {
  dest: path.join(config.folder, config.rawAssetsFolder)
});
