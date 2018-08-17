/**
 * Internal string validator
 * @param {any} value 
 */
const validateString = (value) => {
    if (typeof(value) !== "string") {
        return false;
    }

    if (value.length === 0) {
        return false;
    }

    return true;
};

/**
 * Left trim
 * @param {string} value 
 * @param {string} sRem 
 */
const ltrim = (value, sRem) => {
    
    if (!validateString) {
        return value;
    }

    return value.trimLeft(sRem);
};

/**
 * Right trim
 * @param {string} value 
 * @param {string} sRem 
 */
const trim = (value, sRem) => {
        
    if (!validateString) {
        return value;
    }

    return value.trimRight(sRem);

};

module.exports = {
    ltrim,
    trim
}