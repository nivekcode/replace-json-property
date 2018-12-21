const jsonfile = require('jsonfile');

const replace = (path, property, newValue) => {
    const file = jsonfile.readFileSync(path, {
        reviver: (key, value) => {
            if (key === property) {
                return newValue;
            }
            return value;
        }
    });
    jsonfile.writeFileSync(path, file, { spaces: 2, EOL: '\r\n' });
};

module.exports = {
    replace
};
