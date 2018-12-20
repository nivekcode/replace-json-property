#!/usr/bin/env node
const commander = require('commander');
const version = require('../package').version;

commander
    .version(version)
    .arguments('<path> <property> <value>')
    .action(function (pathArg, propertyArg, valueArg) {
        path = pathArg;
        property = propertyArg;
        value = valueArg;
    })
    .parse(process.argv);
