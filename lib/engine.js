var async = require('async'),
    library = require('library')

exports.process = function(facts, rules, cb) {
  async.map(facts, function (f, next) {
    library.nextRule(rules, f, function(rule) {
      if(rule) {
        var res = rule.then(f)
        next(null, res)
      }
      else {
        next(null, f)
      }
    })
  }, cb)
}
