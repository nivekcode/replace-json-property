'use strict';
const jsonfile = jest.genMockFromModule('jsonfile');

let mockedReadFileResponse;

const setup = responseMock => (mockedReadFileResponse = responseMock);
const readFileSync = jest.fn(() => mockedReadFileResponse);
const writeFileSync = jest.fn((path, file) => {});

jsonfile.setup = setup;
jsonfile.readFileSync = readFileSync;
jsonfile.writeFileSync = writeFileSync;

module.exports = jsonfile;
