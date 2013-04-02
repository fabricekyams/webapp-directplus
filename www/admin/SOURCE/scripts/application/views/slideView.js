// Generated by CoffeeScript 1.4.0
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['jquery', 'backbone'], function($, Backbone) {
  var slideView;
  return slideView = (function(_super) {

    __extends(slideView, _super);

    function slideView() {
      return slideView.__super__.constructor.apply(this, arguments);
    }

    slideView.prototype.tagName = 'li';

    slideView.prototype.className = 'slide';

    slideView.prototype.template = _.template($('#slide-template').html());

    slideView.prototype.initialize = function() {
      console.log("Admin initialization");
      return this.listenTo(this.model, 'change', this.render());
    };

    slideView.prototype.render = function() {
      console.log("rendering");
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    };

    slideView.prototype.send = function() {
      return console.log("send");
    };

    slideView.prototype.remove = function() {
      return console.log("remove");
    };

    return slideView;

  })(Backbone.View);
});