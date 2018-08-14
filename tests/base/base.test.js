const os = require('os');
const assert = require('assert');
const Focaccia = require("../../src/Focaccia");
const LocalAdapter = require("../../src/Adapter/Local");

let tmpDir = os.tmpdir();
let prophecyAdapter = new LocalAdapter(tmpDir);
let prophecyConfig = {};
let FC = new Focaccia(prophecyAdapter, prophecyConfig);

let tmpFile = `focaccia-test.txt`;
let tmpFileNew = `focaccia-test-newname.txt`;
let tmpStreamFile = `focaccia-stream-test.txt`;
let tmpInnerDir = "focaccia-dir";

describe("Adapter", () => {
    describe("#getAdapter", () => {
        it("Should return the same instance of the prophecy adapter", () => {
            assert.equal(FC.getAdapter(), prophecyAdapter);
        });
    });

    describe("#getConfig", () => {
        it("Should return the same configuration from the prophecy config", () => {
            assert.equal(FC.getConfig(), prophecyConfig);
        });
    });

    describe("#has", () => {
        it("Test if a file is into a path", () => {
            assert.equal(FC.has("path.txt"), false);
        });
    });

    describe("#write", () => {
        it("Test to write some content into a temporary file", () => {
            let contents = 'contents';
            let result = FC.write(tmpFile, contents, prophecyConfig);

            assert.equal((result !== null && typeof result === 'object'), true);
            assert.equal((typeof (result.stats.size) === 'number'), true);
            assert.equal(result.stats.size > 0, true);
            assert.equal((typeof (result.content) === 'string'), true);
        });
    });

    describe("#writeStream", () => {
        it("Test write stream", () => {
            let result = FC.writeStream(tmpStreamFile);
            assert.equal(result.constructor.name, "WriteStream");
        });
    });

    describe("#readStream", () => {
        it("Test read stream", () => {
            let result = FC.readStream(tmpStreamFile);
            assert.equal(result.constructor.name, "ReadStream");
        });
    });

    describe("#putStream", () => {
        it("Test update stream", () => {
            let result = FC.putStream(tmpStreamFile);
            assert.equal(result.constructor.name, "WriteStream");
        });
    });

    describe("#rename", () => {
        it("Should rename a file", () => {

            let result = FC.rename(tmpFile, tmpFileNew);
            assert.equal((result !== null && typeof result === 'object'), true);
            assert.equal(FC.has(tmpFileNew), true);
            assert.equal(FC.has(tmpFile), false);
        });
    }); 

    describe("#copy", () => {
        it("Should copy a file", () => {
            
            assert.equal(FC.has(tmpFileNew), true);
            assert.equal(FC.has(tmpFile), false);

            let result = FC.copy(tmpFileNew, tmpFile);

            assert.equal((result !== null && typeof result === 'object'), true);
            assert.equal(FC.has(tmpFileNew), true);
            assert.equal(FC.has(tmpFile), true);
            
        });
    }); 

    describe("#delete", () => {
        it("Should delete a file", () => {

            let result = FC.delete(tmpFileNew);
            
            assert.equal(FC.has(tmpFileNew), false);
            assert.equal(result, true);
            
        });
    }); 

    describe("#readAndDelete", () => {
        it("Should read the content and then destroy the file", () => {
            let result = FC.readAndDelete(tmpFile);
            
            assert.equal((result !== null && typeof result === 'object'), true);

            assert.equal(FC.has(tmpFile), false);
        });
    });

    describe("#CreateDir", () => {
        it("Should create a directory", () => {
            let result = FC.createDir(tmpInnerDir);
            assert(result, true);
        });
    });

    describe("#Delete Directory", () => {
        it("Should delete a directory", () => {
            let result = FC.deleteDir(tmpInnerDir);
            assert(result, true);
        });
    });

    describe("#ListDirectory", () => {
        it("Should list directory content", () => {
            let result = FC.listContents();
            assert(typeof result, 'Array');
        });
    });
});