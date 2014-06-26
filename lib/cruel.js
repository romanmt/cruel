var _ = require('lodash')

var Cruel = function(rules, current) {
  this.rules = rules || []
  this.current = current
}

Cruel.prototype.fire = function(ruleSet, facts, cb) {
    _.chain(this.rules)
    .filter({set: ruleSet})
    .each(function(rule) {
      console.log(rule)
      if(rule.predicate(facts))
        rule.impl.call(this, null, facts)
    })
  if (cb) cb(null, facts)
}

Cruel.prototype.ruleSet = function(name) {
  var rules = _.clone(this.rules)
  return new Cruel(rules, name)
}

Cruel.prototype.add = function(name, predicate, implementation) {
  if(_.isUndefined(implementation)) {
    implementation = predicate
    predicate = function() { return true }
  }
  var rules = _.clone(this.rules)
  var rule = {
    set: this.current,
    name: name,
    predicate: predicate,
    impl: implementation
  }
  rules.push(rule)
  return new Cruel(rules, this.current)
}

Cruel.prototype.ls = function(ruleSet) {
  if(ruleSet) {
    return _.chain(this.rules)
      .filter({set: ruleSet})
      .pluck('name')
      .uniq()
      .value();
  } else {
    return _.chain(this.rules)
      .pluck('set')
      .uniq()
      .value()
  }
}

Cruel.prototype.active = function() {
  return this.current || ""
}

module.exports = Cruel

// var rules = new Cruel()

// rules.ruleSet("rules 1")
//   .add("ask bill", function() {

//   })
//   .add("Tell someone", function() {

//   })

// rules.fire("rules 1")
