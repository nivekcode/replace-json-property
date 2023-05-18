const jsonfile = require('jsonfile');

const sut = require('./replace-json-property');
const log = require('./log');

describe('replace-json-property', () => {
    beforeEach(() => {
        jsonfile.setup({}, false);
        log.success = jest.fn();
        log.error = jest.fn();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('Replace', () => {
        const extractReviver = jestFunction =>
            jestFunction.mock.calls[0][1].reviver;

        test('should call readFileSync with the correct path and an object with a reviver function', () => {
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

        test('should not replace the value with the new value if the key does not match', () => {
            const expectedValue = 'bar';
            sut.replace('somePath', 'foo', 'someValue', {});

            const reviver = extractReviver(jsonfile.readFileSync);
            const value = reviver('someProperty', expectedValue);

            expect(value).toBe(expectedValue);
        });

        test('should log a succcess message if everything was successful', () => {
            sut.replace('somePath', 'foo', 'bar', {});
            expect(log.success).toHaveBeenCalled();
        });

        test('should log an error message if something went wrong', () => {
            const throwError = true;
            jsonfile.readFileSync = jest.fn(() => {
                throw 'Something went wrong';
            });
            sut.replace('somepath', 'foo', 'bar', {});
            expect(log.error).toHaveBeenCalled();
        });
    });

    describe('add keys', () => {
        test('should add the property if the property does not exist and the add option is enabled', () => {
            sut.replace('some-path', 'foo', 'bar', { add: true });
            expect(jsonfile.writeFileSync).toHaveBeenCalledWith(
                expect.anything(),
                expect.objectContaining({ foo: 'bar' }),
                expect.anything()
            );
        });

        test('should not add the property if the property does not exist and the add option is enabled', () => {
            sut.replace('some-path', 'foo', 'bar', { add: false });
            expect(jsonfile.writeFileSync).toHaveBeenCalledWith(
                expect.anything(),
                expect.objectContaining({}),
                expect.anything()
            );
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
                expect.anything(),
                {
                    spaces: 4,
                    EOL: '\n',
                    silent: false,
                    limit: 0
                }
            );
        });

        test('should apply the default space, EOL and silent options', () => {
            const path = './foo/test.json';
            const property = 'foo';
            const newValue = 'bar';

            sut.replace(path, property, newValue);
            expect(jsonfile.writeFileSync).toHaveBeenCalledWith(
                expect.anything(),
                expect.anything(),
                {
                    spaces: 2,
                    EOL: '\n',
                    silent: false,
                    limit: 0
                }
            );
        });

        test('should apply the provided EOL option and use the default space, limit, and silent option', () => {
            const path = './foo/test.json';
            const property = 'foo';
            const newValue = 'bar';
            const options = { EOL: '\n\r' };

            sut.replace(path, property, newValue, options);
            expect(jsonfile.writeFileSync).toHaveBeenCalledWith(
                expect.anything(),
                expect.anything(),
                {
                    spaces: 2,
                    EOL: '\n\r',
                    silent: false,
                    limit: 0
                }
            );
        });

        test('should apply the provided silent option and use the default space, limit, and EOL option', () => {
            const path = './foo/test.json';
            const property = 'foo';
            const newValue = 'bar';
            const options = { silent: true };

            sut.replace(path, property, newValue, options);
            expect(jsonfile.writeFileSync).toHaveBeenCalledWith(
                expect.anything(),
                expect.anything(),
                {
                    spaces: 2,
                    EOL: '\n',
                    silent: true,
                    limit: 0
                }
            );
        });

        test('should apply the provided limit option and use the default space, silent, and EOL option', () => {
            const path = './foo/test.json';
            const limit = 2;
            const property = 'foo';
            const newValue = 'bar';
            const options = { limit };

            sut.replace(path, property, newValue, options);
            expect(jsonfile.writeFileSync).toHaveBeenCalledWith(
                expect.anything(),
                expect.anything(),
                {
                    spaces: 2,
                    EOL: '\n',
                    silent: false,
                    limit
                }
            );
        });
    });
});
