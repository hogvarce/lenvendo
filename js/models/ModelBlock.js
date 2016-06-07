window.App = ( function( App, $ ) {

    App.Block = Backbone.Model.extend( {

        defaults: {
            content: {
                'headline': 'Заголовок по умолчанию',
                'body': 'Текст блока по умолчанию'
            },
            isSelected: false
        }

    } );

    return App;

} )( window.App || {}, jQuery );
