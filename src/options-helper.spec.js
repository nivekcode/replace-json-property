const sut = require('./options');

describe('options', () => {
    it('should apply the provided space option', () => {
        const space = 4;
        const options = sut.extractOptions(space);
        expect(options.space).toBe(space);
    });

    it('should apply the default space option which is 2', () => {
        const options = sut.extractOptions();
        expect(options.space).toBe(2);
    });

    it('should apply the provided EOL option', () => {
        const eol = '\n';
        const options = sut.extractOptions(undefined, eol);
        expect(options.endOfLine).toBe(eol);
    });

    it('should apply the default eol option which is "\r\n"', () => {
        const options = sut.extractOptions();
        expect(options.endOfLine).toBe('\r\n');
    });
});
