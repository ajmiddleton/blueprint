'use strict';

// var floors = global.nss.db.collection('floors');
// var Mongo = require('mongodb');
// var _ = require('lodash');
// var fs = require('fs');
// var traceur = require('traceur');
// var Base = traceur.require(__dirname + '/base.js');

class Building{
  static create(obj, fn){
    if(obj && obj.name && obj.x && obj.y && obj.locationId && obj.userId){
      if(typeof obj.x === 'string'){
        obj.x *= 1;
      }
      if(typeof obj.y === 'string'){
        obj.y *= 1;
      }
      if(typeof obj.x === 'string'){
        obj.x *= 1;
      }
      if(typeof obj.x === 'string'){
        obj.x *= 1;
      }



    }else{
      fn(null);
    }

  }

  // static findById(id, fn){
  //   Base.findById(id, floors, Floor, fn);
  // }
  //
  // static findAll(fn){
  //   Base.findAll(floors, Floor, fn);
  // }
}

module.exports = Building;
