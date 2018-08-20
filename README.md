# Focaccia

[![Build Status](https://img.shields.io/travis/Focaccia/Focaccia/master.svg?style=flat-square)](https://travis-ci.org/Focaccia/Focaccia)

Focaccia is a storage abstraction layer which allows to manage with easy files into your local or cloud storages.

## Installing
  Execute `npm install --save @focaccia/focaccia` to your main project.
  
## How To Use:

  - To use this tool you will need to initialize two objects, the adapter and the abstraction layer.
  
### Adapters:
  - Local file system (included in this package)
  - [AWS](https://github.com/Focaccia/focaccia-aws-adapter) 


**Writing a local file**
```javascript
const {Focaccia, LocalAdapter} = require("@focaccia/focaccia");

// This is the root directory to start uploading the files.
let rootDir = "/var/myproejct/data"; // Make sure this exists and has write access.
let tAsty = new Focaccia(new LocalAdapter(rootDir), {});

let res = tAsty.write("helloworld.txt", "Hello World");
res.then((d) => {
  console.log("RESULT", d);
})

```
