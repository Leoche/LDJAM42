webpackJsonp([0],{

/***/ 1077:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Player = exports.Player = function (_Phaser$GameObjects$S) {
  _inherits(Player, _Phaser$GameObjects$S);

  function Player(scene, mapX, mapY) {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this, scene, mapX * 32, mapY * 32));

    _this.name = "player";
    _this.setTexture('player');
    _this.setOrigin(0, 0);
    _this.setPosition(mapX * 32, mapY * 32);
    _this.frameBase = 20;
    _this.catching = 0;
    _this.catched = null;
    _this.depth = 1000;
    _this.isWinning = false;
    _this.willWinning = false;
    _this.map = {
      x: mapX,
      y: mapY
    };
    _this.nextPosition = {
      x: mapX * 32,
      y: mapY * 32
    };
    _this.directionToFrame = {
      left: 10,
      right: 0,
      up: 30,
      down: 20
    };
    _this.moving = false;
    return _this;
  }

  _createClass(Player, [{
    key: "move",
    value: function move(direction, canMove) {
      if (this.moving || this.isWinning) return;
      if (this.catching === 0) this.frameBase = this.directionToFrame[direction];
      if (!canMove) return;
      this.moving = true;
      if (direction === "left") {
        this.nextPosition.x -= 32;
        this.map.x--;
        if (!this.catching) this.anims.play('left');else this.setFrame(this.frameBase + this.catching);
      } else if (direction === "right") {
        this.nextPosition.x += 32;
        this.map.x++;
        if (!this.catching) this.anims.play('right');else this.setFrame(this.frameBase + this.catching);
      } else if (direction === "down") {
        this.nextPosition.y += 32;
        this.map.y++;
        if (!this.catching) this.anims.play('down');else this.setFrame(this.frameBase + this.catching);
      } else if (direction === "up") {
        this.nextPosition.y -= 32;
        this.map.y--;
        if (!this.catching) this.anims.play('up');else this.setFrame(this.frameBase + this.catching);
      }
    }
  }, {
    key: "catch",
    value: function _catch(block) {
      this.catching = 6;
      this.catched = block;
    }
  }, {
    key: "release",
    value: function release() {
      this.catching = 0;
      this.catched = null;
    }
  }, {
    key: "getDirection",
    value: function getDirection() {
      if (this.frameBase >= 30) return 'up';
      if (this.frameBase >= 20) return 'down';
      if (this.frameBase >= 10) return 'left';
      if (this.frameBase >= 0) return 'right';
    }
  }, {
    key: "update",
    value: function update() {
      if (this.isWinning) {
        return;
      }
      if (!this.moving) {
        this.setFrame(this.frameBase + this.catching);
      }
      if (this.nextPosition.x !== this.x) {
        if (this.nextPosition.x > this.x) this.x += 2;else this.x -= 2;
      } else if (this.nextPosition.y !== this.y) {
        if (this.nextPosition.y > this.y) this.y += 2;else this.y -= 2;
      } else {
        this.moving = false;
        if (this.willWinning) this.isWinning = true;
        if (this.isWinning) this.anims.play('win');
      }
    }
  }]);

  return Player;
}(Phaser.GameObjects.Sprite);

/***/ }),

/***/ 1078:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.BlockIce = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Block2 = __webpack_require__(435);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BlockIce = exports.BlockIce = function (_Block) {
    _inherits(BlockIce, _Block);

    function BlockIce(scene, mapX, mapY) {
        _classCallCheck(this, BlockIce);

        var _this = _possibleConstructorReturn(this, (BlockIce.__proto__ || Object.getPrototypeOf(BlockIce)).call(this, scene, mapX, mapY));

        _this.setFrame(50);
        _this.color = "blue";
        _this.name = "blockice";
        return _this;
    }

    _createClass(BlockIce, [{
        key: "slide",
        value: function slide(direction) {
            this.catchable = false;
            this.sliding = direction;
        }
    }, {
        key: "update",
        value: function update() {
            _get(BlockIce.prototype.__proto__ || Object.getPrototypeOf(BlockIce.prototype), "update", this).call(this);
        }
    }]);

    return BlockIce;
}(_Block2.Block);

/***/ }),

