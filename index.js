#!/usr/bin/env node
'use strict'
var fs = require('fs');
var Cmd = require('cmd-interface');
var iconv = require('iconv-lite');
var projConf = require('./package.json');

var cmd = new Cmd.Commander({
  name : 'fconv'
});

cmd.option({
  cmd : '-u2g',
  description : 'conv file from utf-8 to gbk',
  handler : function(parse){
    var file = parse['u2g'];
    file = file[0];
    
    if(file){
      fs.readFile(file, function(err, data) {
        if (err) {
          console.error(err);
        } else {
          var str = iconv.decode(data, 'utf-8'); 
          var str2 = iconv.encode(str, 'gbk');

          fs.unlinkSync(file);
          
          fs.writeFile(file, str2, null, function (err) {
            if (err) throw err;
            console.log(file + '\'s saved as gbk charset!');
          });
        }
      });
    }
  }
});

cmd.option({
  cmd : '-g2u',
  description : 'conv file from gbk to utf-8',
  handler : function(parse){
    var file = parse['g2u'];
    file = file[0];
    
    if(file){
      fs.readFile(file, function(err, data) {
        if (err) {
          console.error(err);
        } else {
          var str = iconv.decode(data, 'gbk'); 
          var str2 = iconv.encode(str, 'utf-8');

          fs.unlinkSync(file);
          
          fs.writeFile(file, str2, null, function (err) {
            if (err) throw err;
            console.log(file + '\'s saved as utf-8 charset!');
          });
        }
      });
    }
  }
});

cmd.version(projConf.version);
cmd.run();