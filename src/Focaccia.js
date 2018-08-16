class Focaccia {
    /**
     * Focaccia Constructor
     * @param {object} adapter 
     * @param {object} config 
     */
    constructor(adapter, config) {
        this.adapter = adapter;
        this.config = config;
    }

    /**
     * Get adapter instance
     */
    getAdapter() {
        return this.adapter;
    }

    /**
     * Get config
     */
    getConfig() {
        return this.config;
    }

    /**
     * Check if a file exists
     * @param {string} path 
     */
    has(path) {
        return this.__promisify(this.getAdapter().has(path));
    }

    /**
     * Write a content file
     * @param {string} path 
     * @param {string} contents 
     * @param {object} config 
     */
    write(path, contents, config = []) {
        return this.__promisify(this.getAdapter().write(path, contents, config));
    }
    
    /**
     * Write a stream file
     * @param {string} path 
     * @param {any} resource 
     * @param {object} config 
     */
    writeStream(path, resource, config = []) {
        return this.__promisify(this.getAdapter().writeStream(path, resource, config));
    }

    /**
     * Update or create content
     * @param {string} path 
     * @param {string} contents 
     * @param {object} config 
     */
    put(path, contents, config = []) {
        if (this.has(path)) {
            return this.__promisify(this.update(path, contents, config));
        }

        return this.__promisify(this.write(path, contents, config));
    }
    
    /**
     * Create or Edit a stream
     * @param {string} path 
     * @param {any} resource 
     * @param {object} config 
     */
    putStream(path, resource, config = []) {
        return this.__promisify(this.getAdapter().updateStream(path, resource, config));
    }

    /** 
     * Read the content of a file and then delete it
    */
    readAndDelete(path) {
        let fileContent = this.read(path);

        if (!fileContent) {
            return this.__promisify(false);
        }

        this.delete(path);

        return this.__promisify(fileContent);
    }

    /**
     * Update a content
     * @param {string} path 
     * @param {string} contents 
     * @param {object} config 
     */
    update(path, contents, config = []) {
        return this.__promisify(this.getAdapter().update(path, contents, config));
    }
    
    /**
     * Read a content file
     * @param {string} path 
     */
    read(path) {
        return this.__promisify(this.getAdapter().read(path));
    }

    /**
     * Read a stream
     * @param {string} path 
     */
    readStream(path) {
        return this.__promisify(this.getAdapter().readStream(path));
    }

    /**
     * Rename a file
     * @param {string} path 
     * @param {string} newpath 
     */
    rename(path, newpath) {
        return this.__promisify(this.getAdapter().rename(path, newpath));
    }

    /**
     * Copy a file into anotherone
     * @param {string} path 
     * @param {string} newpath 
     */
    copy(path, newpath) {
        return this.__promisify(this.getAdapter().copy(path, newpath));
    }

    /**
     * Delete a file
     * @param {string} path 
     */
    delete(path) {
        return this.__promisify(this.getAdapter().delete(path));
    }

    /**
     * Delete a directory
     * @param {string} dirname 
     */
    deleteDir(dirname) {
        return this.__promisify(this.getAdapter().deleteDir(dirname));
    }

    /**
     * Create a directory
     * @param {string} path 
     * @param {object} config 
     */
    createDir(path, config = []) {
        return this.__promisify(this.getAdapter().createDir(path, config));
    }

    /**
     * List directory content
     * @param {string} directory 
     * @param {boolean} recursive 
     */
    listContents(directory = '.', recursive = false) {
        return this.__promisify(this.getAdapter().listContents(directory, recursive));
    }

    //@TODO MORE METHODS
    getMimetype(path) {}
    getTimestamp(path) {}
    getVisibility(path) {}
    getSize(path) {}
    setVisibility(path, visibility) {}
    getMetadata(path) {}
    get(path, handler) {}

    __promisify(response) {
        return Promise.resolve(response);
    }

}

module.exports = Focaccia;