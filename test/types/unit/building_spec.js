/* global describe, it, before, beforeEach */
/* jshint expr:true */

'use strict';

process.env.DBNAME = 'blueprint-test';

var expect = require('chai').expect;
var Mongo = require('mongodb');
var traceur = require('traceur');
var db = traceur.require(__dirname + '/../../helpers/db.js');
var factory = traceur.require(__dirname + '/../../helpers/factory.js');


var Building;

describe('Building', function(){
  before(function(done){
    db(function(){
      Building = traceur.require(__dirname + '/../../../app/models/building.js');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.collection('buildings').drop(function(){
      factory('building', function(buildings){
        done();
      });
    });
  });

  describe('.create', function(){
    it('should create a new building model', function(done){
      var temp = {};
      temp.name = 'Space Elevator';
      temp.x = '100';
      temp.y = '100';
      temp.locationId = '0123456789abcdef01234567';
      temp.userId = '0123456789abcdef01234568';
      Building.create(temp, function(b){
        expect(b).to.be.an.instanceOf(Building);
        expect(b).to.be.ok;
        expect(b.x).to.equal(100);
        expect(b.y).to.equal(100);
        expect(b.userId).to.be.an.instanceOf(Mongo.ObjectID);
        expect(b.locationId).to.be.an.instanceOf(Mongo.ObjectID);
        done();
      });


    });
  });
});
