/* global describe, it, before, beforeEach */
/* jshint expr:true */

'use strict';

process.env.DBNAME = 'blueprint-test';

var expect = require('chai').expect;
var Mongo = require('mongodb');
var traceur = require('traceur');
var db = traceur.require(__dirname + '/../../helpers/db.js');
var factory = traceur.require(__dirname + '/../../helpers/factory.js');


var Location;

describe('Location', function(){
  before(function(done){
    db(function(){
      Location = traceur.require(__dirname + '/../../../app/models/location.js');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.collection('locations').drop(function(){
      factory('location', function(locations){
        done();
      });
    });
  });

  describe('.create', function(){
    it('should create a new location model', function(done){
      var obj = {name:'desert', rate:25};
      Location.create(obj, function(l){
        expect(l).to.be.instanceof(Location);
        expect(l).to.be.ok;
        expect(l.name).to.equal('desert');
        expect(l.rate).to.equal(25);
        expect(l._id).to.be.an.instanceOf(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should find location by id', function(done){
      Location.findById('0123456789abcdef01234567', function(l){
        expect(l._id).to.be.instanceOf(Mongo.ObjectID);
        expect(l).to.be.ok;
        expect(l).to.be.an.instanceOf(Location);
        done();
      });
    });
  });

  describe('.findAll', function(){
    it('should find all locations bruh', function(done){
      Location.findAll(function(locations){
        expect(locations).to.be.ok;
        expect(locations[0]).to.be.instanceOf(Location);
        done();
      });
    });
  });

});
