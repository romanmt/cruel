var Engine = require('engine'),
    Library = require('library')

require("should")
require("mocha")

describe("Library", function() {
  describe("#nextRule", function() {
    var rules = [
      {
        name: '1',
        when: function(fact) {
          return fact.name === "matt" && !fact.isMatt
        },
        then: function(fact) {
          fact.isMatt = true
          return fact;
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
    it.only("gets the next aplicable rule", function(done) {
      var fact = {name: "matt"}
      Library.nextRule(rules, fact, function(err, result) {
        result.name.should.eql("1")
        done()
      })
    })
  })
})

describe("Engine", function() {
  var rules = [
      {
        name: '1',
        when: function(fact) {
          return fact.name === "matt" && !fact.isMatt
        },
        then: function(fact) {
          fact.isMatt = true
          return fact;
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

  describe("processes applicable rules", function() {
    it("returns the result of the rule", function(done) {
      var facts = [{name: matt}]
      Engine.process(facts, rules, function(err, result) {

        done()
      })

    })
  })

})
