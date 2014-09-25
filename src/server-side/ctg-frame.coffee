fs = require 'fs'
Canvas = require 'canvas'
Image = Canvas.Image

require 'node-easel'

class CtgFrame
  constructor: (imgSrc, captionTop, captionBottom) ->
    @captionTop = captionTop || ' '
    @captionBottom = captionBottom || ' '
    @resources =
      imgSrc: imgSrc
    @canvas = new Canvas 1, 1

    @loadResources()

  loadResources: ->
    @loadImage 'imgSrc', () =>
      @createCanvas()

  loadImage: (name, callback) ->
    img = new Image()
    fs.readFile @resources[name], (err, blob) ->
      if err
        throw err
      img.src = blob
      return
    img.onload = () =>
      @resources[name] = img
      if typeof callback == "function"
        callback()
    img.onerror = () ->
      throw new Error "Image `#{name}` not loaded"
    return

  createCanvas: () ->
    img = new createjs.Bitmap @resources.imgSrc
    img.x = 22
    img.y = 22
    imgScale = if (img.image.width > 580) then (580 / img.image.width) else 1
    img.scaleX = imgScale
    img.scaleY = imgScale

    extraHeight = 34
    imgWidth = (img.image.width * imgScale)
    imgHeight = (img.image.height * imgScale)

    captionTop = new createjs.Text @captionTop, "28px 'Bebas Neue'", "#299bcc"
    captionTop.x = (imgWidth / 2) + 22
    captionTop.y = imgHeight + extraHeight
    captionTop.lineWidth = imgWidth
    captionTop.textAlign = 'center'
    extraHeight += captionTop.getBounds().height + 16

    captionBottom = new createjs.Text @captionBottom, "24px 'Bebas Neue'", "#ffffff"
    captionBottom.x = (imgWidth / 2) + 22
    captionBottom.y = imgHeight + extraHeight
    captionBottom.lineWidth = imgWidth
    captionBottom.textAlign = 'center'
    extraHeight += captionBottom.getBounds().height + 20

    @canvas.width = imgWidth + 44
    @canvas.height = imgHeight + extraHeight

    background = new createjs.Shape()
    background.graphics.beginFill("#000000").drawRect(0, 0, @canvas.width, @canvas.height)

    border = new createjs.Shape()
    border
    .graphics
    .beginFill("#ffffff")
    .drawRect(20, 20, imgWidth + 4, imgHeight + 4)

    stage = new createjs.Stage @canvas
    stage.addChild background
    stage.addChild border
    stage.addChild img
    stage.addChild captionTop
    stage.addChild captionBottom
    stage.update()
    @saveCanvas()

  saveCanvas: () ->
    fs.writeFile __dirname + '/../../test/server_side_output.png', @canvas.toBuffer(), () ->
      createjs.Ticker.halt()
      return true

cf = new CtgFrame __dirname + '/../../test/cute-funny-teddy-bear.jpg', 'Some text', 'LOL'