/***/ 1079:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Door = exports.Door = function (_Phaser$GameObjects$S) {
  _inherits(Door, _Phaser$GameObjects$S);

  function Door(scene, mapX, mapY, color) {
    _classCallCheck(this, Door);

    var _this = _possibleConstructorReturn(this, (Door.__proto__ || Object.getPrototypeOf(Door)).call(this, scene, mapX * 32, mapY * 32));

    _this.name = "door";
    _this.color = color;
    _this.setTexture('player');
    _this.setOrigin(0, 0);
    _this.colors = {
      blue: 65,
      brown: 60
    };
    _this.frameBase = _this.colors[color];
    _this.setFrame(_this.frameBase);
    _this.setPosition(mapX * 32, mapY * 32);
    _this.map = {
      x: mapX,
      y: mapY
    };
    _this.open = false;
    _this.counter = 0;
    return _this;
  }

  _createClass(Door, [{
    key: "setOpen",
    value: function setOpen(opened) {
      this.open = opened;
    }
  }, {
    key: "update",
    value: function update() {
      if (this.open && this.frameBase !== this.colors[this.color] + 3) {
        this.counter += .1;
      } else if (!this.open && this.counter > 0) {
        this.counter -= .1;
      }
      if (this.counter < 0) this.counter = 0;
      if (this.counter > 3) this.counter = 3;
      this.setFrame(this.colors[this.color] + Math.floor(this.counter));
    }
  }]);

  return Door;
}(Phaser.GameObjects.Sprite);

/***/ }),

/***/ 1080:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Exit = exports.Exit = function (_Phaser$GameObjects$S) {
    _inherits(Exit, _Phaser$GameObjects$S);

    function Exit(scene, mapX, mapY, flipped) {
        _classCallCheck(this, Exit);

        var _this = _possibleConstructorReturn(this, (Exit.__proto__ || Object.getPrototypeOf(Exit)).call(this, scene, mapX * 32, mapY * 32));

        _this.name = "exit";
        _this.setTexture('player');
        _this.setOrigin(0, 0);
        _this.setFrame(94);
        _this.setFlip(flipped);
        _this.setPosition(mapX * 32, mapY * 32);
        _this.map = {
            x: mapX,
            y: mapY
        };
        _this.counter = 0;
        _this.speed = 50;
        return _this;
    }

    _createClass(Exit, [{
        key: "update",
        value: function update() {
            this.counter++;
            if (this.counter > this.speed / 2) this.setFrame(93);else this.setFrame(94);
            if (this.counter > this.speed) this.counter = 0;
        }
    }]);

    return Exit;
}(Phaser.GameObjects.Sprite);

/***/ }),

/***/ 1081:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = exports.Button = function (_Phaser$GameObjects$S) {
    _inherits(Button, _Phaser$GameObjects$S);

    function Button(scene, mapX, mapY, color) {
        _classCallCheck(this, Button);

        var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, scene, mapX * 32, mapY * 32));

        _this.name = "button";
        _this.color = color;
        _this.setTexture('player');
        _this.setOrigin(0, 0);
        var colors = {
            blue: 69,
            brown: 64
        };
        _this.frameBase = colors[color];
        _this.setFrame(_this.frameBase);
        _this.setPosition(mapX * 32, mapY * 32);
        _this.map = {
            x: mapX,
            y: mapY
        };
        return _this;
    }

    _createClass(Button, [{
        key: "update",
        value: function update() {}
    }]);

    return Button;
}(Phaser.GameObjects.Sprite);

/***/ }),

/***/ 1082:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Menu = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Level = __webpack_require__(434);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Menu = exports.Menu = function (_Phaser$Scene) {
  _inherits(Menu, _Phaser$Scene);

  function Menu() {
    _classCallCheck(this, Menu);

    return _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, { key: 'menu' }));
  }

  _createClass(Menu, [{
    key: 'preload',
    value: function preload() {
      this.load.image('bg', 'assets/bg.png');
    }
  }, {
    key: 'create',
    value: function create() {
      var _this2 = this;

      var sprite = this.add.sprite(300, 300, 'bg');
      sprite.setScale(4);
      this.gamepad = null;
      this.input.gamepad.once('down', function (pad, button, index) {
        _this2.initControlsGamepad(pad, button, index);
      });
      if (this.input.gamepad.gamepads.length != 0) this.gamepad = this.input.gamepad.gamepads[0];
    }
  }, {
    key: 'initControlsGamepad',
    value: function initControlsGamepad(gamepad, button, index) {
      this.gamepad = gamepad;
    }
  }, {
    key: 'update',
    value: function update() {
      var _this3 = this;

      if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE).isDown || this.gamepad && this.gamepad.A) {
        this.cameras.main.fadeOut(100, 0, 0, 0, function (camera, progress) {
          if (progress === 1) {
            _this3.scene.start("level", { level: "tutorial" });
          }
        });
      }
    }
  }]);

  return Menu;
}(Phaser.Scene);

