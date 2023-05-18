const jsonfile = require('jsonfile');
const log = require('./log');

const DEFAULT_OPTIONS = {
    spaces: 2,
    EOL: '\n',
    LIMIT: 0,
    SILENT: false
};

const replace = (path, property, newValue, options = {}) => {
    options = {
        spaces: options.spaces
            ? parseInt(options.spaces)
            : DEFAULT_OPTIONS.spaces,
        EOL: (options && options.EOL) || DEFAULT_OPTIONS.EOL,
        silent: (options && options.silent) || DEFAULT_OPTIONS.SILENT,
        limit: parseInt(
            (options && options.limit) || DEFAULT_OPTIONS.LIMIT,
            10
        ),
        add: options && options.add
    };
    try {
        const file = updateFile(path, property, newValue, options);
        jsonfile.writeFileSync(path, file, options);
        if (!options.silent) {
            log.success(
                `Properties: "${property}" in file: ${path} successfully overwritten with "${newValue}"`
            );
        }
    } catch (error) {
        log.error(error);
    }
};

const updateFile = (path, property, newValue, options) => {
    const { limit, add } = options;

    let limitCounter = 0;
    let propertyExists = false;
    const revivedJson =
        jsonfile.readFileSync(path, {
            reviver: (key, value) => {
                if (key === property) {
                    propertyExists = true;
                    if (limit > 0 && limitCounter >= limit) {
                        return value;
                    }
                    ++limitCounter;
                    return newValue;
                }
                return value;
            }
        }) || {};

    if (!propertyExists && add) {
        revivedJson[property] = newValue;
    }
    return revivedJson;
};

module.exports = {
    replace
};
