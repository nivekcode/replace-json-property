const sut = require('./replace-json-property');
const jsonfile = require('jsonfile');

describe('replace-json-property', () => {
    console.log = jest.fn();
    console.error = jest.fn();

    const extractReviver = jestFunction =>
        jestFunction.mock.calls[0][1].reviver;

    test('should call readFileSync with the correct patha and an object with a reviver function', () => {
        const path = './someFolder/someSubFolder';
        sut.replace(path, 'foo', 'bar');
        expect(jsonfile.readFileSync).toBeCalledWith(path, {
            reviver: expect.any(Function)
        });
    });

    test('should replace the value with the new value if the key matches', () => {
        const expectedValue = 'bar';
        sut.replace('somePath', 'foo', expectedValue);

        const reviver = extractReviver(jsonfile.readFileSync);
        const value = reviver('foo', 'someValue');

        expect(value).toBe(expectedValue);
    });

    test('should not replace the value with the new value if the key matches', () => {
        const expectedValue = 'bar';
        sut.replace('somePath', 'foo', 'someValue');

        const reviver = extractReviver(jsonfile.readFileSync);
        const value = reviver('someProperty', expectedValue);

        expect(value).toBe(expectedValue);
    });

    test('should log a succcess message if everything was successfull', () => {
        sut.replace('somePath', 'foo', 'bar');
        expect(console.log).toHaveBeenCalled();
    });

    test('should log an error message if something went wrong', () => {
        const throwError = true;
        jsonfile.setup({}, throwError);
        sut.replace('somepath', 'foo', 'bar');
        expect(console.error).toHaveBeenCalled();
    });
});
