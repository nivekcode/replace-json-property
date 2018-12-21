#!/usr/bin/env node
const commander = require('commander');
const version = require('../package').version;
const replaceJsonProperty = require('../src/replace-json-property');

commander
    .version(version)
    .arguments('<path> <property> <value>')
    .action(function(path, property, value) {
        replaceJsonProperty.replace(path, property, value);
    })
    .parse(process.argv);
