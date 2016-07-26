module.exports = {


  friendlyName: 'Construct string',


  description: 'Cast the specified value to a string, if it isn\'t one already.',


  extendedDescription: 'Behind the scenes, this uses RTTC data type coercion. For example, 5 is converted to "5".',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    value: {
      description: 'The value to convert.',
      example: '===',
      readOnly: true,
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'New string',
      outputDescription: 'A string constructed from the provided value.',
      outputExample: 'some string'
    }

  },


  fn: function(inputs, exits) {

    // Since the machine runner automatically casts values to the expected output type,
    // we just need to push the input value through the `success` exit to ensure that
    // it will be a string.
    return exits.success(inputs.value);

  }


};
