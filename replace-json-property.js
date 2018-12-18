#!/usr/bin/env node

const commander = require('commander');
const jsonfile = require('jsonfile');

let path;
let property;
let value;

commander
    .version('1.0.0')
    .arguments('<path> <property> <value>')
    .action(function (pathArg, propertyArg, valueArg) {
        path = pathArg;
        property = propertyArg;
        value = valueArg;
    })
    .parse(process.argv);

const file = jsonfile.readFileSync(path);
file[property] = value;
jsonfile.writeFileSync(path, file, { spaces: 2, EOL: '\r\n' });
