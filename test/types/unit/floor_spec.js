/* global describe, it, before, beforeEach, afterEach */
/* jshint expr:true */
/* jshint unused:false */

'use strict';

process.env.DBNAME = 'blueprint-test';

var expect = require('chai').expect;
var Mongo = require('mongodb');
var traceur = require('traceur');
var db = traceur.require(__dirname + '/../../helpers/db.js');
var factory = traceur.require(__dirname + '/../../helpers/factory.js');
var cp = require('child_process');
var fs = require('fs');

var Floor;

describe('Floor', function(){
  before(function(done){
    db(function(){
      Floor = traceur.require(__dirname + '/../../../app/models/floor.js');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.collection('floors').drop(function(){
      cp.execFile(__dirname + '/../../fixtures/clean.sh', {cwd:__dirname + '/../../fixtures'}, function(error, stdout, stderr){
        factory('floor', function(floors){
          done();
        });
      });
    });
  });

  afterEach(function(done){
    cp.execFile(__dirname + '/../../fixtures/after.sh', {cwd:__dirname + '/../../fixtures'}, function(error, stdout, stderr){
      console.log(error);
      done();
    });
  });

  describe('.create', function(){
    it('should create a floor object', function(done){
      var fields = {name:['hardwood'], rate:['50']};
      var files = {photo:[{originalFilename:'hardwood.jpg.test', path:__dirname + '/../../fixtures/copy/hardwood.jpg'}]};
      fields.photo = files.photo;

      Floor.create(fields, function(floor){
        expect(floor).to.be.ok;
        expect(floor).to.be.an.instanceOf(Floor);
        expect(floor._id).to.be.instanceOf(Mongo.ObjectID);
        expect(floor.rate).to.equal(50);
        expect(floor.name).to.equal('hardwood');
        expect(floor.photo).to.equal('/img/flooring/hardwood.jpg.test');
        var fileTest = fs.existsSync(__dirname + '/../../../app/static' + floor.photo);
        expect(fileTest).to.be.true;

        done();
      });
    });
  });

  //findbyid
  describe('.findById', function(){
    it('should find a floor object by id', function(done){
      Floor.findById('0123456789abcdef01234567', function(floor){
        expect(floor).to.be.ok;
        expect(floor).to.be.an.instanceOf(Floor);
        expect(floor.name).to.equal('tile');
        done();
      });
    });
  });
  //findall
  describe('.findAll', function(){
    it('should find all the floor records', function(done){
      Floor.findAll(function(floors){
        expect(floors).to.be.ok;
        expect(floors.length).to.equal(1);
        done();
      });
    });
  });

});
