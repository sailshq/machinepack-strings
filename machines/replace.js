module.exports = {


  friendlyName: 'Replace using regexp',


  description: 'Replace parts of a string that match a given regular expression with the specified replacement.',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    string: {
      example: 'Hello world!',
      description: 'The string to modify.',
      required: true
    },

    regexp: {
      friendlyName: 'Regular expression',
      example: 'World',
      description: 'The regular expression to match against (i.e. "metal detector").',
      extendedDescription: 'The regular expression should be specified as a string WIHOUUT including leading or trailing slashes or modifiers like /gi.',
      required: true
    },

    replacement: {
      description: 'The string to use when replacing matches.',
      extendedDescription: 'Note that you can use match expressions (e.g. "$1", "$2", etc.) to express the values of capture groups.',
      example: 'Mumbai',
      required: true
    },

    caseInsensitive: {
      friendlyName: 'Case insensitive?',
      description: 'Whether or not you care about uppercase/lowercase letters.',
      extendedDescription: 'This will build the regular expression using the `/i` modifier.',
      example: true,
      defaultsTo: true
    },

    global: {
      friendlyName: 'Replace all?',
      description: 'Whether or not to replace all substrings that match the regular expression, or just the first.',
      extendedDescription: 'This will build the regular expression using the `/g` modifier.',
      example: true,
      defaultsTo: false
    },

    multiline: {
      friendlyName: 'Multiline?',
      description: 'Whether to treat beginning and end characters (^ and $) as matching each line delimited by \\n or \\r.',
      extendedDescription: 'This will build the regular expression using the `/m` modifier.',
      example: true,
      defaultsTo: false
    }



  },


  exits: {

    success: {
      outputFriendlyName: 'Replaced string',
      outputDescription: 'The transformed input string, after applying the specified replacement.',
      outputExample: 'Hello Mumbai!'
    },

    invalidRegexp: {
      friendlyName: 'Invalid regular expression',
      description: 'The provided regular expression was invalid (could not be instantiated into a RegExp object).'
    }

  },


  fn: function (inputs, exits) {

    var _ = require('lodash');

    // Case-insensitive by default
    if (_.isUndefined(inputs.caseInsensitive)) {
      inputs.caseInsensitive = true;
    }

    // Check that the regexp is valid
    var regexp;
    try {

      regexp = inputs.regexp;

      /////////////////////////////////////////////////////////
      // Skip this-- we want users to be able to provide an actual
      // regexp with all the things (i.e. should be able to use the
      // star and dot and ? operators, etc)
      /////////////////////////////////////////////////////////
      // Then escape the provided string before instantiating
      // regexp = _.escapeRegExp(regexp);
      /////////////////////////////////////////////////////////

      // Then construct it
      // (and if relevant, enable case-insensitivity)
      var modifiers = '';
      if (inputs.caseInsensitive) {
        modifiers += 'i';
      }
      if (inputs.global) {
        modifiers += 'g';
      }
      if (inputs.multiline) {
        modifiers += 'm';
      }
      if (modifiers.length) {
        regexp = new RegExp(regexp, modifiers);
      }
      else {
        regexp = new RegExp(regexp);
      }
    } catch (e) {
      return exits.invalidRegexp(e);
    }

    var newString = inputs.string.replace(regexp, inputs.replacement);

    return exits.success(newString);

  }

};
