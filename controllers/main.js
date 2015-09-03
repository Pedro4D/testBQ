var fs = require('fs'),
    mongoose = require('mongoose'),
    Script = require('../model/script').Script;

/**
 * executeCode: Method to create an User by id
 * @param name  String with the user's name //mandatory
 * @param surname : String with the user's surname //mandatory
 * @param email : String with the user's email //mandatory
 */
exports.executeCode = function (req, res){
  var scripts,
      fn = null,
      methods = {};

  fs.readFile('./script/script.json', 'utf8', function (err, val) {
      if (err) throw err;
      scripts = JSON.parse(val);
      for (var i=0; i<scripts.length; i++){

          if(i===0) {
              //Execute test
              methods.user = function (_fn, lib) {
                  var fn = Function.call(null, _fn);

                  if (typeof fn === 'function') {
                      fn.apply(this, arguments[1]);
                      res.send(200);
                  } else {
                      console.debug('no function');
                  }

              };
              var test = {};
              test.lib = scripts[i].lib;
              test.code = scripts[i].method+';';

              methods.user.call(this, test.code, test.lib);
          }else{
              var scriptModel = new Script(scripts[i]);
              //Guardamos el script en base de datos
              scriptModel.save(function (err,script) {
                  if (err) {
                      console.log("Error: "+err);
                  }
              });
          }
      }

  });


};

/**
 * readCode: Method to read code
 */
exports.readCode = function (req, res){
    Script.find({method : req.params.method}, function(err, script) {
        if (err) {
            res.status(500);
            res.json({
                data: "Error occured: " + err
            });
        } else {
            if (script) {
                //TODO ejecutar script
            } else {
                res.json({
                    data: "Error XXX"
                });
            }
        }
    });

};
