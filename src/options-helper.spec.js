const sut = require('./options-helper');

describe('options', () => {
    it('should apply the provided space option', () => {
        const spaces = '4';
        const options = sut.extractOptions(spaces);
        expect(options.spaces).toBe(4);
    });

    it('should apply the default space option which is 2', () => {
        const options = sut.extractOptions();
        expect(options.spaces).toBe(2);
    });

    it('should apply the provided EOL option', () => {
        const eol = '\n';
        const options = sut.extractOptions(undefined, eol);
        expect(options.endOfLine).toBe(eol);
    });

    it('should apply the default eol option which is "\r\n"', () => {
        const options = sut.extractOptions();
        expect(options.endOfLine).toBe('\n');
    });
});
