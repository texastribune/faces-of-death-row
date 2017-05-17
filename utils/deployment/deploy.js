'use strict';

const s3 = require('./s3');

const config = require('../../project.config');

s3.uploadFiles(config.distDir, {
  dest: config.folder,
  isPublicFile: true,
  shouldCache: true
});
