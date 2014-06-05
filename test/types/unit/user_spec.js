/* global describe, it, before, beforeEach */
/* jshint expr:true */

'use strict';

process.env.DBNAME = 'blueprint-test';

var expect = require('chai').expect;
var Mongo = require('mongodb');
var traceur = require('traceur');
var db = traceur.require(__dirname + '/../../helpers/db.js');
var factory = traceur.require(__dirname + '/../../helpers/factory.js');

var User;

describe('User', function(){
  before(function(done){
    db(function(){
      User = traceur.require(__dirname + '/../../../app/models/user.js');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.collection('users').drop(function(){
      factory('user', function(users){
        done();
      });
    });
  });

  describe('.create', function(){
    it('should successfully create a user', function(done){
      var obj = {email:'bob@aol.com', password: '1234'};
      User.create(obj, function(u){
        expect(u).to.be.ok;
        expect(u).to.be.an.instanceOf(User);
        expect(u._id).to.be.an.instanceOf(Mongo.ObjectID);
        expect(u.password).to.have.length(60);
        done();
      });
    });

    it('should refuse to create a duplicate user', function(done){
      var obj = {email:'sue@aol.com', password: '1234'};
      User.create(obj, function(u){
        expect(u).to.be.null;
        done();
      });
    });
  });

  describe('.findById', function(){
    it('should successfully find a user by their _id', function(done){
      User.findById('0123456789abcdef01234568', function(user){
        expect(user).to.be.ok;
        expect(user).to.be.an.instanceOf(User);
        expect(user._id).to.be.an.instanceOf(Mongo.ObjectID);
        expect(user.password).to.have.length(60);
        done();
      });
    });

    it('should fail to find a user with a nonexistent _id', function(done){
      User.findById('not an id', function(user){
        expect(user).to.be.null;
        done();
      });
    });
  });
});
