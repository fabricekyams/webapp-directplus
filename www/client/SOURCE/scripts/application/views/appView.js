// Generated by CoffeeScript 1.4.0
var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['jquery', 'backbone', 'application/models/slide', 'application/views/slideScreen', 'application/collections/slides'], function($, Backbone, Slide, SlideView, Slides) {
  var appView;
  return appView = (function(_super) {

    __extends(appView, _super);

    function appView() {
      return appView.__super__.constructor.apply(this, arguments);
    }

    appView.prototype.el = '#header';

    appView.prototype.template = _.template($('#app-template').html());

    appView.prototype.events = {
      'click #previous': 'previous',
      'click #next': 'next'
    };

    appView.prototype.initialize = function() {
      var _this = this;
      this.slides = new Slides();
      this.render();
      this.on('newSlide', function(data) {
        return _this.newSlide(data);
      });
      this.on('ServerConnection', function(data) {
        return _this.connectNotif(data);
      });
      this.on('reseting', function(data) {
        _this.slides.reset();
        _this.slides.position = 0;
        return _this.navigationMode = false;
      });
      this.slides.fetch();
      return this.restore();
    };

    appView.prototype.connectNotif = function(data) {
      return $('.js-status').removeClass('disconnected').addClass('connected');
    };

    appView.prototype.render = function() {
      this.$el.html(this.template());
      return this;
    };

    appView.prototype.previous = function() {
      var newPosSlide, previous, slide, slideView;
      console.log(this.slides.position);
      if (this.slides.position > 0) {
        $('.far-future').remove();
        $('.future').removeClass('future').addClass('far-future');
        $('.current').removeClass('current').addClass('future');
        $('.past').removeClass('past').addClass('current');
        $('.far-past').removeClass('far-past').addClass('past');
        this.slides.position = this.slides.position - 1;
        previous = this.slides.at(this.slides.position);
        this.navigationMode = true;
        if (this.slides.position > 1) {
          newPosSlide = this.slides.position - 2;
          slide = this.slides.at(newPosSlide);
          slideView = new SlideView({
            model: slide
          });
          $('#SlideList').append(slideView.render().el);
          $('.new').removeClass('new').addClass('far-past');
        }
      }
      return console.log(this.navigationMode);
    };

    appView.prototype.next = function() {
      var newPosSlide, previous, slide, slideView;
      if (this.slides.position < (this.slides.length - 1)) {
        console.log("I am in");
        $('.far-past').remove();
        $('.past').removeClass('past').addClass('far-past');
        $('.current').removeClass('current').addClass('past');
        $('.future').removeClass('future').addClass('current');
        $('.far-future').removeClass('far-future').addClass('future');
        this.slides.position = this.slides.position + 1;
        previous = this.slides.at(this.slides.position);
        if (this.slides.position === (this.slides.length - 1)) {
          this.navigationMode = false;
        }
        if (this.slides.position < (this.slides.length - 2)) {
          newPosSlide = this.slides.position + 2;
          slide = this.slides.at(newPosSlide);
          slideView = new SlideView({
            model: slide
          });
          $('#SlideList').append(slideView.render().el);
          $('.new').removeClass('new').addClass('far-future');
        }
      }
      return console.log(this.navigationMode);
    };

    appView.prototype.newSlide = function(data) {
      var slide, slideView;
      slide = new Slide(data);
      slideView = new SlideView({
        model: slide
      });
      this.slides.add(slide);
      slide.save();
      this.slides.fetch();
      if (this.navigationMode) {
        console.log("Je Suis ICI? True?");
        if (this.slides.position === this.slides.length - 3) {
          $('#SlideList').append(slideView.render().el);
          return $('.new').removeClass('new').addClass('far-future');
        }
      } else {
        console.log("ou là?");
        this.slides.position = this.slides.length - 1;
        $('#SlideList').append(slideView.render().el);
        return this.last();
      }
    };

    appView.prototype.showLast = function() {
      var lastSlide;
      this.slides.each(function(slide) {
        var id;
        id = '#' + slide.id;
        return $(id).hide();
      });
      lastSlide = this.slides.at(this.slides.length - 1);
      if (lastSlide) {
        $('#' + lastSlide.id).show();
      }
      if (this.slides.length === 0) {
        return this.slides.position = 0;
      } else {
        return this.slides.position = this.slides.length - 1;
      }
    };

    appView.prototype.restore = function() {
      var max, num, slide, slideView, taille;
      this.navigationMode = false;
      console.log(this.navigationMode);
      taille = this.slides.length;
      max = 3;
      num = 0;
      while (max > 0 && taille > 0) {
        taille--;
        max--;
        num++;
        slide = this.slides.at(taille);
        slideView = new SlideView({
          model: slide
        });
        $('#SlideList').append(slideView.render().el);
        switch (num) {
          case 1:
            $('.new').removeClass('new').addClass('current');
            break;
          case 2:
            $('.new').removeClass('new').addClass('past');
            break;
          case 3:
            $('.new').removeClass('new').addClass('far-past');
        }
      }
      return this.slides.position = this.slides.length - 1;
    };

    appView.prototype.last = function() {
      $('.new').removeClass('new').addClass('future');
      $('.future').hide();
      $('.future').fadeIn();
      $('.far-past').remove();
      $('.past').removeClass('past').addClass('far-past');
      $('.current').removeClass('current').addClass('past');
      $('.future').removeClass('future').addClass('current');
      $('.far-future').removeClass('far-future').addClass('future');
      console.log("my position ", this.slides.position);
      return this.next();
    };

    appView.prototype.addTemplate = function() {
      if (navigationMode) {

      } else {
        return $('#SlideList').append(slideView.render().el);
      }
    };

    return appView;

  })(Backbone.View);
});