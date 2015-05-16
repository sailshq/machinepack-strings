module.exports = {

  friendlyName: 'Unique(ish)',


  description: 'Generate a alphanumeric string which is probabalistically-unique.',


  extendedDescription: 'Internally, this machine uses the [hat](https://github.com/substack/node-hat) package from [Substack](https://github.com/substack).',


  sync: true,


  inputs: {},


  exits: {

    success: {
      description: 'Generated probablistically unique alphanumeric string (consisting only of numerals [0-9] and lowercase letters [a-z])',
      example: '1a17d9af25aef464b46481d901ba2005'
    }

  },


  fn: function(inputs, exits) {
    var Hat = require('hat');

    // Provide a pseudo-guarantee of uniqueness by using a process-global "rack" to store past tokens.
    // (note this is stored as a proprety of the module exports of this machine-- meaning it is a property on
    // the machine def. NEVER REALLY ON THESE TOKENS BEING ANYTHING MORE THAN "PROBABLY" UNIQUE!!)
    module.exports._rack = module.exports._rack || Hat.rack();

    // Generate and return the new probably-unique token.
    var token = module.exports._rack();
    return exits.success(rack());
  }

};
