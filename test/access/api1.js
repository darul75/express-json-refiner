module.exports = function (app) {	

    var o = {

    	model: app.model.model1.schema.paths,

    	fields: {
	        public: ['field1', 'field3'],
	        member: ['field1', 'field2'],
	        admin: ['field1']	        
        }

    };

    return o;

};