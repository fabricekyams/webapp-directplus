// Generated by CoffeeScript 1.4.0
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['jquery', 'backbone', 'application/views/conferenceView', 'bootstrap'], function($, Backbone, ConferenceView) {
  var slideScreen;
  return slideScreen = (function(_super) {

    __extends(slideScreen, _super);

    function slideScreen() {
      return slideScreen.__super__.constructor.apply(this, arguments);
    }

    slideScreen.prototype.tagName = 'li';

    slideScreen.prototype.className = "slide";

    slideScreen.prototype.template = _.template($('#slide-template').html());

    slideScreen.prototype.initialize = function() {
      this.listenTo(this.model, 'change', this.render);
      return console.log("slideScreen initilized");
    };

    slideScreen.prototype.render = function() {
      var modelId, slidet;
      console.log('render called');
      modelId = '#' + this.model.get('id');
      if (this.model.get('state') === 'removed') {
        $(modelId).parent().slideUp();
        $(modelId).parent().remove();
        slidet = this.model.get('title');
        $('.bottom-right').notify({
          type: 'inverse',
          message: {
            text: 'a slide had been removed: ' + slidet
          },
          fadeOut: {
            enabled: true,
            delay: 1000
          }
        }).show();
      } else {
        if ($(modelId).parent().hasClass('slide')) {
          console.log("lol");
        } else {
          console.log('je suis là');
          if (this.model.get('state') !== 'out') {
            $('#SlideList').append(this.$el.html(this.template(this.model.toJSON())));
          }
        }
        $(modelId).parent().removeClass().addClass("slide").addClass(this.model.get('state'));
      }
      if (this.model.get('state') === 'out') {
        return $(modelId).parent().remove();
      }
    };

    slideScreen.prototype["new"] = function() {
      var modelId,
        _this = this;
      modelId = '#' + this.model.get('id');
      $('#SlideList').append(this.$el.html(this.template(this.model.toJSON())));
      $(modelId).parent().removeClass().addClass("slide").addClass(this.model.get('state'));
      $(modelId).hide();
      return $(modelId).fadeIn(function() {
        return _this.model.set('state', 'current');
      });
    };

    return slideScreen;

  })(Backbone.View);
});
