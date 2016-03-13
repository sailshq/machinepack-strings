module.exports = {


  friendlyName: 'Convert string to camel-case',


  description: 'Build a new camel-cased version of the specified string.',


  extendedDescription: 'Returns a version of the string with dashes removed, using medial capitalization to separate words instead. See http://en.wikipedia.org/wiki/CamelCase for more information.',


  sync: true,


  cacheable: true,


  inputs: {

    string: {
      friendlyName: 'String',
      example: 'foo-bar-baz',
      description: 'The string to convert (dash-delimited or otherwise)',
      required: true
    }

  },


  exits: {

    success: {
      example: 'fooBarBaz',
    }

  },


  fn: function (inputs, exits) {
    var _ = require('lodash');

    return exits.success(_.camelCase(inputs.string));
  }

};
