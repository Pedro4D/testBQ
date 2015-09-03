

'user strict'
//req va a ser directamente el objeto user

//Creamos el nuevo modelo
var mongoose = require('mongoose'),
    User = require('../model/user').User,
    ObjectId = mongoose.Types.ObjectId;



/**
 * createUser: Method to create an User by id
 * @param name  String with the user's name //mandatory
 * @param surname : String with the user's surname //mandatory
 * @param email : String with the user's email //mandatory
 */
exports.createUser = function (req, res){
    if(undefined !== req.body){
        var userModel = new User(req.body);
        //Guardamos el usuario en base de datos
        userModel.save(function (err,user) {
            if (!err) {
                //Si todo va bien enviamos de vuelta el usuario
                res.json({
                    type: true,
                    data: user
                })
            } else {
                res.status(500);
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            }
        });
    }else{
        res.status(500);
        res.json({
            type: false,
            data: "User Required"
        });
    }
};


/**
 * getUser: Method to get an User by id
 * @param user_id  ID of the user we want or all if not
 */
exports.getUser = function(req, res, next) {
    var user_id = req.params.user_id || null;

    if(user_id){
        User.findById(new ObjectId(user_id), function(err, user) {
            if (err) {
                res.status(500);
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                if (user) {
                    res.json({
                        type: true,
                        data: user
                    });
                } else {
                    res.json({
                        type: false,
                        data: "User: " + user_id + " not found"
                    });
                }
            }
        });

    }else{
        User.find({active:true}, function(err, users) {
            if (err) {
                res.status(500);
                res.json({
                    type: false,
                    data: "Error occured: " + err
                });
            } else {
                if (users.length >0) {
                    res.json({
                        type: true,
                        data: users
                    });
                } else {
                    res.json({
                        type: false,
                        data: "Not Users found"
                    });
                }
            }
        });
    }
};




/**
 * deleteUser: Method to make an logical delete of an User
 * @param user_id  ID of the user we want
 */
exports.deleteUser = function(req, res, next) {
    User.findByIdAndUpdate(new Object(req.params.user_id), {$set: {active: false} },function(err, user) {
        if (err) {
            res.status(500);
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            res.json({
                type: true,
                data: "User: " + req.params.user_id + " deleted successfully"
            });
        }
    });
};
