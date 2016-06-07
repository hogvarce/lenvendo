window.App = ( function( App, $ ) {

    var _clickCounter = 0,
        _clickDelay = 200,
        _clickTimer;

    App.BlockImportantView = App.BlockView.extend( {

        className: 'block list-group-item important complex',

        events: _.extend(
            App.BlockView.prototype.events,
            {
                'dblclick': 'toggleStatus'
            }
        ),

        select: function() {
            var self = this;

            // нужно для разделения двойного и одинарного нажатия
            if( ++_clickCounter === 1 ) {
                _clickTimer = setTimeout( function() {
                    _clickCounter = 0;
                    App.BlockImportantView.__super__.select.call( self );
                }, _clickDelay );
            } else {
                clearInterval( _clickTimer );
                _clickCounter = 0;
            }
        },

        toggleStatus: function() {
            this.model.set( 'status', this.getNewStatus() ); //меням статус модели
            this.$el.toggleClass( 'complex', this.model.get( 'status' ) === 'complex' )
                .toggleClass( 'simple', this.model.get( 'status' ) === 'simple' );
            window.EventBus.trigger( 'onRemoveBlock' );//обновляем число выделенных красных и зеленых
        },

        remove: function( event ) {
            var isConfirmed = confirm( 'Вы точно хотите удалить этот блок?' );

            if( isConfirmed ) {
                App.BlockImportantView.__super__.remove.call( this );
            } else {
                return false;
            }
        },

        getNewStatus: function( status ) {
            return this.model.get( 'status' ) === 'complex' ? 'simple' : 'complex';
        }

    } );

    return App;

} )( window.App || {}, jQuery );
