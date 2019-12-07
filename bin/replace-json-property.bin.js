#!/usr/bin/env node
const commander = require('commander');
const version = require('../package').version;
const replaceJsonProperty = require('../src/replace-json-property');
const optionsHelper = require('../src/options-helper');

commander
    .version(version)
    .arguments('<path> <property> <value>')
    .option(
        '-s --spaces [number]',
        'Add the spaces the file should be written with, for example (2, 4)'
    )
    .option(
        '-e --eol [string]',
        'Add the line ending the file should be written with, for example "\\r\\n"'
    )
    .action(function(path, property, value) {
        const options = optionsHelper.extractOptions(
            commander.spaces,
            commander.eol
        );
        replaceJsonProperty.replace(path, property, value, options);
    })
    .parse(process.argv);