/***/ }),

/***/ 434:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Level = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Player = __webpack_require__(1077);

var _Block = __webpack_require__(435);

var _BlockIce = __webpack_require__(1078);

var _Door = __webpack_require__(1079);

var _Exit = __webpack_require__(1080);

var _Button = __webpack_require__(1081);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Level = exports.Level = function (_Phaser$Scene) {
  _inherits(Level, _Phaser$Scene);

  function Level() {
    _classCallCheck(this, Level);

    return _possibleConstructorReturn(this, (Level.__proto__ || Object.getPrototypeOf(Level)).call(this, { key: "level" }));
  }

  _createClass(Level, [{
    key: 'init',
    value: function init(data) {
      this.level = data.level;
    }
  }, {
    key: 'preload',
    value: function preload() {
      this.load.image('cokecan', 'assets/cokecan.png');
      this.load.tilemapTiledJSON(this.level, 'assets/levels/' + this.level + '.json');
      this.load.image('tiles', 'assets/sprite@2x.png');
      this.load.spritesheet('player', 'assets/sprite@2x.png', { frameWidth: 32, frameHeight: 32 });
      this.load.audio('door', ['assets/sounds/door.ogg']);
      this.load.audio('door2', ['assets/sounds/door2.ogg']);
      this.load.audio('victory', ['assets/sounds/victory.ogg']);
      this.load.audio('footstep00', ['assets/sounds/footstep00.ogg']);
      this.load.audio('footstep01', ['assets/sounds/footstep01.ogg']);
      this.load.audio('footstep02', ['assets/sounds/footstep02.ogg']);
      this.load.audio('whoosh00', ['assets/sounds/whoosh.mp3']);
      this.load.audio('whoosh01', ['assets/sounds/whoosh2.mp3']);
    }
  }, {
    key: 'create',
    value: function create() {
      var _this2 = this;

      this.gamepad = null;
      if (this.input.gamepad.gamepads.length != 0) this.gamepad = this.input.gamepad.gamepads[0];
      this.map = this.make.tilemap({ key: this.level });
      var tiles = this.map.addTilesetImage('sprite@2x', 'tiles');
      var layerBackground = this.map.createStaticLayer(0, tiles, 0, 0);
      this.nextLevel = this.map.layers[0].properties.nextLevel;
      var layerRoof = this.map.createStaticLayer(4, tiles, 0, 0);
      layerRoof.depth = 99999;
      // var layerBlocks = this.map.createStaticLayer(3, tiles, 0, 0)
      this.blocks = [];
      this.doors = [];
      this.buttons = [];
      this.winTime = 0;
      this.restarting = false;
      this.exit = null;
      if (!this.anims.anims.entries.right) this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        frameRate: 15,
        repeat: 1
      });
      if (!this.anims.anims.entries.left) this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player', { start: 10, end: 13 }),
        frameRate: 15,
        repeat: 1
      });
      if (!this.anims.anims.entries.down) this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player', { start: 20, end: 23 }),
        frameRate: 15,
        repeat: 1
      });
      if (!this.anims.anims.entries.up) this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player', { start: 30, end: 33 }),
        frameRate: 15,
        repeat: 1
      });
      if (!this.anims.anims.entries.win) this.anims.create({
        key: 'win',
        frames: this.anims.generateFrameNumbers('player', { start: 37, end: 39 }),
        frameRate: 10,
        repeat: 3
      });
      this.sounds = { // + Math.floor(Math.random()*3)
        "footstep00": this.sound.add('footstep00'),
        "footstep01": this.sound.add('footstep01'),
        "footstep02": this.sound.add('footstep02'),
        "victory": this.sound.add('victory'),
        "door": this.sound.add('door'),
        "door2": this.sound.add('door2'),
        "whoosh00": this.sound.add('whoosh00'),
        "whoosh01": this.sound.add('whoosh01')
      };
      this.initPlayer();
      this.initBlocks();
      this.initControls();
      this.input.gamepad.once('down', function (pad, button, index) {
        _this2.initControlsGamepad(pad, button, index);
      });
    }
  }, {
    key: 'initPlayer',
    value: function initPlayer() {
      var _this3 = this;

      var playerLayer = this.map.layers.filter(function (layer) {
        return layer.name === "player";
      })[0].data;
      for (var i = 0; i < playerLayer.length; i++) {
        for (var j = 0; j < playerLayer[i].length; j++) {
          if (playerLayer[i][j].index !== -1) {
            this.player = this.add.existing(new _Player.Player(this, j, i));
          }
        }
      }
      this.cameras.main.startFollow(this.player, false, 1, 1, -16, -16);
      this.cameras.main.setZoom(5);
      this.cameras.main.fadeIn(1000, 0, 0, 0, function (camera, progress) {
        if (progress > .75) {
          _this3.cameras.main.zoomTo(1.5, 1000, 'Quint.easeOut');
        }
      });
    }
  }, {
    key: 'initBlocks',
    value: function initBlocks() {
      var playerLayer = this.map.layers.filter(function (layer) {
        return layer.name === "blocks";
      })[0].data;
      for (var i = 0; i < playerLayer.length; i++) {
        for (var j = 0; j < playerLayer[i].length; j++) {
          if (playerLayer[i][j].index !== -1) {

            if (playerLayer[i][j].index === 94) {
              this.exit = this.add.existing(new _Exit.Exit(this, j, i, true));
            } else if (playerLayer[i][j].index === 95) {
              this.exit = this.add.existing(new _Exit.Exit(this, j, i, false));
            } else if (playerLayer[i][j].index === 41) {
              this.blocks.push(this.add.existing(new _Block.Block(this, j, i)));
            } else if (playerLayer[i][j].index === 51) {
              this.blocks.push(this.add.existing(new _BlockIce.BlockIce(this, j, i)));
            } else if (playerLayer[i][j].index === 61) {
              this.doors.push(this.add.existing(new _Door.Door(this, j, i, 'brown')));
            } else if (playerLayer[i][j].index === 66) {
              this.doors.push(this.add.existing(new _Door.Door(this, j, i, 'blue')));
            } else if (playerLayer[i][j].index === 65) {
              this.buttons.push(this.add.existing(new _Button.Button(this, j, i, 'brown')));
            } else if (playerLayer[i][j].index === 70) {
              this.buttons.push(this.add.existing(new _Button.Button(this, j, i, 'blue')));
            }
          }
        }
      }
    }
  }, {
    key: 'initControls',
    value: function initControls() {
      this.keys = {
        left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
        right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
        up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
        down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
        restart: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R),
        space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
      };
    }
  }, {
    key: 'initControlsGamepad',
    value: function initControlsGamepad(gamepad, button, index) {
      this.gamepad = gamepad;
    }
  }, {
    key: 'restart',
    value: function restart() {
      var _this4 = this;

      this.cameras.main.fadeOut(500, 0, 0, 0, function (camera, progress) {
        if (progress === 1) {
          _this4.scene.restart();
        }
      });
    }
  }, {
    key: 'canMoveCollider',
    value: function canMoveCollider(entity, direction) {
      if (entity.name === "player" && entity.moving) return false;
      var nextX = 0;
      var nextY = 0;
      if (direction === "left") {
        nextX--;
      } else if (direction === "right") {
        nextX++;
      } else if (direction === "down") {
        nextY++;
      } else if (direction === "up") {
        nextY--;
      }
      return this.map.layers.filter(function (layer) {
        return layer.name === "colliders";
      })[0].data[entity.map.y + nextY][entity.map.x + nextX].index === -1;
    }
  }, {
    key: 'canMoveBlocks',
    value: function canMoveBlocks(entity, direction) {
      if (entity.name === "player" && entity.moving) return false;
      var nextX = 0;
      var nextY = 0;
      if (direction === "left") {
        nextX--;
      } else if (direction === "right") {
        nextX++;
      } else if (direction === "down") {
        nextY++;
      } else if (direction === "up") {
        nextY--;
      }
      return this.getBlockAt(entity.map.x + nextX, entity.map.y + nextY) === null;
    }
  }, {
    key: 'getNeighboorBlocks',
    value: function getNeighboorBlocks(entity, direction) {
      var nextX = 0;
      var nextY = 0;
      if (direction === "left") {
        nextX--;
      } else if (direction === "right") {
        nextX++;
      } else if (direction === "down") {
        nextY++;
      } else if (direction === "up") {
        nextY--;
      }
      return this.getBlockAt(entity.map.x + nextX, entity.map.y + nextY);
    }
  }, {
    key: 'getBlockAt',
    value: function getBlockAt(mapX, mapY) {
      var returnblock = null;
      this.blocks.forEach(function (block) {
        if (block.map.x === mapX && block.map.y === mapY) {
          returnblock = block;
        }
      });
      this.doors.forEach(function (door) {
        if (door.map.x === mapX && door.map.y === mapY && !door.open) {
          returnblock = door;
        }
      });
      return returnblock;
    }
  }, {
    key: 'canMove',
    value: function canMove(entity, direction) {
      return this.canMoveCollider(entity, direction) && this.canMoveBlocks(entity, direction);
    }
  }, {
    key: 'getOppositeDirection',
    value: function getOppositeDirection(direction) {
      if (direction === "left") {
        return "right";
      } else if (direction === "right") {
        return "left";
      } else if (direction === "down") {
        return "up";
      } else if (direction === "up") {
        return "down";
      }
    }
  }, {
    key: 'checkCollision',
    value: function checkCollision(entityA, entityB) {
      return entityA.map.x === entityB.map.x && entityA.map.y === entityB.map.y;
    }
  }, {
    key: 'update',
    value: function update() {
      var _this5 = this;

      if ((this.keys.restart.isDown || this.gamepad && this.gamepad.Y) && !this.restarting) {
        this.restarting = true;
        this.restart();
      }
      var direction = null;
      if (this.keys.left.isDown || this.gamepad && (this.gamepad.left || this.gamepad.axes[0].getValue() < -0.5)) {
        direction = 'left';
      } else if (this.keys.right.isDown || this.gamepad && (this.gamepad.right || this.gamepad.axes[0].getValue() > 0.5)) {
        direction = 'right';
      } else if (this.keys.up.isDown || this.gamepad && (this.gamepad.up || this.gamepad.axes[1].getValue() < -0.5)) {
        direction = 'up';
      } else if (this.keys.down.isDown || this.gamepad && (this.gamepad.down || this.gamepad.axes[1].getValue() > 0.5)) {
        direction = 'down';
      }
      if (direction !== null) {
        if (this.player.catching) {
          var neighboor = this.getNeighboorBlocks(this.player, this.player.getDirection());
          if (neighboor.name === "blockice" && this.player.getDirection() === direction) {
            this.player.release();
            neighboor.slide(direction);
          } else if (neighboor.name === "block") {
            if ((this.canMove(this.player, direction) || this.player.getDirection() === direction) && this.canMoveCollider(this.player.catched, direction) && this.canMoveBlocks(this.player.catched, direction) && (this.player.getDirection() === direction || this.player.getDirection() === this.getOppositeDirection(direction))) {
              if (!this.player.moving) {
                this.sounds['footstep0' + Math.floor(Math.random() * 3)].play('', { volume: 0.2 });
                this.sounds['whoosh0' + Math.floor(Math.random() * 2)].play('', { volume: 0.2 });
              }
              this.player.catched.move(direction, true);
              this.player.move(direction, true);
            }
          }
        } else {
          if (!this.player.moving && this.canMove(this.player, direction)) {
            var sound = this.sounds['footstep0' + Math.floor(Math.random() * 3)].play({ volume: 0.2 });
          }
          this.player.move(direction, this.canMove(this.player, direction));
        }
      }
      if ((this.keys.space.isDown || this.gamepad && this.gamepad.A) && this.getNeighboorBlocks(this.player, this.player.getDirection()) !== null && this.getNeighboorBlocks(this.player, this.player.getDirection()).catchable) {
        this.player.catch(this.getNeighboorBlocks(this.player, this.player.getDirection()));
      } else {
        this.player.release();
      }
      this.blocks.forEach(function (block) {
        block.update();
        if (block.sliding !== null && _this5.canMoveCollider(block, block.sliding) && _this5.canMoveBlocks(block, block.sliding)) {
          block.move(block.sliding, true);
          _this5.sounds['whoosh0' + Math.floor(Math.random() * 2)].play({ volume: 0.2 });
        } else {
          block.sliding = null;
          block.catchable = true;
        }
      });
      this.player.update();
      this.exit.update();

      //Buttons/doors
      this.doors.forEach(function (door) {
        var open = true;
        var forceClosed = false;
        _this5.buttons.forEach(function (button) {
          if (door.color === button.color) {
            if (!_this5.checkCollision(_this5.player, button)) {
              var on = false;
              _this5.blocks.forEach(function (block) {
                if (button.color === block.color) {
                  if (_this5.checkCollision(block, button)) {
                    on = true;
                  }
                }
              });
              if (!on) open = false;
            }
          }
        });
        if (door.open !== open) {
          if (open) _this5.sounds['door'].play({ volume: 0.2 });else _this5.sounds['door2'].play({ volume: 0.2 });
        }
        door.setOpen(open);
      });
      this.doors.forEach(function (door) {
        return door.update();
      });
      if (this.checkCollision(this.player, this.exit) && !this.player.willWinning) {
        this.player.willWinning = true;
        this.sounds['victory'].play({ repeat: 3 });
        this.cameras.main.zoomTo(5, 2000, 'Quint.easeOut');
      }
      if (this.player.isWinning) {
        if (this.winTime === 100) {
          this.winTime++;
          this.cameras.main.fadeOut(2000, 0, 0, 0, function (camera, progress) {
            if (progress === 1) {
              if (_this5.nextLevel === "final") _this5.scene.start("menu");else _this5.scene.start("level", { level: _this5.nextLevel });
            }
          });
        } else this.winTime++;
      }
    }
  }]);

  return Level;
}(Phaser.Scene);

