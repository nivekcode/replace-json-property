#!/usr/bin/env node
const commander = require('commander');
const version = require('../package').version;
const replaceJsonProperty = require('../src/replace-json-property');

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
    .option('--silent [boolean]', 'Silent mode. Executes without log messages')
    .action(function(path, property, value) {
        replaceJsonProperty.replace(path, property, value, {
            spaces: commander.spaces,
            EOL: commander.eol,
            silent: commander.silent
        });
    })
    .parse(process.argv);
