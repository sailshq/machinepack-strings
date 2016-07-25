module.exports = {


  friendlyName: 'Trim whitespace',


  description: 'Trim trailing and leading whitespace from a string.',


  inputs: {

    string: {
      example: '   I went to the store to get some more milk.     ',
      description: 'The string to trim.',
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Trimmed string',
      outputDescription: 'The trimmed version of the input string, with whitespace removed from both sides.',
      outputExample: 'I went to the store to get some more milk.'
    },

  },


  fn: function (inputs,exits) {
    var _ = require('lodash');

    var trimmed = _.trim(inputs.string);
    return exits.success(trimmed);
  },



};