/***/ }),

/***/ 435:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Block = exports.Block = function (_Phaser$GameObjects$S) {
  _inherits(Block, _Phaser$GameObjects$S);

  function Block(scene, mapX, mapY) {
    _classCallCheck(this, Block);

    var _this = _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this, scene, mapX * 32, mapY * 32));

    _this.name = "block";
    _this.setTexture('player');
    _this.setOrigin(0, 0);
    _this.setFrame(40);
    _this.setPosition(mapX * 32, mapY * 32);
    _this.color = "brown";
    _this.catchable = true;
    _this.sliding = null;
    _this.depth = 500;
    _this.map = {
      x: mapX,
      y: mapY
    };
    _this.nextPosition = {
      x: mapX * 32,
      y: mapY * 32
    };
    _this.moving = false;
    return _this;
  }

  _createClass(Block, [{
    key: "move",
    value: function move(direction) {
      console.log(direction);
      if (this.moving) return;
      this.moving = true;
      if (direction === "left") {
        this.nextPosition.x -= 32;
        this.map.x--;
      } else if (direction === "right") {
        this.nextPosition.x += 32;
        this.map.x++;
      } else if (direction === "down") {
        this.nextPosition.y += 32;
        this.map.y++;
      } else if (direction === "up") {
        this.nextPosition.y -= 32;
        this.map.y--;
      }
    }
  }, {
    key: "update",
    value: function update() {
      if (this.nextPosition.x !== this.x) {
        if (this.nextPosition.x > this.x) this.x += 2;else this.x -= 2;
      } else if (this.nextPosition.y !== this.y) {
        if (this.nextPosition.y > this.y) this.y += 2;else this.y -= 2;
      } else {
        this.moving = false;
      }
    }
  }]);

  return Block;
}(Phaser.GameObjects.Sprite);

/***/ }),

/***/ 436:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(210);

var _Level = __webpack_require__(434);

var _Menu = __webpack_require__(1082);

var gameConfig = {
    width: 600,
    height: 600,
    input: {
        gamepad: true
    },
    pixelArt: true,
    audio: {
        disableWebAudio: true
    }
};

var game = new Phaser.Game(gameConfig);
game.scene.add('menu', _Menu.Menu);
game.scene.add('level', _Level.Level);
// game.scene.start('menu')
game.scene.start("menu", { level: "menu" });

/***/ })

},[436]);