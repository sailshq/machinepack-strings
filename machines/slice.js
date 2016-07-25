module.exports = {


  friendlyName: 'Slice',


  description: 'Get a substring of consecutive characters from the string.',


  sideEffects: 'cacheable',


  sync: true,


  inputs: {

    string: {
      description: 'The string to slice.',
      example: 'McGee',
      required: true
    },

    start: {
      friendlyName: 'Start from (index)',
      description: 'The index of the first item to include in the new substring.',
      extendedDescription: 'This index should be zero or a positive number.',
      example: 2,
      required: true
    },

    end: {
      friendlyName: 'End with (index)',
      description: 'The index of the last item to include in the new substring.',
      extendedDescription: 'This index should be zero or a positive number. Omitting this input value will include the rest of the string.',
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
    var _ = require('lodash');

    if (inputs.start < 0) {
      return exits.error('`start` index must be least zero.');
    }
    if (_.isUndefined(inputs.end)) {
      return exits.success(inputs.string.slice(inputs.start));
    }

    if (inputs.end < 0) {
      return exits.error('`end` index must be least zero.');
    }
    // Increment `end` by 1 (since the third arg to `_.slice` is exclusive)
    return exits.success(inputs.string.slice(inputs.start, inputs.end+1));
  },



};
