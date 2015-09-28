var async = require('async')

exports.nextRule = function(rules, fact, cb) {
  async.filter(rules, function(rule, test) {
    test(rule.when(fact))
  }, function(applicableRules) {
    cb(null, applicableRules[0])
  })
}
