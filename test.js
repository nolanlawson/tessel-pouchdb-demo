var PouchDB = require('pouchdb');
require('pouchdb/extras/websql');

var db = new PouchDB('test.db', {adapter: 'websql'});
db.post({}).then(function () {
  console.log('done');
}).catch(console.log);
