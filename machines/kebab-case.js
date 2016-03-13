module.exports = {


  friendlyName: 'Convert string to kebab-case',


  description: 'Build a new kebab-cased version of the specified string.',


  sync: true,


  cacheable: true,


  inputs: {

    string: {
      friendlyName: 'String',
      example: 'fooBar_baz bong___',
      description: 'The string to convert.',
      required: true
    }

  },


  exits: {

    success: {
      outputDescription: 'The kebab-cased (i.e. dash-delimited) string, lower-cased, with underscores and spaces removed.',
      example: 'foo-bar-baz-bong',
    }

  },


  fn: function (inputs, exits) {
    var _ = require('lodash');
    return exits.success(_.kebabCase(inputs.string));
  }

};
