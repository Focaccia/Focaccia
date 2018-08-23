const fs = require("fs-extra");
const _path = require("path");
const BaseAdapter = require("./BaseAdapter");

const OS_PERMISSIONS = {
    file: {
        public: 0644,
        private: 0600,
    },
    dir: {
        public: 0755,
        private: 0700,
    }
};

class LocalAdapter extends BaseAdapter {
    
    constructor(root, writeFlags, linkHandling, permissions = {}) {
        super(root);
        this.pathSeparator = _path.sep;
        
        this.permissionMap = {
            file: {...OS_PERMISSIONS.file, ...permissions.file},
            dir: {...OS_PERMISSIONS.dir, ...permissions.dir},
        };

        this.__ensureDirectory(root);
    }

    __ensureDirectory(root) {
        return fs.ensureDirSync(root);
    }

    has(path) {
        let location = this.applyPathPrefix(path);
        return fs.existsSync(location);
    }

    write(path, contents, config) {
        let location = this.applyPathPrefix(path);
        this.__ensureDirectory(_path.dirname(location));
        
        fs.writeFileSync(location, contents, config);
        let hasBeenWritten = this.has(path);

        if (!hasBeenWritten) {
            return false;
        }

        return this.read(path);
    }

    writeStream(path, resource, config) {
        let location = this.applyPathPrefix(path);
        this.__ensureDirectory(_path.dirname(location));
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
            contents: content.toString(),
            metadata: this.getMetadata(location),
            path: location
        };
    }

    rename(path, newpath) {
        let location = this.applyPathPrefix(path);
        let newLocation = this.applyPathPrefix(newpath);
        
        this.__ensureDirectory(_path.dirname(newLocation));

        fs.renameSync(location, newLocation);
        return this.has(newpath);
    }

    copy(path, newpath) {
        let location = this.applyPathPrefix(path);
        let newLocation = this.applyPathPrefix(newpath);

        this.__ensureDirectory(_path.dirname(newLocation));
        
        fs.copyFileSync(location, newLocation);

        return this.has(newpath);
    }

    delete(path) {
        let location = this.applyPathPrefix(path);
        fs.unlinkSync(location);

        return this.has(path) === false;
    }

    listContents(directory = "", recursive = false) {
        if (directory.length === 0) {
            directory = ".";
        }
        
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
        fs.removeSync(location);

        return !fs.existsSync(location);
    }

    getSize(path) {}
    getMimetype(path) {} 
    getTimestamp(path) {}
    getVisibility(path) {}
    setVisibility(path) {}

}

module.exports = LocalAdapter;