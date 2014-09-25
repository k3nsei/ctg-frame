(function() {
  var Canvas, CtgFrame, Image, cf, fs;

  fs = require('fs');

  Canvas = require('canvas');

  Image = Canvas.Image;

  require('node-easel');

  CtgFrame = (function() {
    function CtgFrame(imgSrc, captionTop, captionBottom) {
      this.captionTop = captionTop || ' ';
      this.captionBottom = captionBottom || ' ';
      this.resources = {
        imgSrc: imgSrc
      };
      this.canvas = new Canvas(1, 1);
      this.loadResources();
    }

    CtgFrame.prototype.loadResources = function() {
      return this.loadImage('imgSrc', (function(_this) {
        return function() {
          return _this.createCanvas();
        };
      })(this));
    };

    CtgFrame.prototype.loadImage = function(name, callback) {
      var img;
      img = new Image();
      fs.readFile(this.resources[name], function(err, blob) {
        if (err) {
          throw err;
        }
        img.src = blob;
      });
      img.onload = (function(_this) {
        return function() {
          _this.resources[name] = img;
          if (typeof callback === "function") {
            return callback();
          }
        };
      })(this);
      img.onerror = function() {
        throw new Error("Image `" + name + "` not loaded");
      };
    };

    CtgFrame.prototype.createCanvas = function() {
      var background, border, captionBottom, captionTop, extraHeight, img, imgHeight, imgScale, imgWidth, stage;
      img = new createjs.Bitmap(this.resources.imgSrc);
      img.x = 22;
      img.y = 22;
      imgScale = img.image.width > 580 ? 580 / img.image.width : 1;
      img.scaleX = imgScale;
      img.scaleY = imgScale;
      extraHeight = 34;
      imgWidth = img.image.width * imgScale;
      imgHeight = img.image.height * imgScale;
      captionTop = new createjs.Text(this.captionTop, "28px 'Bebas Neue'", "#299bcc");
      captionTop.x = (imgWidth / 2) + 22;
      captionTop.y = imgHeight + extraHeight;
      captionTop.lineWidth = imgWidth;
      captionTop.textAlign = 'center';
      extraHeight += captionTop.getBounds().height + 16;
      captionBottom = new createjs.Text(this.captionBottom, "24px 'Bebas Neue'", "#ffffff");
      captionBottom.x = (imgWidth / 2) + 22;
      captionBottom.y = imgHeight + extraHeight;
      captionBottom.lineWidth = imgWidth;
      captionBottom.textAlign = 'center';
      extraHeight += captionBottom.getBounds().height + 20;
      this.canvas.width = imgWidth + 44;
      this.canvas.height = imgHeight + extraHeight;
      background = new createjs.Shape();
      background.graphics.beginFill("#000000").drawRect(0, 0, this.canvas.width, this.canvas.height);
      border = new createjs.Shape();
      border.graphics.beginFill("#ffffff").drawRect(20, 20, imgWidth + 4, imgHeight + 4);
      stage = new createjs.Stage(this.canvas);
      stage.addChild(background);
      stage.addChild(border);
      stage.addChild(img);
      stage.addChild(captionTop);
      stage.addChild(captionBottom);
      stage.update();
      return this.saveCanvas();
    };

    CtgFrame.prototype.saveCanvas = function() {
      return fs.writeFile(__dirname + '/../../test/server_side_output.png', this.canvas.toBuffer(), function() {
        createjs.Ticker.halt();
        return true;
      });
    };

    return CtgFrame;

  })();

  cf = new CtgFrame(__dirname + '/../../test/cute-funny-teddy-bear.jpg', 'Some text', 'LOL');

}).call(this);
