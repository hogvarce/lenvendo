window.App = ( function( App, $ ) {

    App.BlockView = Backbone.View.extend( {

        className: 'block list-group-item',

        tagName: 'li',

        events: {
            'click': 'select',
            'click .delete': 'remove'
        },

        initialize: function() {
            this.template = _.template( $( '#block-template' ).html() );
            this.render();
        },

        render: function() {
            var model = this.model.toJSON(),
                view = this.template( model );

            return this.$el.html( view );
        },

        select: function() {
            this.model.set( 'isSelected', !this.model.get( 'isSelected' ) );
            window.EventBus.trigger( 'onSelectBlock' );
            this.$el.toggleClass( 'selected' );
        },

        remove: function() {
            this.model.destroy();
            window.EventBus.trigger( 'onRemoveBlock' );
            App.BlockView.__super__.remove.call( this );
        }

    } );

    return App;

} )( window.App || {}, jQuery );
