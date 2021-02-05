const parser = require('../lib');
const chai = require('chai');
const fs = require('fs');
const path = require('path');
const { offset, checkErrorWrapper } = require('./testsUtils');

const expect = chai.expect;

describe('asyncapiSchemaFormatParser', function() {
  it('should throw an error because of invalid schema', async function() {
    const invalidAsyncapi = JSON.stringify(JSON.parse(fs.readFileSync(path.resolve(__dirname, './wrong/invalid-payload-asyncapi-format.json'), 'utf8')));
    // const invalidAsyncapi = JSON.parse(fs.readFileSync(path.resolve(__dirname, './wrong/invalid-payload-asyncapi-format.json'), 'utf8'));
    // const invalidAsyncapi = fs.readFileSync(path.resolve(__dirname, './wrong/invalid-payload-asyncapi-format.json'), 'utf8');
    // console.log('invalidAsyncapi below:');
    // console.log(invalidAsyncapi);
    const expectedErrorObject = {
      type: 'https://github.com/asyncapi/parser-js/schema-validation-errors',
      title: 'This is not a valid AsyncAPI Schema Object.',
      parsedJSON: invalidAsyncapi,
      validationErrors: [{
        title: '/channels/mychannel/publish/message/payload/additionalProperties should be object,boolean',
        location: {
          jsonPointer: '/channels/mychannel/publish/message/payload/additionalProperties',
          endColumn: 15,
          endLine: 15,
          endOffset: offset(297, 15),
          startColumn: 38,
          startLine: 13,
          startOffset: offset(252, 13)
        }
      },
      {
        title: '/channels/mychannel/publish/message/payload/additionalProperties should be object,boolean',
        location: {
          jsonPointer: '/channels/mychannel/publish/message/payload/additionalProperties',
          startLine: 13,
          startColumn: 38,
          startOffset: offset(252, 13),
          endLine: 15,
          endColumn: 15,
          endOffset: offset(297, 15)
        }
      },
      {
        title: '/channels/mychannel/publish/message/payload/additionalProperties should be object',
        location: {
          jsonPointer: '/channels/mychannel/publish/message/payload/additionalProperties',
          startLine: 13,
          startColumn: 38,
          startOffset: offset(252, 13),
          endLine: 15,
          endColumn: 15,
          endOffset: offset(297, 15)
        }
      },
      {
        title: '/channels/mychannel/publish/message/payload/additionalProperties should be boolean',
        location: {
          jsonPointer: '/channels/mychannel/publish/message/payload/additionalProperties',
          startLine: 13,
          startColumn: 38,
          startOffset: offset(252, 13),
          endLine: 15,
          endColumn: 15,
          endOffset: offset(297, 15)
        }
      },
      {
        title: '/channels/mychannel/publish/message/payload/additionalProperties should match some schema in anyOf',
        location: {
          jsonPointer: '/channels/mychannel/publish/message/payload/additionalProperties',
          startLine: 13,
          startColumn: 38,
          startOffset: offset(252, 13),
          endLine: 15,
          endColumn: 15,
          endOffset: offset(297, 15)
        }
      }]
    };
    console.log(invalidAsyncapi);
    console.log('schemaFormatting');
    await checkErrorWrapper(async () => {
      await parser.parse(invalidAsyncapi);
    }, expectedErrorObject);
  });
  it('should not throw error if payload not provided', async function() {
    const inputString = `{
      "asyncapi": "2.0.0",
      "info": {
          "title": "My API",
          "version": "1.0.0"
      },
      "channels": {
        "mychannel": {
          "publish": {
            "message": {
            }
          }
        }
      }
    }`;
    const parsedInput = JSON.parse(inputString);

    expect(async () => await parser.parse(parsedInput)).to.not.throw();
  });
});
