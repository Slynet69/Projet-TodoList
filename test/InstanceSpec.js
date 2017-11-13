describe('control instanciations', function () {
    //'use strict';
    
       
        
     var store, template, model, view, controller;   
	var createViewStub = function () {
		var eventRegistry = {};
		return {
			render: jasmine.createSpy('render'),
			bind: function (event, handler) {
				eventRegistry[event] = handler;
			},
			trigger: function (event, parameter) {
				eventRegistry[event](parameter);
			}
		};
	};        
     
        it("Should create a new instance of Store", function() {
                store = new window.app.Store();
                expect(store instanceof window.app.Store).toBe(true);
        });          
     
     
     
        it("Should create a new instance of Model", function() {
                model = new app.Model();
                expect(model instanceof app.Model).toBe(true);
        });     
     

    
        it('should create a new instance of template', function () {
            template = new app.Template();
            expect(template instanceof app.Template).toBe(true);
            
        });
    

    
        it("Should create a new instance of view", function() {
                view = new app.View();
                expect(view instanceof app.View).toBe(true);
        });    

        it("Should create a new instance of controller", function() {
                view = new createViewStub();
                controller = new app.Controller(model, view);
                expect(controller instanceof app.Controller).toBe(true);
        });    
    
    
});
