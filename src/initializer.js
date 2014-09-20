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