
var connection = require('../connection');
var uuid = require('uuid');


function Notepad() {
  this.get = function(notename, res) {
    connection.acquire(function(err, con) {
    	console.log("Note Name",notename);
      con.query('select text,note_name from notepad where note_name = ?',notename, function(err, result) {
        con.release();
        console.info("results>>>"+result);
        if(result.length){
          res.send(result);
        }
        else{
          res.send({status: 90, message: 'create new one'});
        }
        
      });
    });
  };

  this.getName = function(res){
  	connection.acquire(function(err,con){
  		var note_name_notepad = getNewName();
  		var uuid_notepad = uuid.v1();
  		var notepad = {
  			id : uuid_notepad,
  			note_name:note_name_notepad
  		}
  		console.log("Notepad Create",notepad);
  		con.query('insert into notepad set ?', notepad, function(err, result) {
        con.release();
        res.redirect('/'+note_name_notepad);
      });
  	});
  };
  function getNewName()
	{
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	    for( var i=0; i < 6; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));
	    return text;
	}
  this.create = function(notepad, res) {  
    connection.acquire(function(err, con) {
      notepad.id = uuid.v1();
      if(!notepad.note_name){
        notepad.note_name = getNewName();
      }
      console.log(JSON.stringify(notepad));
      con.query('insert into notepad set ?', notepad, function(err, result) {
        con.release();
         res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        if (err) {
          res.send({status: 1, message: 'notepad creation failed'});
        } else {
          var resp = {
            status : "200",
            message : "Notepad Created Successfully",
            name: notepad.note_name
          }
          res.send(resp);
        }
      });
    });
  };

  this.update = function(notepad, res) {  
    connection.acquire(function(err, con) {
      console.log(JSON.stringify(notepad));
      con.query('update notepad set ? where note_name = ?', [notepad, notepad.note_name], function(err, result) {
        con.release();
         res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        if (err) {
          res.send({status: 1, message: 'notepad creation failed'});
        } else {
          var resp = {
            status : "200",
            message : "Notepad Updated Successfully",
            name: notepad.note_name,
            text: result.text
          }
          res.send(resp);
        }
      });
    });
  };
 }
module.exports = new Notepad();