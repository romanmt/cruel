var Engine = require('engine'),
    Library = require('library')

require("should")
require("mocha")

describe("Library", function() {
  describe("anyMatches", function() {
    it.only("returns true if there is a rule match", function() {
      var rules = [
        {
          when: function(fact) {
            return fact.name === "matt"
          }
        }
      ]

      Library.anyMatches(rules, [{name: 'matt'}], function(result) {
        result.should.eql(true)
      })
    })
  })

  describe("#nextRule", function() {
    var rules = [
      {
        name: '1',
        when: function(fact) {
          return fact.name === "matt" && !fact.isMatt
        },
        then: function(fact) {
          fact.isMatt = true
        }
      },
      {
        name: '2',
        when: function(fact) {
          return fact.name.length === 3 && !fact.mustBeBob
        },
        then: function(fact) {
          fact.mustBeBob = true
        }
      }
    ]
    it("gets the next aplicable rule", function(done) {
      var fact = {name: "matt"}
      Library.nextRule(rules, fact, function(result) {
        result.name.should.eql("1")
        done()
      })
    })
  })
})

describe("Engine", function() {
  var rules = [
      {
        when: function(fact) {
          return fact.name === "matt" && !fact.isMatt
        },
        then: function(fact) {
          fact.isMatt = true
          return fact;
        }
      },
      {
        when: function(fact) {
          var res = fact.name.length === 3 && !fact.mustBeBob
          console.log("must be bob check ", res)
          return res
        },
        then: function(fact) {
          fact.mustBeBob = true
          return fact
        }
      },
      {
        when: function(fact) {
          console.log(fact)
          var res = fact.mustBeBob && fact.name === "bob" && !fact.itIsBob
          console.log("is bob check ", res)
          return res;
        },
        then: function(fact) {
          fact.itIsBob = true
          return fact
        }
      }
    ]
  describe("multiple applicable rules", function() {
    it("executes all applicable rules", function(done) {
      var facts = [{name: "bob"}]
      Engine.process(facts, rules, function(err, results) {
        results[0].mustBeBob.should.eql(true)
        results[0].itIsBob.should.eql(true)
      })
      done()
    })
  })

  describe("processes applicable rules", function() {
    it("returns the results of the rule", function(done) {
      var facts = [{name: "matt"}]
      Engine.process(facts, rules, function(err, results) {
        results[0].isMatt.should.eql(true)
        done()
      })

    })
  })

})
