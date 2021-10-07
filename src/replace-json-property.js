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
        limit: parseInt((options && options.limit) || DEFAULT_OPTIONS.LIMIT, 10)
    };
    try {
        const file = readFile(path, property, newValue, options.limit);
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

const readFile = (path, property, newValue, limit) => {
    let limitCounter = 0;
    return jsonfile.readFileSync(path, {
        reviver: (key, value) => {
            if (key === property) {
                if (limit > 0 && limitCounter >= limit) {
                    return value;
                }
                ++limitCounter;
                return newValue;
            }
            return value;
        }
    });
};

module.exports = {
    replace
};
