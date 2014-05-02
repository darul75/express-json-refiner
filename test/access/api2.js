module.exports = function (app) {	

    var o = {

    	model: app.model.model2.schema.paths,

    	fields: {
	        public: ['field1', 'field2', 'field3'],
	        member: ['field1', 'field2'],
	        admin: ['field1']
        }

    };

    return o;

};