var PouchDB = require('pouchdb-core')
  .plugin(require('pouchdb-adapter-node-websql'))
  .plugin(require('pouchdb-adapter-http'))
  .plugin(require('pouchdb-replication'));

var local = new PouchDB('/mnt/sda2/mypouch.db', {adapter: 'websql'});
console.log('adapter is', local.adapter);

local.post({hello: 'tessel'}).then(function () {
  console.log('wrote a doc');
  local.sync('http://10.0.0.176:5984/tessel', {
    live: true,
    retry: true
  }).on('change', function (change) {
    console.log('received change', JSON.stringify(change));
  });
}).then(function () {
  console.log('synced to couchdb');
}).catch(function (err) {
  console.log(err.stack);
});
