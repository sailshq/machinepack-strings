module.exports = {


  friendlyName: 'Get string slice',


  description: 'Get a substring of consecutive characters from a string.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    string: {
      description: 'The string to get a slice of.',
      example: 'McGee',
      required: true
    },

    start: {
      friendlyName: 'Start from index',
      description: 'The index of the first item to include in the new substring.',
      extendedDescription: 'This index should be zero or a positive number.',
      example: 2,
      required: true
    },

    end: {
      friendlyName: 'End with index',
      description: 'The index of the last item to include in the new substring.',
      extendedDescription: 'This index should be zero or a positive number. If this value is omitted, all of the string starting from \'Start from index\' will be returned.',
      example: 5,
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Sliced substring',
      outputDescription: 'The desired slice of the input string.',
      outputExample: 'Gee'
    },

  },


  fn: function (inputs,exits) {

    // Import `lodash`.
    var _ = require('lodash');

    // If the start index is invalid, trigger the `error` exit.
    if (inputs.start < 0) {
      return exits.error('`start` index must be least zero.');
    }

    // If no ending index was specified, return everything starting from the start index.
    if (_.isUndefined(inputs.end)) {
      return exits.success(inputs.string.slice(inputs.start));
    }

    // Otherwise if the end index is invalid, trigger the `error` exit.
    if (inputs.end < 0) {
      return exits.error('`end` index must be least zero.');
    }

    // Increment `end` by 1 (since the third arg to `_.slice()` is exclusive),
    // and return the result of `.slice()` through the `success` exit.
    return exits.success(inputs.string.slice(inputs.start, inputs.end+1));
  },


};
