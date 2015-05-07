module.exports = {


  friendlyName: 'Capitalize a string',


  description: 'Capitalize the first (or any) letter in a string.',


  extendedDescription: 'If the character at the specified position in a string is not a letter, it will be left as-is.',


  sync: true,


  cacheable: true,


  inputs: {

    string: {
      friendlyName: 'String',
      example: 'villeriño',
      description: 'The string to capitalize.',
      required: true
    },

    at: {
      friendlyName: 'Which letter?',
      description: 'The index of the letter to capitalize within the string',
      extendedDescription: 'Strings are indexed starting from the left at 0.',
      example: 0,
      defaultsTo: 0
    }

  },


  exits: {
    success: {
      friendlyName: 'then',
      description: 'OK.',
      example: 'Villeriño',
    },
    error: {
      description: 'Unexpected error occurred.'
    }
  },


  defaultExit: 'success',


  fn: function (inputs, exits) {
    var _ = require('lodash');
    return exits.success(_.capitalize(inputs.string));
  }

};
