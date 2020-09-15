const jsonfile = require('jsonfile');
const log = require('./log');

const DEFAULT_OPTIONS = {
    spaces: 2,
    endOfLine: '\n'
};

const replace = (path, property, newValue, options = {}) => {
    options = { ...DEFAULT_OPTIONS, ...options };
    try {
        const file = readFile(path, property, newValue);
        jsonfile.writeFileSync(path, file, {
            spaces: options.spaces,
            EOL: options.endOfLine
        });
        log.success(
            `Property: "${property}" in file: ${path} successfully overwritten with "${newValue}"`
        );
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
