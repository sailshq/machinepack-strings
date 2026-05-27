/**
 * UUID v4 generation adapted from the `uuid` npm package
 * (https://github.com/uuidjs/uuid), MIT License:
 *
 * Copyright (c) 2010-2020 Robert Kieffer and other contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
 * associated documentation files (the "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
 * THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

module.exports = {


  friendlyName: 'UUID',


  description: 'Generate a universally unique identifier (UUID v4).',


  extendedDescription:
  'A UUID is a pseudo-random, 36-digit string, consisting of five groups of hexadecimal digits (numerals '+
  '[0-9] and lowercase letters [a-f]), separated by hyphens.  UUIDs are standardized by '+
  '[RFC4122](http://www.ietf.org/rfc/rfc4122.txt).  Specifically, _this_ implementation generates UUIDs '+
  'according to version 4 of the specification.',


  moreInfoUrl: 'https://en.wikipedia.org/wiki/Universally_unique_identifier',


  sync: true,


  sideEffects: 'cacheable',


  exits: {

    success: {
      outputFriendlyName: 'UUID',
      outputDescription: 'A universally unique identifier (UUID) string.',
      outputExample: '123e4567-e89b-12d3-a456-426655440000'
    }

  },


  fn: function(inputs, exits) {
    var randomBytes = require('crypto').randomBytes;

    // Generate 16 random bytes and set the RFC 4122 version (4) and variant (10) bits.
    var b = randomBytes(16);
    b[6] = (b[6] & 0x0f) | 0x40;
    b[8] = (b[8] & 0x3f) | 0x80;

    // Format as a hyphenated 8-4-4-4-12 hex string.
    var h = b.toString('hex');
    var uuid = h.slice(0,8) + '-' + h.slice(8,12) + '-' + h.slice(12,16) + '-' + h.slice(16,20) + '-' + h.slice(20,32);

    // Return the new UUID through the `success` exit.
    return exits.success(uuid);
  }

};
