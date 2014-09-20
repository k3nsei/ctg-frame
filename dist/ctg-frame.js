(function (Ember) {
'use strict';

var CtgFrameController = Ember.ObjectController.extend({});
var ctgFrameComponent = Ember.Component.extend({
    tagName: 'div',
    captionTop: '',
    captionBottom: '',
    img: '',
    didInsertElement: function() {
        var self = this;
        var imageObj = new Image();
        if(this.get('img')) {
            imageObj.onload = function() {
                var stage = new Kinetic.Stage({
                    container: self.get('element').id,
                    width: imageObj.width + 48,
                    height: imageObj.height + 48
                });

                var layer = new Kinetic.Layer();

                var baseImg = new Kinetic.Image({
                    x: 22,
                    y: 22,
                    image: imageObj
                });

                var captionTop = new Kinetic.Text({
                    width: stage.getWidth() - 20,
                    x: 10,
                    y: stage.getHeight() - 12,
                    text: self.get('captionTop') || '',
                    fontSize: 28,
                    fontFamily: 'Ubuntu',
                    fontWeight: 'bold',
                    fill: '#8560a8',
                    align: 'center',
                    wrap: 'word'
                });

                var captionBottom = new Kinetic.Text({
                    width: stage.getWidth() - 20,
                    x: 10,
                    y: captionTop.getPosition().y + captionTop.getHeight() + 8,
                    text: self.get('captionBottom') || '',
                    fontSize: 22,
                    fontFamily: 'Ubuntu',
                    fill: '#FFFFFF',
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
    }.observes('captionTop', 'captionBottom')
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