module.exports = {

  friendlyName: 'Generate random string',


  description: 'Generate a pseudo-random string which is probabalistically-unique.',


  extendedDescription: 'Internally, this method uses either the native Buffer from Node.js or the [hat](https://github.com/substack/node-hat) package from [Substack](https://github.com/substack).  If you are interested in learning more about psuedo-random number/string generators, you might be interested in reading the Wikipedia list of [random number generator algorithms](http://en.wikipedia.org/wiki/List_of_random_number_generators).',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    style: {
      description: 'The style of random string to generate.',
      extendedDescription: `This can be either "alphanumeric" (the default) or "url-friendly".

      • When "alphanumeric", it means the result string will consist only of numerals [0-9]
      and lowercase letters [a-f].

      • When "url-friendly", it means the result string will have other characters as well,
      but it is always guaranteed to work properly within a the querystring of a URL.
      Also note that, when using this style of random string, you needn\'t worry about
      additional URI-decoding -- in other words, running decodeURI() or decodeURIComponent()
      on the resulting random string won't have any effect.`,
      // isIn: ['url-friendly', 'alphanumeric'],
      type: 'string',
      defaultsTo: 'alphanumeric'
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Random string',
      outputDescription: 'A random string.',
      outputExample: '1a17d9af25aef464b46481d901ba2005'
    }

  },


  fn: function(inputs, exits) {

    // Import `hat`.
    var Hat = require('hat');

    var token;

    if (inputs.style === 'url-friendly') {
      // Generate a url-friendly token
      // https://github.com/substack/node-password-reset/blob/master/index.js
      var buf = new Buffer(16);
      for(var i = 0; i < buf.length; i++) {
        buf[i] = Math.floor(Math.random() * 256);
      }

      token = encodeURI(buf.toString('base64'));
    }
    else if (inputs.style === 'alphanumeric') {
      // Provide a pseudo-guarantee of uniqueness by using a process-global "rack" to store past tokens.
      // (note this is stored as a proprety of the module exports of this machine-- meaning it is a property on
      // the machine def. NEVER COUNT ON THESE TOKENS BEING ANYTHING MORE THAN "PROBABLY" UNIQUE!!)
      module.exports._rack = module.exports._rack || Hat.rack();

      // Generate and return the new probably-unique token through the `success` exit.
      token = module.exports._rack();
    }
    else {
      throw new Error('Unrecognized random string style: `'+inputs.style+'`');
    }

    return exits.success(token);
  }

};
