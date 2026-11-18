module.exports = {

  friendlyName: 'Generate random string',


  description: 'Generate a pseudo-random string which is probabalistically-unique.',


  extendedDescription: 'Internally, this method uses either the native Buffer from Node.js or the algorithm from the [hat](https://github.com/substack/node-hat) package by [@substack](https://github.com/substack).  If you are interested in learning more about psuedo-random number/string generators, you might be interested in reading the Wikipedia list of [random number generator algorithms](http://en.wikipedia.org/wiki/List_of_random_number_generators).\n\nNote that, while it is tempting to consider providing a per-process (pseudo-)guarantee of uniqueness by using a process-global "rack" to store past tokens, this module has opted against it in the latest release.  This feature was removed to avoid complications around use cases with memory overflow.',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    style: {
      description: 'The style of random string to generate.',
      extendedDescription: 'This can be either "alphanumeric" (the default) or "url-friendly".\n'+
      '\n'+
      '• When "alphanumeric", it means the result string will consist only of numerals [0-9]\n'+
      'and lowercase letters [a-f].\n'+
      '\n'+
      '• When "url-friendly", it means the result string will have other characters as well,\n'+
      'but it is always guaranteed to work properly within the querystring of a URL.\n'+
      'Also note that, when using this style of random string, you needn\'t worry about\n'+
      'additional URI-decoding -- in other words, running decodeURI() or decodeURIComponent()\n'+
      'on the resulting random string won\'t have any effect.',
      // isIn: ['url-friendly', 'alphanumeric'],
      type: 'string',
      defaultsTo: 'alphanumeric'
    },

    len: {
      description: 'An exact length for the random string being generated.',
      extendedDescription: 'If omitted, the length of any two random strings generated may vary,\n'+
      'even when using the same "style".',
      type: 'number',
      min: 1
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Random string',
      outputDescription: 'A random string.',
      extendedDescription: 'A generated alphanumeric random string will look something like "1a17d9af25aef464b46481d901ba2005", and a url-friendly random string will look something like "vt8qeSpSG9+HVXyhoRlecw==".',
      outputExample: '1a17d9af25aef464b46481d901ba2005'
    }

  },


  fn: function(inputs, exits) {
    var crypto = require('crypto');

    var token = '';
    var tokenChunk;
    while (token.length === 0 || token.length < inputs.len) {

      if (inputs.style === 'url-friendly') {

        // Generate a url-friendly string (e.g. for password reset or invitations).
        tokenChunk = crypto.randomBytes(16).toString('base64');

        // Get rid of plus signs (+) to avoid weird issues with spaces
        // in some parsing libraries (e.g. Sails/Express/Koa),
        // as well as / (to make it valid in a URI path component).
        //
        // > Note also that "+" is technically legal:
        // > https://stackoverflow.com/a/31300627/486547
        // > ...we just change it anyway to avoid issues.
        tokenChunk = tokenChunk.replace(/[+/=]/g, '');

      } else if (inputs.style === 'alphanumeric') {

        // Generate a random, alphanumeric (hex) string from 128 bits of randomness.
        tokenChunk = crypto.randomBytes(16).toString('hex');

      } else {
        throw new Error('Unrecognized random string style: `'+inputs.style+'`');
      }

      token += tokenChunk;
      if (inputs.len && token.length > inputs.len) {
        token = token.slice(0, inputs.len);
      }

    }//∞


    // Return our new probably-unique token.
    return exits.success(token);
  }

};
