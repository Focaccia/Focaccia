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

        let newPath = [];
        let pathPrefix = this.getPathPrefix();

        if (pathPrefix.length > 0) {
            newPath.push(pathPrefix);
        }

        newPath.push(path);

        return newPath.join('/');
    }
}

module.exports = BaseAdapter;