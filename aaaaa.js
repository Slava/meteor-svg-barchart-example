if (Meteor.isClient) {
  var data = [{
    name: "bla",
    values: [ 1, 3, 5, 2, 4 ]
  }, {
    name: "ddd",
    values: [7, 3]
  }, {
    name: "sssaasjs",
    values: [5, 3, 4, 9]
  }, {
    name: "setdd",
    values: [3, 11, 1]
  }];

  var colors = _.shuffle(randomColors(1000));
  var sum = function (a) {
    return _.reduce(a, function(memo, num){ return memo + num; }, 0);
  }

  Template.hello.helpers({
    rows: function () {
      return data;
    },
    offset: function () {
      return _.indexOf(data, this) * (60 + 5);
    },
    maxSum: function () {
      return _.max(_.map(data, function (row) {
        return sum(row.values);
      }));
    }
  });

  Template.row.helpers({
    offset: function (p) {
      var index = _.indexOf(p.data.values, this.valueOf());
      return sum(p.data.values.slice(0, index)) / p.maxUnit * p.maxWidth;
    },
    width: function (p) {
      return this.valueOf() / p.maxUnit * p.maxWidth;
    },
    color: function (p) {
      var index = _.indexOf(p.data.values, this.valueOf());
      return colors[index % colors.length];
    }
  });
}

function randomColors(total) {
  var r = [];
  for (var x=0; x<total; x++) {
    r.push(Math.random() * 360);
  }
  return r;
}

