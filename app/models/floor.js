'use strict';

var floors = global.nss.db.collection('floors');
var Mongo = require('mongodb');
var _ = require('lodash');
var fs = require('fs');
var traceur = require('traceur');
var Base = traceur.require(__dirname + '/base.js');

class Floor{
  static create(obj, fn){
    if(!obj){fn(null); return;}
    if(typeof obj.rate[0] === 'string'){obj.rate[0] *= 1;}
    if(!obj.name || !obj.photo || !obj.rate){fn(null); return;}
    var temp = {};
    temp._id = Mongo.ObjectID(obj._id);
    temp.name = obj.name[0];
    temp.rate = obj.rate[0];
    temp.photo = '/img/flooring/' + obj.photo[0].originalFilename;
    temp = _.create(Floor.prototype, temp);
    fs.rename(obj.photo[0].path, __dirname + '/../static' + temp.photo, ()=>floors.save(temp, ()=>fn(temp)));
  }

  static findById(id, fn){
    Base.findById(id, floors, Floor, fn);
  }

  static findAll(fn){
    Base.findAll(floors, Floor, fn);
  }
}

module.exports = Floor;
