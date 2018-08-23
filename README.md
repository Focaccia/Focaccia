# Focaccia

[![Build Status](https://img.shields.io/travis/Focaccia/Focaccia/master.svg?style=flat-square)](https://travis-ci.org/Focaccia/Focaccia)

Focaccia is a storage abstraction layer which allows to manage with easy files into your local or cloud storages.

## Contents

- [Installing](#installing)
- [How to use](#how-to-use)
- [Adapters](#adapters)
- [Initialize](#initialize)
- Operations:
   - [Writing a file](#writing-a-local-file)
   - [Checking file exists](#checking-if-a-file-exists)
   - [Reading file content](#reading-a-file)
   - [Reading file content and delete](#reading-a-file-and-delete)
   - [Rename a file](#rename)
   - [Copy a file](#copy)
   - [Delete a file](#delete)
   - [Creates a directory](#creates-a-directory)
   - [List directory content](#list-directory-content)
   - [Delete a directory](#delete-a-directory)
   - [Buffers & Streams](#buffer-supports)

## Installing
  Execute `npm install --save @focaccia/focaccia` to your main project.
  
## How To Use:

  - To use this tool you will need to initialize two objects, the adapter and the abstraction layer.
  
### Adapters:
  - Local file system (included in this package)
  - [AWS](https://github.com/Focaccia/focaccia-aws-adapter) 

----------------------
### Initialize

```javascript
const {Focaccia, LocalAdapter} = require("@focaccia/focaccia");

// This is the root directory to start uploading the files.
let rootDir = "/var/myproejct/data"; // Make sure this exists and has write access.
let tAsty = new Focaccia(new LocalAdapter(rootDir), {});
```


### Writing a local file

```javascript

let res = tAsty.write("helloworld.txt", "Hello World"); // returns a promise
res.then((d) => {
  console.log("RESULT", d);
})
```

----------------------
### Checking if a file exists

```javascript
let res = tAsty.has("helloworld.txt"); // returns a promise
res.then((data) => console.log(data));
```

Output

```
boolean: true or false if exists
```

----------------------

### Reading a file

```javascript
let res = tAsty.read("helloworld.txt"); // returns a promise
res.then((data) => console.log(data));
```

Output

```json
{
  "contents": "...file content string",
  "metadata": {...}
}
```

----------------------

### Reading a file and delete

This command is the same as above but with the difference that deletes the file after the read process.

```javascript
let res = tAsty.readAndDelete("helloworld.txt"); // returns a promise
res.then((data) => console.log(data));
```

Output

```json
{
  "contents": "...file content string",
  "metadata": {...}
}
```

----------------------

### Rename

```javascript
let res = tAsty.rename("helloworld.txt", "mynewname.txt"); // returns a promise
res.then((data) => console.log(data));
```

Output

```
boolean: true or false if exists
```

----------------------

### Copy

```javascript
let res = tAsty.copy("mynewname.txt", "helloworld.txt"); // returns a promise
res.then((data) => console.log(data));
```

Output

```
boolean: true or false if exists
```
----------------------

### Delete

```javascript
let res = tAsty.delete("helloworld.txt"); // returns a promise
res.then((data) => console.log(data));
```

Output

```
boolean: true or false if exists
```

----------------------

### Creates a directory

This will create a directory inside the root directory previously configured.

```javascript
let res = tAsty.createDir("test"); // returns a promise
res.then((data) => console.log(data));
```

Output

```
boolean: true or false if exists
```

----------------------

### List directory content

```javascript
let res = tAsty.listContents("test"); // returns a promise
res.then((data) => console.log(data));
```

Output

```
[...array of files and folders]
```

----------------------

### Delete a Directory

```javascript
let res = tAsty.deleteDir("test"); // returns a promise
res.then((data) => console.log(data));
```

Output

```
boolean: true or false if exists
```

--------

### Buffer supports.

It is possible to create, retrieve, delete and update buffers or streams by using the methods:

writeStream, readStream, putStream and delete.
