var _ = require('underscore');


module.exports = function (schema, fields) {
    var json = {};
    _.each(schema, function (field, key) {
        if (_.contains(fields, key)) {
            json[key] = field;
        }
    });
    return json;
};