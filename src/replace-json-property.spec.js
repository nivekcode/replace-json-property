const jsonfile = require('jsonfile');

const sut = require('./replace-json-property');
const log = require('./log');

describe('replace-json-property', () => {
    log.success = jest.fn();
    log.error = jest.fn();

    describe('Replace', () => {
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
            sut.replace('somePath', 'foo', expectedValue, {});

            const reviver = extractReviver(jsonfile.readFileSync);
            const value = reviver('foo', 'someValue');

            expect(value).toBe(expectedValue);
        });

        test('should not replace the value with the new value if the key matches', () => {
            const expectedValue = 'bar';
            sut.replace('somePath', 'foo', 'someValue', {});

            const reviver = extractReviver(jsonfile.readFileSync);
            const value = reviver('someProperty', expectedValue);

            expect(value).toBe(expectedValue);
        });

        test('should log a succcess message if everything was successfull', () => {
            sut.replace('somePath', 'foo', 'bar', {});
            expect(log.success).toHaveBeenCalled();
        });

        test('should log an error message if something went wrong', () => {
            const throwError = true;
            jsonfile.setup({}, throwError);
            sut.replace('somepath', 'foo', 'bar', {});
            expect(log.error).toHaveBeenCalled();
        });
    });

    describe('options', () => {
        beforeEach(() => {
            jest.resetAllMocks();
        });

        test('should apply the provided space option and add the default EOL', () => {
            const path = './foo/test.json';
            const property = 'foo';
            const newValue = 'bar';
            const options = { spaces: 4 };

            sut.replace(path, property, newValue, options);
            expect(jsonfile.writeFileSync).toHaveBeenCalledWith(
                expect.anything(),
                undefined,
                {
                    spaces: 4,
                    EOL: '\n'
                }
            );
        });

        test('should apply the default space and EOL options', () => {
            const path = './foo/test.json';
            const property = 'foo';
            const newValue = 'bar';

            sut.replace(path, property, newValue, null);
            expect(jsonfile.writeFileSync).toHaveBeenCalledWith(
                expect.anything(),
                undefined,
                {
                    spaces: 2,
                    EOL: '\n'
                }
            );
        });

        test('should apply the provided EOL option and use the default space option', () => {
            const path = './foo/test.json';
            const property = 'foo';
            const newValue = 'bar';
            const options = { endOfLine: '\n\r' };

            sut.replace(path, property, newValue, options);
            expect(jsonfile.writeFileSync).toHaveBeenCalledWith(
                expect.anything(),
                undefined,
                {
                    spaces: 2,
                    EOL: '\n\r'
                }
            );
        });
    });
});
