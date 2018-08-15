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

        if (prefix === '') {
            return;
        }

        this.pathPrefix = prefix.trim("/");

        return this.pathPrefix;
    }

    getPathPrefix() {
        return this.pathPrefix;
    }

    applyPathPrefix(path) {
        if (!path) {
            return '';
        }

        if (path.length === 0) {
            return '';
        }

        if (path[0] === '/') {
            path = path.substring(1);
        }

        let lastPos = path.length - 1;
        if (path[lastPos] === "/") {
            path = path.substring(0, lastPos);
        }

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

        if (newPath[0] === "/") {
            newPath = newPath.substring(1);
        }

        let lastPos = newPath.length - 1;
        if (newPath[lastPos] === "/") {
            newPath = newPath.substring(0, lastPos);
        }

        return newPath;
    }
}

module.exports = BaseAdapter;