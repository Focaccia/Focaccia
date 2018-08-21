const os = require('os');
const assert = require('assert');
const Focaccia = require("../../src/Focaccia");
const LocalAdapter = require("../../src/Adapter/Local");

let tmpDir = os.tmpdir()+"/focaccia";
let prophecyAdapter = new LocalAdapter(tmpDir);
let prophecyConfig = {};
let FC = new Focaccia(prophecyAdapter, prophecyConfig);

let tmpFile = `tasty/asset/focaccia-test.txt`;
let tmpFileNew = `focaccia-test-newname.txt`;
let tmpStreamFile = `focaccia-stream-test.txt`;
let tmpInnerDir = "focaccia-dir";

describe(`Adapter root folder: ${tmpDir}`, () => {
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
        it("Test if a file is into a path", async () => {
            assert.equal(await FC.has("path.txt"), false);
        });
    });

    describe("#write", () => {
        it("Test to write some content into a temporary file", async () => {
            let contents = 'contents';
            let result = await FC.write(tmpFile, contents, prophecyConfig);

            assert.equal((result !== null && typeof result === 'object'), true);
            assert.equal((typeof (result.stats.size) === 'number'), true);
            assert.equal(result.stats.size > 0, true);
            assert.equal((typeof (result.content) === 'string'), true);
        });
    });

    describe("#read", () => {
        it("Should return some content", async () => {
            let response = await FC.read(tmpFile);
            assert.equal(typeof(response["contents"]) === 'string', false);
        });
    });

    describe("#writeStream", () => {
        it("Test write stream", async () => {
            let result = await FC.writeStream(tmpStreamFile);
            assert.equal(result.constructor.name, "WriteStream");
        });
    });

    describe("#readStream", () => {
        it("Test read stream", async () => {
            let result = await FC.readStream(tmpStreamFile);
            assert.equal(result.constructor.name, "ReadStream");
        });
    });

    describe("#putStream", () => {
        it("Test update stream", async () => {
            let result = await FC.putStream(tmpStreamFile);
            assert.equal(result.constructor.name, "WriteStream");
        });
    });

    describe("#rename", () => {
        it("Should rename a file", async () => {

            let result = await FC.rename(tmpFile, tmpFileNew);
            assert.equal((result !== null && typeof result === 'object'), true);
            assert.equal(await FC.has(tmpFileNew), true);
            assert.equal(await FC.has(tmpFile), false);
        });
    }); 

    describe("#copy", () => {
        it("Should copy a file", async () => {
            
            assert.equal(await FC.has(tmpFileNew), true);
            assert.equal(await FC.has(tmpFile), false);

            let result = await FC.copy(tmpFileNew, tmpFile);

            assert.equal((result !== null && typeof result === 'object'), true);
            assert.equal(await FC.has(tmpFileNew), true);
            assert.equal(await FC.has(tmpFile), true);
            
        });
    }); 

    describe("#delete", () => {
        it("Should delete a file", async () => {

            let result = await FC.delete(tmpFileNew);
            let result2 = await FC.delete(tmpStreamFile);
            
            assert.equal(await FC.has(tmpFileNew), false);
            assert.equal(await FC.has(tmpStreamFile), false);
            
            assert.equal(result, true);
            assert.equal(result2, true);
            
        });
    }); 

    describe("#readAndDelete", () => {
        it("Should read the content and then destroy the file", async () => {
            let result = await FC.readAndDelete(tmpFile);
            
            assert.equal((result !== null && typeof result === 'object'), true);

            assert.equal(await FC.has(tmpFile), false);
        });
    });

    describe("#CreateDir", () => {
        it("Should create a directory", async () => {
            let result = await FC.createDir(tmpInnerDir);
            assert(result, true);
        });
    });

    describe("#ListDirectory", () => {
        it("Should list directory content", async () => {
            let result = await FC.listContents();
            assert(typeof result, 'Array');
        });
    });


    describe("#Delete Directory", () => {
        it("Should delete a directory", async () => {
            let result = await FC.deleteDir(tmpInnerDir);
            let result2 = await FC.deleteDir("tasty");
            assert(result, true);
            assert(result2, true);
        });
    });
});