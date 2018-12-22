const jsonfile = require('jsonfile');
const chalk = require('chalk');

const replace = (path, property, newValue) => {
    try {
        const file = jsonfile.readFileSync(path, {
            reviver: (key, value) => {
                if (key === property) {
                    return newValue;
                }
                return value;
            }
        });
        jsonfile.writeFileSync(path, file, { spaces: 2, EOL: '\r\n' });
        console.log(
            chalk.inverse.bold('Replace-json-property:') +
                ' ' +
                chalk.green.bold(
                    `Property: "${property}" in file: ${path} successfully overwritten with "${newValue}"`
                )
        );
    } catch (error) {
        console.error(
            chalk.inverse.bold('Replace-json-property:') +
                ' ' +
                chalk.red.bold(error)
        );
    }
};

module.exports = {
    replace
};
