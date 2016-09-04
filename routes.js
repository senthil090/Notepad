var todo = require('./models/notepad');

module.exports = {
  configure: function(app) {
    app.get('/createNew/', function(req, res) {
      todo.getName(res);
    });

    app.get('/checkExist/:id', function(req, res) {
      todo.get(req.params.id,res);
    });

    app.post('/notepad', function(req, res) {
      todo.create(req.body, res);
    });

    app.put('/notepad', function(req, res) {
      todo.update(req.body, res);
    });

    app.delete('/todo/:id/', function(req, res) {
      todo.delete(req.params.id, res);
    });
  }
};
