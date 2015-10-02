var async = require('async')


exports.anyMatches = function(rules, facts, cb) {
  async.any(facts, function(fact, next) {
    nextRule(rules, fact, function(rule) {
      next(!!rule)
    })
  }, cb)
}


var nextRule = exports.nextRule = function (rules, fact, cb) {
  async.filter(rules, function(rule, test) {
    test(rule.when(fact))
  }, function(applicableRules) {
    cb(applicableRules[0])
  })
}
