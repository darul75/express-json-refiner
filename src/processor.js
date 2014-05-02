var _ = require('underscore');

module.exports = function (json, req, options) {

	var model = req.api.model; // ex: {model: 'api1', scope:'admin'};
	var scope = req.api.scope;
	var fields = null;	

	if (!model) { // search it		
		model = matchingModel(req.route.path, options.rules);

		if (!model)
			return;

		fields = model.fields[scope];

	}
	else {
		fields = options.rules[model].fields[scope];
	}		

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

var matchingModel = function(path, rules) {

	var find = _.find(rules, function (rule) {
		if (rule.routes) {
			for (var i=0;i<rule.routes.length;i++) {
				var route = rule.routes[i];
				if (route.match(path).length > 0)
					return true;
			}
		}		
	});

	return find;
};