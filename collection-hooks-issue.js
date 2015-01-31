Stuff = new Mongo.Collection('stuff');

if (Meteor.isServer) {
  Meteor.startup(function () {
    if (!Stuff.find().count()) {
      for (var i = 0; i < 100; i++) {
        Stuff.insert({ a: Random.id() });
      }
    }

    Stuff.find({
      a: { $exists: true },
    }, { 
      fields: { 
        a: 1
      } 
    }).observeChanges({
      added: function (id, fields) {
        Stuff.direct.update(id, {
          $set: {
            b: fields.a
          }
        }); 
      }
    });
  });
}
