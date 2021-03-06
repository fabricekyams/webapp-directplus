// Generated by CoffeeScript 1.4.0

define(['jquery'], function($) {
  return describe("As user I want to be able to go back to a previous slide", function() {
    describe("test that the previous slide is shown", function() {
      return it("should display the previous slide received", function() {
        var found, testpreviousSlide;
        found = null;
        runs(function() {
          return found = false;
        });
        testpreviousSlide = function() {
          $('#SlideList>li').each(function(index, elem) {
            if ($(elem).hasClass('future')) {
              return found = true;
            }
          });
          if (found) {
            return true;
          } else {
            return false;
          }
        };
        waitsFor(testpreviousSlide, "previous slide found", 10000);
        return runs(function() {
          return expect(found).toBe(true);
        });
      });
    });
    return describe("test that the next slide is shown", function() {
      return it("should display the next slide received", function() {
        var found, nextId, testpreviousSlide;
        found = null;
        nextId = null;
        runs(function() {
          return found = false;
        });
        testpreviousSlide = function() {
          var testnextSlide;
          nextId = $(".future").children().attr('id');
          testnextSlide = function() {
            if ($(".current").children().attr('id') === nextId) {
              found = true;
              return true;
            } else {
              return false;
            }
          };
          waitsFor(testnextSlide, "next slide found", 10000);
          return true;
        };
        waitsFor(testpreviousSlide, "previous slide found", 10000);
        return runs(function() {
          return expect(found).toBe(true);
        });
      });
    });
  });
});
