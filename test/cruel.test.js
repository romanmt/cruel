var Cruel = require('../lib/cruel'),
    rules = new Cruel()

require('should')
require('mocha')

describe('ruleSet', function() {
  it("sets the active rule set for modification", function(){
    rules.ruleSet("my rules")
      .active().should.eql("my rules")
  })
})

describe('add', function() {
  it("adds a rule to the existing ruleset", function() {
    rules.ruleSet("my rules")
      .add("step 1")
      .ls("my rules").should.eql(["step 1"])
  })
})

describe('fire', function() {
  it('executes the rule implementation function', function(done) {
    rules.ruleSet("My Rules")
      .add("Step 1", function(err, fact) {
        fact.should.eql("that is a fact jack")
        done()
      }).fire("My Rules", "that is a fact jack")
  })

  describe('with an empty rule set', function() {
    it("yields the given facts unchanged", function(done){

      var facts = "this is a fact"
      rules.fire('rules 1', facts, function(err, result) {
        result.should.equal('this is a fact')
        done()
      })
    })
  })

  describe('with predicate', function() {
    it.only('fires on true', function(done) {
      var pred = function(fact) {
        console.log(fact)
        return fact.amount === 1
      }
      rules.ruleSet("my rules").add("only if true", pred, function(err) {
        done()
      }).fire("my rules", {amount: 1})
    })
  })
})
