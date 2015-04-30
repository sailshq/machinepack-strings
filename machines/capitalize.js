module.exports = {


  friendlyName: 'Capitalize a string',


  description: 'Capitalize the first character of a string.',


  extendedDescription: 'If the first letter of the string is not a letter, it will be left as-is.',


  sync: true,


  cacheable: true,


  inputs: {
    string: {
      example: 'guido villeriño',
      description: 'The string to capitalize.',
      required: true
    }
  },


  exits: {
    success: {
      friendlyName: 'then',
      description: 'OK.',
      example: 'Guido villeriño',
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
