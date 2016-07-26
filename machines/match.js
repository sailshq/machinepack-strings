module.exports = {


  friendlyName: 'Search string using regex',


  description: 'Search a string using a regular expression and return the first match.',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    string: {
      friendlyName: 'String to search',
      example: 'hello world',
      description: 'The string to search (i.e. "haystack").',
      required: true
    },

    regexp: {
      friendlyName: 'Regular expression',
      example: 'w(\\w+)d',
      description: 'The regular expression to match against (i.e. "metal detector").',
      extendedDescription: 'The regular expression should be specified as a string WIHOUUT including leading or trailing slashes or modifiers like /gi.',
      required: true
    },

    caseInsensitive: {
      friendlyName: 'Case insensitive?',
      description: 'Whether or not you care about uppercase/lowercase letters.',
      extendedDescription: 'This will build the regular expression using the `/i` modifier.',
      example: true,
      defaultsTo: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Matched substring info',
      outputDescription: 'Information about the matched substring, including its text, position and matching subgroups.',
      outputExample: {
        found: 'world',
        at: 6,
        subgroups: ['orl']
      }
    },

    invalidRegexp: {
      friendlyName: 'Invalid regular expression',
      description: 'The provided regular expression was invalid (cannot be instantiated into a RegExp object).'
    },

    notFound: {
      friendlyName: 'No match found',
      description: 'No match was found.'
    }

  },


  fn: function (inputs, exits) {

    // Import `lodash`.
    var _ = require('lodash');

    // Make a copy of the `regexp` input string.
    var regexp = inputs.regexp;

    // Attempt to instantiate `regexp` into a RegExp object.
    try {
      // If specified, make it a case-insensitive regexp.
      if (inputs.caseInsensitive) {
        regexp = new RegExp(regexp, 'i');
      }
      // Otherwise, skip the modifier
      else {
        regexp = new RegExp(regexp);
      }
    }

    // If we run into any trouble, trigger the `invalidRegexp` exit.
    catch (e) {
      return exits.invalidRegexp(e);
    }

    // Run the regular expression on the input string.
    var matches = inputs.string.match(regexp);

    // If no matches are found, trigger the `notFound` exit.
    if (!matches) {
      return exits.notFound();
    }

    // Otherwise return information about the primary match and any subgroups.
    return exits.success({
      found: matches[0],
      at: matches.index,
      subgroups: matches.slice(1)
    });

  }

};
