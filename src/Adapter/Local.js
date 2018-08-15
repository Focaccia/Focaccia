const fs = require("fs");
const BaseAdapter = require("./BaseAdapter");

class LocalAdapter extends BaseAdapter {
    
    constructor(root, writeFlags, linkHandling, permissions = []) {
        super(root);
        this.pathSeparator = '/';

    }


    has(path) {
        let location = this.applyPathPrefix(path);
        return fs.existsSync(location);
    }

    write(path, contents, config) {
        let location = this.applyPathPrefix(path);
        
        fs.writeFileSync(location, contents, config);
        let hasBeenWritten = this.has(path);

        if (!hasBeenWritten) {
            return false;
        }

        return this.read(path);
    }

    writeStream(path, resource, config) {
        let location = this.applyPathPrefix(path);
        return fs.createWriteStream(location, config);
    }

    readStream(path) {
        let location = this.applyPathPrefix(path);
        return fs.createReadStream(location);
    }
    updateStream(path, resource, config) {
        return this.writeStream(path, resource, config);
    }

    update(path, contents, config) {
        return this.write(path, contents, config);
    }
    
    read(path) {
        let location = this.applyPathPrefix(path);
        
        let content = fs.readFileSync(location);
        
        if (!content) {
            return false;
        }

        return {
            content: content.toString(),
            stats: this.getMetadata(location),
            path: location
        };
    }

    rename(path, newpath) {
        let location = this.applyPathPrefix(path);
        let newlocation = this.applyPathPrefix(newpath);

        fs.renameSync(location, newlocation);
        return this.read(newpath);
    }

    copy(path, newpath) {
        let location = this.applyPathPrefix(path);
        let newLocation = this.applyPathPrefix(newpath);
        
        fs.copyFileSync(location, newLocation);

        return this.read(newpath);
    }

    delete(path) {
        let location = this.applyPathPrefix(path);
        fs.unlinkSync(location);

        return this.has(path) === false;
    }

    listContents(directory = '.', recursive = false) {
        let location = this.applyPathPrefix(directory);
        return fs.readdirSync(location);
    }

    getMetadata(path) {
        return fs.statSync(path);
    }
    
    createDir(dirname, config) {
        let location = this.applyPathPrefix(dirname);

        if (fs.existsSync(location)) {
            return true;
        }

        fs.mkdirSync(location);

        return fs.existsSync(location);
    }

    deleteDir(dirname) {
        let location = this.applyPathPrefix(dirname);
        fs.rmdirSync(location);

        return !fs.existsSync(location);
    }

    getSize(path) {}
    getMimetype(path) {} 
    getTimestamp(path) {}
    getVisibility(path) {}
    setVisibility(path) {}

}

module.exports = LocalAdapter;