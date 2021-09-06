const jsonfile = require('jsonfile');
const log = require('./log');

const DEFAULT_OPTIONS = {
    spaces: 2,
    EOL: '\n',
    SILENT: false
};

const replace = (path, property, newValue, options = {}) => {
    options = {
        spaces: options.spaces
            ? parseInt(options.spaces)
            : DEFAULT_OPTIONS.spaces,
        EOL: (options && options.EOL) || DEFAULT_OPTIONS.EOL,
        silent: (options && options.silent) || DEFAULT_OPTIONS.SILENT
    };
    try {
        const file = readFile(path, property, newValue);
        jsonfile.writeFileSync(path, file, options);
        if (!options.silent) {
            log.success(
                `Property: "${property}" in file: ${path} successfully overwritten with "${newValue}"`
            );
        }
    } catch (error) {
        log.error(error);
    }
};

const readFile = (path, property, newValue) => {
    return jsonfile.readFileSync(path, {
        reviver: (key, value) => {
            if (key === property) {
                return newValue;
            }
            return value;
        }
    });
};

module.exports = {
    replace
};
