// Generated by CoffeeScript 1.4.0
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['application/config', 'application/views/mainView', 'application/models/app', 'vendors/socketio/socketio'], function(Config, MainView, App) {
  /*
      Gere les communication serveur
  */

  var Application;
  return Application = (function(_super) {

    __extends(Application, _super);

    Application.prototype.routes = {
      'home': 'homeScreen',
      'conference/:orgid': 'conferenceScreen',
      'slides/:orgid/:confid': 'slideScreen',
      '*actions': 'homeScreen'
    };

    function Application() {
      this.slScreen = __bind(this.slScreen, this);
      Application.__super__.constructor.call(this, this.routes);
    }

    Application.prototype.initialize = function() {
      var _this = this;
      this.socket = io.connect(Config.serverUrl);
      /*@router.on 'orgRoute', ()=>
        @connect()
      
      @router.on 'confRoute', (data)=>
        @socket.emit 'organisationChoosed', data
      
      @router.on 'slideRoute', (data)=>
      
      
        console.log 'app slideRoute id conf choosed: ', data
        @socket.emit 'conferenceChoosed', data
      */

      this.app = new App();
      this.mainView = new MainView({
        model: this.app
      });
      this.socket.on('organisations', function(data) {
        console.log('app organisations recieved: ', data);
        return _this.app.trigger("organisations", data);
      });
      this.socket.on('conferences', function(data) {
        console.log("app confList received", data);
        return _this.app.trigger('conferences', data);
      });
      this.socket.on('slides', function(data) {
        console.log('app slides received', data);
        return _this.app.trigger('slides', data);
      });
      this.socket.on('snext', function(data) {
        console.log("snext received");
        return _this.app.trigger('newSlide', data);
      });
      this.socket.on('sremove', function(data) {
        console.log("remove ask received");
        return _this.app.trigger('sremove', data);
      });
      this.socket.on('sreset', function(data) {
        console.log("reseting");
        localStorage.clear();
        $('#SlideList').empty();
        return _this.app.trigger('reseting', data);
      });
      this.socket.on('connect', function(data) {
        console.log("connected");
        return _this.mainView.trigger('ServerConnection', data);
      });
      this.socket.emit('user', '');
      this.on('route:conferenceScreen', function(orgid) {
        return _this.confScreen(orgid);
      });
      this.on('route:homeScreen', function() {
        return _this.orgScreen();
      });
      this.on('route:slideScreen', function(orgid, confid) {
        return _this.slScreen(orgid, confid);
      });
      return Backbone.history.start();
    };

    Application.prototype.orgScreen = function() {
      var _this = this;
      if (this.app.get('organisations').isEmpty()) {
        setTimeout(function() {
          return _this.orgScreen();
        }, 100);
      }
      if (this.app.get('organisations').isEmpty() === false) {
        this.connect();
        return $('.slides').fadeOut(function() {
          return $('.confBlock').fadeIn();
        });
      }
    };

    Application.prototype.confScreen = function(orgid) {
      var _this = this;
      console.log("emmission choosed");
      if (this.app.get('organisations').isEmpty()) {
        setTimeout(function() {
          return _this.confScreen(orgid);
        }, 100);
      }
      if (this.app.get('organisations').isEmpty() === false) {
        this.socket.emit('organisationChoosed', orgid);
        this.orgChoose = true;
        return $('.slides').fadeOut(function() {
          return $('.confBlock').fadeIn();
        });
      }
    };

    Application.prototype.slScreen = function(orgid, confid) {
      var _this = this;
      if (this.app.get('organisations').isEmpty()) {
        setTimeout(function() {
          return _this.slScreen(orgid, confid);
        }, 100);
      }
      if (this.app.get('organisations').isEmpty() === false) {
        if (typeof this.orgChoose === 'undefined') {
          this.socket.emit('organisationChoosed', orgid);
          this.orgChoose = true;
        }
        if (typeof this.app.get('organisations').get(orgid) === 'undefined') {
          console.log('get org id est indefini');
          setTimeout(function() {
            return _this.slScreen(orgid, confid);
          }, 2000);
        }
        if (typeof this.app.get('organisations').get(orgid) !== 'undefined') {
          console.log("get orgid est defini");
          if (this.app.get('organisations').get(orgid).get('conferencesC').isEmpty()) {
            console.log("la liste des conferences est vide");
            setTimeout(function() {
              return _this.slScreen(orgid, confid);
            }, 100);
          }
          if (this.app.get('organisations').get(orgid).get('conferencesC').isEmpty() === false) {
            console.log("je suis là");
            this.socket.emit('conferenceChoosed', confid);
            $('.confBlock').fadeOut(function() {});
            return $('.slides').fadeIn();
          }
        }
      }
    };

    Application.prototype.connect = function() {
      return this.socket.emit('allConfs', '');
    };

    return Application;

  })(Backbone.Router);
});
