/**
 * Get a normalized dirname from a path
 * 
 * @param {string} dirname 
 * @returns {string}
 */
const normalizeDirname = (dirname) => {
    if (dirname === ".") {
        return "";
    }

    return dirname;
};

const emulateObjectDirectories = (object, directories, listedDirectories) => {
    if (object["type"] === "dir") {
        listedDirectories.push(object["path"]);
    }

    if (!object["dirname"]) {
        return {directories, listedDirectories};
    }
    
    //@TODO: Continue over here, this is wrong
    return {directories, listedDirectories};
    
};

const emulateDirectories = (listing = []) => {
    let directories = [];
    let listedDirectories = [];
    
    listing.forEach((item) => {
        let listedObjects = emulateObjectDirectories(item, directories, listedDirectories);
        directories.push(...listedObjects.directories);
        listedDirectories.push(...listedObjects.listedDirectories);
    });


    directories = arrayDiff(directories.filter(onlyUnique), listedDirectories.filter(onlyUnique));

    directories.forEach((dirname) => {
        listing.push({dirname, type: "dir" });
    });

    return listing;
};

const onlyUnique = (value, index, self) => { 
    return self.indexOf(value) === index;
};

const arrayDiff = (a1, a2) => {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
};

module.exports = {
    normalizeDirname,
    emulateDirectories
}