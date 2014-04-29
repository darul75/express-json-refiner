module.exports = function (app) {	

    var example = {

    	model: app.model.example.schema.paths,

    	api: {
	        public: {
	        	return ['field1', 'field2', 'field3'];
	        },
	        member: {
	        	return ['field1', 'field2'];
	        },
	        admin: {
	        	return ['field1'];
	        }
        }

    };

    return example;

};