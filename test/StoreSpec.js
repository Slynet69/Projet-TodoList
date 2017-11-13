    describe('control localstorage', function () {
    //'use strict';
    
       
        
     var store, template, model, view, controller, todosTest2;    

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



        it("Create Should add a store to localstorage", function() {
         
        localStorage.clear();
        expect(localStorage.length).toEqual(0);    
        store = new app.Store('StoreTest');
        model = new app.Model(store);
        expect(localStorage.length).toEqual(1);
                   
        });
        
        it("Create Should add a items to localstorage[store] ", function() {
         
        localStorage.clear();
        
        store = new app.Store('StoreTest');
        model = new app.Model(store);
                
        var todosTest = JSON.parse(localStorage['StoreTest']).todos;    
            
            
        model.create("MODEL1");  
        var todosTest = JSON.parse(localStorage['StoreTest']).todos;      
        expect(store.save).toHaveBeenCalled;    
        expect(todosTest.length).toEqual(1); 
        expect(todosTest[0].title).toEqual("MODEL1");    
                 
        model.create("MODEL2");  
        todosTest2 = JSON.parse(localStorage['StoreTest']).todos;      
        expect(todosTest2.length).toEqual(2);                     
 
        });     
                   
       it ("should add items with name ok", function(){
          
            expect(todosTest2[0].title).toEqual("MODEL1");     
            expect(todosTest2[1].title).toEqual("MODEL2");    
                
        });
  
        it ("should add items with status completed false", function(){
          
            expect(todosTest2[0].completed).toEqual(false);     
            expect(todosTest2[1].completed).toEqual(false);    
                
        });            
        
        it ("should create ID for each item", function(){
           
            expect(todosTest2[0].id).toBeDefined;     
            expect(todosTest2[1].id).toBeDefined;
            expect(todosTest2[1].id).not.toEqual(todosTest2[0].id);   
                
        });        
        
        it ("should remove item from localstorage", function(){
            localStorage.clear();
        
            store = new app.Store('StoreTest');
            model = new app.Model(store);            
		    view = createViewStub();
		    controller = new app.Controller(model, view);            
            controller.setView('');
            model.create('MODEL3');
            model.create('MODEL4');
            spyOn(store, 'remove');        
            var todosTest = JSON.parse(localStorage['StoreTest']).todos; 
            view.trigger('itemRemove', {id: todosTest[0].id});
           
            expect(store.remove).toHaveBeenCalledWith(todosTest[0].id, jasmine.any(Function));;
            console.table(todosTest);
             
           expect(todosTest.length).toEqual(1);   

        });          
    /*
    var todo = {id: 21, title: 'my todo', completed: false};
			setUpModel([todo]);
    
    
    
          it("Should read all todos matching a given id", function() {
        model.read(Number(store._data.todos[0].id), function(data) {
          expect(Object.prototype.toString.apply(data)).toEqual("[object Array]");
          expect(data.length).toEqual(1);
        });
        model.read(store._data.todos[0].id.toString(), function(data) {
          expect(Object.prototype.toString.apply(data)).toEqual("[object Array]");
          expect(data.length).toEqual(1);
        });
      });
    */  
    
    
});