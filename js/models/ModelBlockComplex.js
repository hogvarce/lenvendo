window.App = ( function( App, $ ) {

    App.BlockImportant = App.Block.extend({

        defaults: _.extend(
            {
                status: 'complex'
            },
            App.Block.prototype.defaults
        )

    });

    return App;

})( window.App || {}, jQuery );
