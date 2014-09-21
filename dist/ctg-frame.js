(function (Ember) {
'use strict';

var CtgFrameController = Ember.ObjectController.extend({});
var ctgFrameComponent = Ember.Component.extend({
    tagName: 'div',
    captionTop: '',
    captionTopSize: 28,
    captionTopColor: '#299bcc',
    captionBottom: '',
    captionBottomSize: 22,
    captionBottomColor: '#FFFFFF',
    imgMaxWidth: 536,
    img: '',
    didInsertElement: function() {
        var self = this;
        var imageObj = new Image();
        if(this.get('img')) {
            imageObj.onload = function() {
                var scale = (imageObj.width > self.get('imgMaxWidth')) ? (self.get('imgMaxWidth') / imageObj.width) : 1;
                var stage = new Kinetic.Stage({
                    container: self.get('element').id,
                    width: (imageObj.width * scale) + 44,
                    height: (imageObj.height * scale) + 44
                });

                var layer = new Kinetic.Layer();

                var baseImg = new Kinetic.Image({
                    x: 22,
                    y: 22,
                    width: imageObj.width,
                    height: imageObj.height,
                    scaleX: scale,
                    scaleY: scale,
                    stroke: '#eee',
                    strokeWidth: 4,
                    strokeScaleEnabled: false,
                    image: imageObj
                });

                var captionTop = new Kinetic.Text({
                    width: stage.getWidth() - 20,
                    x: 10,
                    y: stage.getHeight() - 12,
                    text: self.get('captionTop') || '',
                    fontFamily: 'bebas_neueregular, Ubuntu',
                    fontSize: self.get('captionTopSize'),
                    fill: self.get('captionTopColor'),
                    align: 'center',
                    wrap: 'word'
                });

                var captionBottom = new Kinetic.Text({
                    width: stage.getWidth() - 20,
                    x: 10,
                    y: captionTop.getPosition().y + captionTop.getHeight() + 8,
                    text: self.get('captionBottom') || '',
                    fontFamily: 'bebas_neueregular, Ubuntu',
                    fontSize: self.get('captionBottomSize'),
                    fill: self.get('captionBottomColor'),
                    align: 'center',
                    wrap: 'word'
                });

                stage.setHeight((captionTop.getPosition().y + captionTop.getHeight() + 8) + (captionBottom.getHeight() + 16));

                var background = new Kinetic.Rect({
                    x: 0,
                    y: 0,
                    width: stage.getWidth(),
                    height: stage.getHeight(),
                    fill: '#000000'
                });

                layer.add(background);
                layer.add(baseImg);
                layer.add(captionTop);
                layer.add(captionBottom);
                stage.add(layer);
            };
            imageObj.src = this.get('img');
        }
    }.observes('captionTop', 'captionTopSize', 'captionTopColor', 'captionBottom', 'captionBottomSize', 'captionBottomColor', 'imgMaxWidth')
});

/* global ctgFrameComponent */
'use strict';

Ember.Application.initializer({
    name: 'ctg-frame',

    initialize: function(container, application) {
        container.register('component:ctg-frame', ctgFrameComponent);
        container.register('controller:ctgFrame', CtgFrameController);
        application.inject('component:ctg-frame', 'ctgFrame', 'controller:ctgFrame');
    }
});
}(window.Ember));