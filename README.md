# Focaccia

[![Build Status](https://img.shields.io/travis/Focaccia/Focaccia/master.svg?style=flat-square)](https://travis-ci.org/Focaccia/Focaccia)

Focaccia is a storage abstraction layer which allows to manage with easy files into your local or cloud storages.

## Adapters:
  - Local file system (included in this package)
  - [AWS](https://github.com/Focaccia/focaccia-aws-adapter)
  
## How To Use:

  - To use this tool you will need to initialize two objects, the adapter and the abstraction layer.


**Uploading a file to AWS**
```javascript
const AWS = require('aws-sdk');
const {AwsS3Adapter} = require("./");
const {Focaccia} = require("@focaccia/focaccia");

AWS.config.update({
  accessKeyId: 'something',
  secretAccessKey: 'something',
});

var s3 = new AWS.S3();

let tAsty = new Focaccia(new AwsS3Adapter(s3, 'newBucket'), {});

// This will upload a file
let res = tAsty.write("helloworld.txt", "Hello Amazon world");

// Return a promise
res.then((d) => {
   console.log("RESULT", d);
})
```
