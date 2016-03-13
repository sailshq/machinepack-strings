module.exports = {


  friendlyName: 'Convert to string',


  description: 'Convert the specified value to a string, if it isn\'t one already.',


  extendedDescription: 'For example, 5 is converted to "5".',


  sync: true,


  cacheable: true,


  inputs: {
    value: {
      description: 'The value to convert',
      example: '===',
      required: true
    }
  },


  exits: {

    success: {
      outputDescription: 'The string ',
      example: 'some string'
    }

  },


  fn: function(inputs, exits) {
    return exits.success(inputs.value);
  }


};
