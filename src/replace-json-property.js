const jsonfile = require('jsonfile');

const replace = (path, property, value) => {
    const file = jsonfile.readFileSync(path);
    file[property] = value;
    jsonfile.writeFileSync(path, file, {spaces: 2, EOL: '\r\n'});
};

module.exports = {
    replace
};
