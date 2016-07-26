module.exports = {


  friendlyName: 'Search string using regex (global)',


  description: 'Search a string using a global regular expression and return all matches.',


  extendedDescription: 'This uses the `/g` modifier to find every match in the input string.',


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
      example: 'l(\\w)',
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
      outputFriendlyName: 'Substring match info',
      outputDescription: 'Information about the matched substrings, including their text, position and matching subgroups.',
      outputExample: [{
        found: 'll',
        at: 2,
        subgroups: ['l']
      }]
    },

    invalidRegexp: {
      friendlyName: 'Invalid regular expression',
      description: 'The provided regular expression was invalid (cannot be instantiated into a RegExp object).'
    },

    notFound: {
      friendlyName: 'No matches found',
      description: 'No matches were found.'
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
        regexp = new RegExp(regexp, 'ig');
      }
      // Otherwise, skip the case-insensitive modifier
      else {
        regexp = new RegExp(regexp, 'g');
      }
    }

    // If we run into any trouble, trigger the `invalidRegexp` exit.
    catch (e) {
      return exits.invalidRegexp(e);
    }

    // Declare an array var to hold the matches
    var matches = [];

    // Declare a var to hold a single match
    var match;

    // Keep running the regex until out of matches
    while (match = regexp.exec(inputs.string)) {

      // Push information about the match onto the `matches` array
      matches.push({
        found: match[0],
        at: match.index,
        subgroups: match.slice(1)
      });

    }

    // If no matches are found, trigger the `notFound` exit.
    if (matches.length === 0) {
      return exits.notFound();
    }

    // Otherwise return information about the matches.
    return exits.success(matches);

  }

};
