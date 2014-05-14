'use strict';

var users = global.nss.db.collection('users');
var trees = global.nss.db.collection('trees');
var Mongo = require('mongodb');
var treeHelper = require('../lib/tree-helper.js');//importing tree-helper file (object)
var _ = require('lodash');

exports.index = (req, res)=>{
  res.render('game/index', {title: 'Builder'});
};


exports.login = (req, res)=>{
  var user = {};
  user.username = req.body.username;
  user.wood = 0;
  user.cash = 0;

  users.findOne({username: user.username}, (err, record)=>{//findOne returns object as opposed to find which returns an array of objects.
    if(record){//preventing duplicate users with same username
      res.send(record);//send origin record if that already exists
    }else{
      users.save(user, (e, newObj)=>{
        res.send(newObj);//send new object if original record does not exist
      });
    }
  });
};

exports.chop = (req, res)=>{
  var userId = Mongo.ObjectID(req.body.userId);
  var tree = {};

  tree.height = 0;
  tree.userId = userId;
  tree.isHealthy = true;
  tree.isChopped = false;

  trees.save(tree, (err, obj)=>{//saving new object into new collection (trees)
    res.render('game/tree', {tree:obj, treeHelper:treeHelper}, (err, html)=>{
      res.send(html);
    });
  });
};


exports.seed = (req, res)=>{
  var userId = Mongo.ObjectID(req.body.userId);
  var tree = {};

  tree.height = 0;
  tree.userId = userId;
  tree.isHealthy = true;
  tree.isChopped = false;

  trees.save(tree, (err, obj)=>{//saving new object into new collection (trees)
    res.render('game/tree', {tree:obj, treeHelper:treeHelper}, (err, html)=>{
      res.send(html);
    });
  });
};


exports.forest = (req, res)=>{
  var userId = Mongo.ObjectID(req.params.userId);
  trees.find({userId:userId}).toArray((err, forest)=>{//retrieving all trees with userId of the current user
    res.render('game/forest', {trees:forest, treeHelper:treeHelper}, (err, html)=>{//adding callback function that contains newly created html
      res.send(html);
    });
  });
};


exports.grow = (req, res)=>{
  var treeId = Mongo.ObjectID(req.params.treeId);

  trees.findOne({_id:treeId}, (err, tree)=>{
    // if(tree.isHealthy === true){
      tree.height += _.random(0, 2);
      tree.isHealthy = _.random(0, 100) !== 69; //tree.isHealthy is a boolean value so we can set up this 'if-like' syntax for it.
      trees.save(tree, (err, obj)=>{//injecting tree instead of obj since this tree already exists
        res.render('game/tree', {tree: tree, treeHelper:treeHelper}, (err, html)=>{
          res.send(html);
        });
      });
    // }
  });
};
