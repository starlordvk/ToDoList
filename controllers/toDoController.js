  var bodyParser=require("body-parser");
  var mongoose=require("mongoose");
  mongoose.Promise = global.Promise;

  //connect to mongoDB

mongoose.connect("mongodb://varun:varun@ds153699.mlab.com:53699/todo");

//Creating a schema for database
var todoSchema=new mongoose.Schema({

item:String

});

//creating model for mongoDB
var todoModel=mongoose.model("todoModel",todoSchema);

/*var item1=todoModel({item:"get me some bitches"}).save(function(err){
  if(err) throw err;
  console.log("item saved to DB");
});
*/


var urlencodedParser = bodyParser.urlencoded({ extended: false })

//var data=[{item:"Drink Milk"},{item:"practice front end"},{item:"watch basketball"}];

module.exports=function (app) {

  app.get("/todo",function (request,response) {

    //get data from db and pass it to the response
    todoModel.find({},function(err,data){

      if(err) throw err;
       response.render("toDo",{todos:data});
    });

   

  });


  app.post("/todo",urlencodedParser,function (request,response) {

    //get data from the view and aad it to the database

    var newToDoItem=todoModel(request.body).save(function(err,data){
      if(err) throw err;
      response.json(data);
    });

    

  });

  app.delete("/todo/:item",function (request,response) {

    //delete item from the DB
    todoModel.find({item:request.params.item}).remove(function(err,data){
      if(err) throw err;
      response.json(data);
    });
    
});


}