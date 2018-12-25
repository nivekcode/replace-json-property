const log = require('./log');
const DEFAULT_SPACE = 2;
const DEFAULT_EOL = '\r\n';

const extractOptions = (space, endOfLine) => {
    return {
        space: space || applyDefaultSpace(),
        endOfLine: endOfLine || applyDefaultEOL()
    };
};

const applyDefaultSpace = () => {
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
