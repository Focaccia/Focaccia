class BaseAdapter {
    constructor(root) {
        this.root = root;

        this.setPathPrefix(root);
    }
    
    setPathPrefix(prefix) {

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

        //@TODO: left trim the path
        return `${this.getPathPrefix()}/${path}`;
    }
}

module.exports = BaseAdapter;