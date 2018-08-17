const {stringUtils} = require("../utils");

class BaseAdapter {
    constructor(root) {
        this.root = root;

        this.setPathPrefix(root);
    }
    
    setPathPrefix(prefix) {

        this.pathPrefix = '';
        
        if (typeof (prefix) !== 'string') {
            return;
        }

        this.pathPrefix = stringUtils.trim(prefix, "/");

        return this.pathPrefix;
    }

    getPathPrefix() {
        return this.pathPrefix;
    }

    applyPathPrefix(path) {

        if (!path) {
            return '';
        }

        path = stringUtils.ltrim(path, "/");
        // path = stringUtils.trim(path, "/");

        let newPath = [];
        let pathPrefix = this.getPathPrefix();

        if (pathPrefix.length > 0) {
            newPath.push(pathPrefix);
        }

        newPath.push(path);

        return newPath.join('/');
    }

    removePathPrefix(path) {
        let newPath = path.substring(this.getPathPrefix().length);

        if (newPath.length === 0) {
            return newPath;
        }
        
        newPath = stringUtils.trim(newPath, "/");
        newPath = stringUtils.ltrim(newPath, "/");

        return newPath;
    }
}

module.exports = BaseAdapter;