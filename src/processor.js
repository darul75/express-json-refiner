var _ = require('underscore');


module.exports = function (json, api, options) {

	var model = api.model; // ex: {model: 'api1', scope:'admin'};
	var scope = api.scope;
	

	var fields = options.rules[model].fields[scope];
	/*var model = options.rules[model].model;*/

	if (Array.isArray(json)) {
		json = json.map(function(elt) {
			return refine(elt, fields);
		});

		return json;
	}   

    return refine(json, fields);
};

var refine = function (schema, fields) {
	var json = {};
	_.each(schema, function (field, key) {
    	if (_.contains(fields, key)) {
        	json[key] = field;
    	}
	});
	return json;
};