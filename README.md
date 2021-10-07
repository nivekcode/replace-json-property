

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![codecov](https://codecov.io/gh/kreuzerk/replace-json-property/branch/master/graph/badge.svg)](https://codecov.io/gh/kreuzerk/replace-json-property)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

![Logo](https://raw.githubusercontent.com/kreuzerk/replace-json-property/master/assets/logo.png)

This module allows you to replace a specific property in a JSON.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Comand line usage](#comand-line-usage)
  - [Short form](#short-form)
- [Usage from code](#usage-from-code)
- [Options](#options)
- [Help command](#help-command)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Comand line usage

You can use this via the following command:

```
replace-json-property pathToFile property value
```

This command replaces all occurences of the matching property. It also replaces
occurences in nested objects or objects in arrays.

The following command would replace all values of the `foo` property with 'test' inside the `test.json`.
```
replace-json-property ./test.json foo test,
```
Executing the command above on the given JSON
```json
{
    "foo": "bar",
    "a": {
        "b": 1,
        "foo": "bar",
        "c": [
            {"d": 1, "foo": "bar"},
            {"d": 2, "foo": "bar"},
            {"d": 3, "foo": "bar"},
        ]
    }
}
```
results in:

```json
{
    "foo": "test",
   	"a": {
        "b": 1,
        "foo": "test",
        "c": [
            {"d": 1, "foo": "test"},
            {"d": 2, "foo": "test"},
            {"d": 3, "foo": "test"},
        ]
    }
}
```
### Short form

All commands explained above can also be run with the shortcut version `rjp`.
```
rjp ./test.json foo test,
```

## Usage from code

You can also use the replace function in your JavaScript code.

1. Using module imports

   ```javascript
   import {replace} from 'replace-json-property';

   replace('./environment/test.json', 'foo', 'new value');
   ```

2. Using commonjs

   ```javascript
   const replaceJSONProperty = require('replace-json-property');

   replaceJSONProperty.replace('./environment/test.json', 'foo', 'new value');
   ```

## Options

The following flags allow you to configure how the resulting file is written.

| Option | Description | Default |
| ------------- | ------------- |-----|
| -s or --spaces  | Add the spaces the file should be written with, for example (2, 4) | 2|
| -e or --eol  | Add the line ending the file should be written with, for example "\r\n" | "\n"|
| --silent | Silent mode. Executes without log messages | False |
| --limit | Limit the number of replacements | 0 (unlimited) |

## Help command

You can always run the help command to see how the signature looks
```
replace-json-property -h
```
or
```
replace-json-property --help
```
To get the current version use the --version or -v command.

