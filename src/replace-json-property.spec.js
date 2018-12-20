const sut = require('./replace-json-property');
const jsonfile = require('jsonfile');

describe('replace-json-property', () => {

    test('should call readFileSync with the correct path', () => {
        const givenJSON = {
            foo: 'bar',
            bar: 'foo'
        };
        jsonfile.setup(givenJSON);
        const path = './someFolder/someSubFolder';

        sut.replaceJSONPropery(path, 'foo', 'bar');
        expect(jsonfile.readFileSync).toBeCalledWith(path);
    });

    test('it must replace a single property with the given value', () => {
        const givenJSON = {
            foo: 'bar',
            bar: 'foo'
        };
         const expectedJSON = {
            foo: 'foo',
            bar: 'foo'
        };
        const path = './someFolder/someSubFolder';
        const options = {spaces: 2, EOL: '\r\n'};

        jsonfile.setup(givenJSON);
        sut.replaceJSONPropery(path, 'foo', 'foo');

        expect(jsonfile.writeFileSync).toBeCalledWith(path, expectedJSON, options);
    })

});