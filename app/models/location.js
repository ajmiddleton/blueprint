/* jshint unused:false */
'use strict';

var locations = global.nss.db.collection('locations');
var traceur = require('traceur');
var Base = traceur.require(__dirname + '/base.js');
var Mongo = require('mongodb');
var _ = require('lodash');

class Location{
  static create(obj, fn){
    if(obj.name && obj.rate){
      if(typeof obj.rate === 'string'){ obj.rate *= 1;}
      obj = _.create(Location.prototype, obj);
      obj._id = Mongo.ObjectID(obj._id);
      locations.save(obj, ()=>fn(obj));
    }else{
      fn(null);
    }
  }

  static findById(id, fn){
    Base.findById(id, locations, Location, fn);
  }

  static findAll(fn){
    Base.findAll(locations, Location, fn);
  }
}

module.exports = Location;
