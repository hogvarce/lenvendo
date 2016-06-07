window.App = ( function( App, $ ) {

    App.Blocks = Backbone.Collection.extend( {

        models: [ App.Block, App.BlockImportant ]

    } );

    return App;

} )( window.App || {}, jQuery );


