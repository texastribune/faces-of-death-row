'use strict';

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const config = require('../../project.config');
const fetch = require('./fetch');
const htmlToArchieML = require('./html-to-archieml');
const xlsxToCopyText = require('./xlsx-to-copytext');

fetch(config.files, (err, data, file) => {
  if (err) throw err;

  const filePath = path.join(config.dataDir, `${file.name}.json`);

  if (file.type === 'doc') {
    htmlToArchieML(data, (err, d) => {
      if (err) throw err;
      fs.writeFileSync(filePath, JSON.stringify(d, null, 2));
      logDownload(file.name, file.fileId, 'magenta');
    });
  }

  if (file.type === 'sheet') {
    xlsxToCopyText(data, file.copytext, (err, d) => {
      if (err) throw err;
      fs.writeFileSync(filePath, JSON.stringify(d, null, 2));
      logDownload(file.name, file.fileId, 'cyan');
    });
  }
});

function logDownload (fileName, fileId, color) {
  console.log(chalk[color](`Downloaded \`${fileName}\` (${fileId})`));
}
