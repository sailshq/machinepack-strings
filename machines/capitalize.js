module.exports = {


  friendlyName: 'Capitalize string',


  description: 'Capitalize the first (or any) letter in a string.',


  extendedDescription: 'If the character at the specified position in a string is not a letter, it will be left as-is.',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    string: {
      example: 'villeriño',
      description: 'The string to capitalize.',
      required: true
    },

    at: {
      friendlyName: 'Character position',
      description: 'The index of the letter to capitalize within the string.',
      extendedDescription: 'Strings are indexed starting from the left at 0.  This value must be a non-negative integer.  If the given index is greater than the input string length, the input string will be returned unchanged.',
      example: 0,
      defaultsTo: 0
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Capitalized string',
      outputExample: 'Villeriño',
      outputDescription: 'The input string with the specified character capitalized.'
    }

  },


  fn: function (inputs, exits) {

    // Import `lodash`.
    var _ = require('lodash');

    // If a custom character index was NOT specified, just
    // capitalize the string and return through the `success` exit.
    if (_.isUndefined(inputs.at)) {
      return exits.success(
        _.capitalize(inputs.string)
      );
    }

    // Otherwise, if the specified index is invalid, trigger `error`.
    if (inputs.at !== Math.floor(inputs.at) || inputs.at < 0) {
      return exits.error(new Error('The configured value for `at` must be a non-negative integer.'));
    }

    // If the specified index is valid, do some surgery and return through
    // the `success` exit.
    return exits.success(
      // Get all characters up to the index
      inputs.string.slice(0, inputs.at) +
      // Add the uppercased version of the character at the index
      inputs.string.slice(inputs.at, inputs.at + 1).toUpperCase() +
      // Add the rest of the string
      inputs.string.slice(inputs.at+1)
    );

  }

};
