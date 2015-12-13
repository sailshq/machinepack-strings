module.exports = {


  friendlyName: 'To stream',


  description: 'Convert a string into readable stream.',


  moreInfoUrl: 'http://stackoverflow.com/a/22085851/486547',


  sync: true,


  inputs: {

    string: {
      friendlyName: 'String',
      example: 'foo bar baz',
      description: 'The string to convert.',
      required: true
    }

  },


  exits: {

    success: {
      variableName: 'Readable stream',
      outputDescription: 'A stream of data from the source file.',
      extendedDescription:
      'Note that this result stream is _not flowing_.  In other words, it is _paused_, which means '+
      'you don\'t have to worry about using it immediately (i.e. before even one tick of the event loop elapses).',
      example: '==='
    },

  },


  fn: function (inputs,exits) {
    var string__ = new require('stream').Readable();
    string__._read = function () {};
    string__.push(inputs.string);
    string__.push(null);
    return exits.success(string__);
  },


};
