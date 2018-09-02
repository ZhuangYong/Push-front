export function Service(target, key, descriptor) {
    console.log(">>1", target);
    console.log(">>2", key, typeof key);
    console.log(">>3", descriptor);
    console.log(">>>4", this, target.props);
    target[key] = function () {
        const path = {};
        find(this.props, key, key, 0, 4, path);
        const keys = Object.keys(path);
        if (keys.length > 1) {
            this[key] = path[keys[0]];
            // this[key].__proto__["in"] = (inKey) => path[inKey];
        }
    };
    return target;
}

/**
 *
 * @param obj
 * @param key
 * @param findKey
 * @param deep
 * @param maxDeep
 * @param saveIn
 */
function find(obj, key, findKey, deep, maxDeep, saveIn) {
    if (!obj || deep > maxDeep) {
        return;
    }
    if (typeof obj[key] !== "undefined") {
        if (saveIn) {
            saveIn[findKey.replace("." + key, "")] = obj[key];
        }
    }
    Object.keys(obj).map(k => {
        const nextFindKey = k + "." + findKey;

        if (saveIn && key === k) {
            saveIn[findKey.replace("." + key, "")] = obj[k];
        }
        const nextObj = obj[k];
        if (typeof nextObj === "object" || typeof nextObj === "function") {
            find(nextObj, key, nextFindKey, deep + 1, maxDeep, saveIn);
        }
    });

}

