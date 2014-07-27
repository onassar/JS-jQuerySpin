/**
 * jQuery Spin
 * 
 * Overlays desired DOM element(s) with a spinner, fading out the background.
 * Nothing required other than the script.
 * 
 * @author Oliver Nassar <onassar@gmail.com>
 */

// preload spinner
(new Image()).src = '//i.imgur.com/uM2gq.gif';

// let's do this
(function($){
    $.fn.isSpinning = function() {
        return $(this).find('.js-spin-spinner').length > 0;
    };
    $.fn.spin = function(overlayStyleOptions, spinnerStyleOptions) {
        var styles = {
            overlay: {
                position: 'absolute',
                opacity: '0.5',
                zIndex: '10000',
                backgroundColor: '#000'
            },
            spinner: {
                position: 'absolute',
                width: '40px',
                padding: '10px',
                backgroundSize: '20px',
                backgroundColor: '#fff',
                backgroundImage: 'url(//i.imgur.com/uM2gq.gif)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center',
                height: '40px',
                zIndex: '10001',
                borderRadius: '6px',
                // boxShadow: '0 0px 6px #666'
                boxShadow: '0 2px 10px #444'
            }
        };
        this.each(function() {

            // treat window object differently
            var $this = $(this);
            if (this === window) {
                $this = $('html').first();
                styles.spinner.position = 'fixed';
                styles.spinner.width = '60px';
                styles.spinner.height = '60px';
                styles.spinner.backgroundSize = 'auto';
            }

            // options
            var overlayStyles = $.extend(
                    styles.overlay, overlayStyleOptions || {}
                ),
                spinnerStyles = $.extend(
                    styles.spinner, spinnerStyleOptions || {}
                );

            // tracking
            var spinning = $this.data('spinning') === true;
            if (spinning === true) {
                $this.data('spinning', false);
                $this.data('overlay').remove();
                $this.data('spinner').remove();
            } else {

                // tracking
                $this.data('spinning', true);

                // overlay node
                var overlay = $('<div />');
                overlay.addClass('js-spin-overlay');
                $this.data('overlay', overlay);

                // spinner node (note call here as well as below to spinner.css)
                var spinner = $('<div />');
                spinner.addClass('js-spin-spinner');
                $this.data('spinner', spinner);
                spinner.css(spinnerStyles);

                // dom
                $this.append(overlay, spinner);

                // determine position (changes depending on parent position)
                var left = $this.offset().left,
                    top = $this.offset().top,
                    width = $this.innerWidth(),
                    height = $this.innerHeight();
                if (
                    $this.css('position') === 'relative'
                    || $this.css('position') === 'absolute'
                ) {
                    left = 0;
                    top = 0;
                }

                // overlay styles
                overlayStyles.left = left + 'px';
                overlayStyles.top = top + 'px';
                overlayStyles.width = width + 'px';
                overlayStyles.height = height + 'px';
                overlay.css(overlayStyles);

                // spinner styles
                spinnerStyles.left = (
                    parseInt($this.innerWidth()) -
                    parseInt(spinner.innerWidth())
                ) / 2;
                if (
                    $this.css('position') !== 'relative'
                    && $this.css('position') !== 'absolute'
                ) {
                    spinnerStyles.left += $this.offset().left;
                }

                // if it's the window, don't use 'html' innerHeight
                if (this === window) {
                    spinnerStyles.top = (
                        parseInt($(window).innerHeight()) -
                        parseInt(spinner.innerHeight())
                    ) / 2;
                } else {
                    spinnerStyles.top = (
                        parseInt($this.innerHeight()) -
                        parseInt(spinner.innerHeight())
                    ) / 2;
                }

                // this won't matter for the case when this === window
                if (
                    $this.css('position') !== 'relative'
                    && $this.css('position') !== 'absolute'
                ) {
                    spinnerStyles.top += $this.offset().top;
                }
                spinner.css(spinnerStyles);
            }
        });
    };
})(jQuery);
