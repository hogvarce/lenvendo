window.App = ( function( App, $ ) {

    App.BlocksView = Backbone.View.extend( {

        collection: new App.Blocks(),

        events: {
            'click #add': 'add'
        },

        initialize: function() {
            this.template = _.template( $( '#blocks-template').html() );
            this.listenTo( window.EventBus, 'onSelectBlock onRemoveBlock doubleClick', this.updateCounters );
            this.render();
        },

        render: function() {
            this.$el.html( this.template );
        },

        add: function() {
            this.addBlock();
            this.updateCounters();
        },

        addBlock: function() {
            var random = Math.random() >= 0.5,
                model = random ? new App.Block() : new App.BlockImportant(),
                view = random ? new App.BlockView( { model: model } ) : new App.BlockImportantView( { model: model } );

            model.set( {
                'content': {
                    'headline': 'Заголовок',
                    'body': this.getRandomText( 500 )
                }
            } );
            this.collection.add( model );
            this.$( '#content' ).prepend( view.render() );
        },

        updateCounters: function() {
            var blocksCount = this.collection.length,
                blocksSelectedCount = 0,
                blocksSelectedcomplex = 0,
                blocksSelectedsimple = 0;

            this.collection.forEach( function( Block, index ) {
                if( Block.get( 'isSelected' ) ) {
                    blocksSelectedCount++;
                    if( Block.get( 'status' ) ) {
                        if( Block.get( 'status' ) === 'complex' )
                            blocksSelectedcomplex++;
                        if( Block.get( 'status' ) === 'simple' )
                            blocksSelectedsimple++;
                    }
                }
            } );

            this.$( '#blocks-count').html( blocksCount );
            this.$( '#blocks-selected-count').html( blocksSelectedCount );
            this.$( '#blocks-selected-complex-count').html( blocksSelectedcomplex );
            this.$( '#blocks-selected-simple-count').html( blocksSelectedsimple );
        },

        getRandomText: function( length ) {
            var result = " ",
                text = "й ц у к е н г ш щ з ф ы в п р о л д я ч с м и т";

            for( var i = 0; i < length; i++ )
                result += text.charAt(Math.floor(Math.random() * text.length));

            return result;
        }

    } );

    return App;

} )( window.App || {}, jQuery );
