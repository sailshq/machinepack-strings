module.exports = {


  friendlyName: 'Character at...',


  description: 'Get a character from a string at a particular position.',


  sync: true,


  sideEffects: 'cacheable',


  inputs: {

    string: {
      example: 'villeriño',
      description: 'The source string.',
      required: true
    },

    at: {
      friendlyName: 'At...',
      description: 'The index to look up within the string.',
      extendedDescription: 'Strings are indexed starting from the left at 0.',
      example: 7,
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'Character from string',
      outputExample: 'ñ',
      outputDescription: 'The character found at the specified index of the input string.'
    },

    notFound: {
      description: 'The string doesn\'t have a character at the specified index (i.e. it\'s too short).'
    },


  },


  fn: function (inputs, exits) {
    return exits.success(inputs.string.slice(inputs.at, inputs.at+1));
  }

};
