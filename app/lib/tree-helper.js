'use strict';

function getClass(height){
  if(height === 0){
    return 'seed';
  }
  if(height <= 12){
    return 'sapling';
  }
  if(height <=48){
    return 'treenager';
  }
  return 'adult';
}

exports.getClass = getClass; //module.exports only exports one thing
