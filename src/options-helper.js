const log = require('./log');
const DEFAULT_SPACE = 2;
const DEFAULT_EOL = '\n';

const extractOptions = (spaces, endOfLine) => {
    return {
        spaces: spaces ? parseInt(spaces) : applyDefaultSpaces(),
        endOfLine: endOfLine || applyDefaultEOL()
    };
};

const applyDefaultSpaces = () => {
    log.info(
        'No space provided, file will be writen with 2 spaces which is the default'
    );
    return DEFAULT_SPACE;
};

const applyDefaultEOL = () => {
    log.info(
        'No EOL provided, file will be writen with "\r\n" which is the default'
    );
    return DEFAULT_EOL;
};

module.exports = { extractOptions };
