export default (obj, defaultProperties) => {
    Object.keys(defaultProperties).forEach((key) => {
        if (!obj.hasOwnProperty(key)) {
            obj[key] = defaultProperties[key];
        }
    });
    return obj;
};
