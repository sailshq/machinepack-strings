module.exports = {


  friendlyName: 'Convert stream to string',


  description: 'Consume a readable stream of data and return a string.',


  extendedDescription:
  'This reads _all_ incoming data.  So be careful not to use this on a stream that is too big.  '+
  '(Its contents might not fit into memory all at the same time!)',


  inputs: {

    sourceStream: {
      type: 'ref',
      description: 'The Readable stream to consume.',
      extendedDescription: 'Must be a utf8-encoded, modern (streams>=2) Readable stream.',
      required: true
    }

  },


  exits: {

    success: {
      outputFriendlyName: 'String',
      outputDescription: 'The data that was accumulated from consuming the stream, represented as a raw string.',
      outputType: 'string'
    },

  },


  fn: function (inputs, exits) {

    // Check for the methods we need on the provided Readable source stream.
    if (!inputs.sourceStream || typeof inputs.sourceStream !== 'object' || typeof inputs.sourceStream.pipe !== 'function' || typeof inputs.sourceStream.on !== 'function') {
      throw new Error('Invalid stream provided (has no `.pipe()` and/or `.on()` methods).');
    }

    var stream = inputs.sourceStream;

    // (Note: The $-prefixed functions are standalone declarations because we use
    // references to them again below as we clean up.)
    var $onReadable;
    var $onEnd;
    var $onError;
    (function(proceed){

      var data = '';
      var spun;

      // Bind "readable", "end", and "error" listeners.
      $onReadable = function () {
        console.log('readable', arguments);
        var chunk;
        while (!!(chunk = stream.read())) {
          data += chunk.toString();
          console.log('read chunk:', data);
        }//∞
      };//ƒ
      stream.on('readable', $onReadable);

      $onEnd = function () {
        console.log('end', arguments);
        if (spun) { return; }
        spun = true;
        proceed(undefined, data);
      };//ƒ
      stream.on('end', $onEnd);

      $onError = function(err) {
        console.log('error', err);
        if (spun) { return; }
        spun = true;
        proceed(err);
      };
      stream.on('error', $onError);

    })(function(err, data) {
      stream.removeListener('readable', $onReadable);
      stream.removeListener('end', $onEnd);
      stream.removeListener('error', $onError);

      if (err) {
        return exits.error(err);
      }

      return exits.success(data);

    });//_∏_ (†)

  },


};
