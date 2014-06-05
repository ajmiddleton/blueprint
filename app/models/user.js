'use strict';

var Mongo = require('mongodb');
var users = global.nss.db.collection('users');
var bcrypt = require('bcrypt');
var _ = require('lodash');
var traceur = require('traceur');
var Base = traceur.require(__dirname + '/base.js');

class User{
  static create(obj, fn){
    User.findByEmail(obj.email, u=>{
      if(u !== null){
        fn(null);
      }else{
        obj.password = bcrypt.hashSync(obj.password, 8);
        obj = _.create(User.prototype, obj);
        obj._id = Mongo.ObjectID(obj._id);
        users.save(obj, ()=>fn(obj));
      }
    });
  }

  static findByEmail(email, fn){
    users.findOne({email:email}, (e, u)=>fn(u));
  }

  static findById(id, fn){
    Base.findById(id, users, User, fn);
  }
}

module.exports = User;
