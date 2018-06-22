(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define([ 'jquery' ], factory);
    } else {
        factory(jQuery);
    }
}(function($) {

    var defaults = {
        fps: 2,
    };

    function titleAnimate(options) {
        this.options = $.extend({},defaults,options);   
        this.title = document.title + ' | ';
        this.fps = this.options.fps;
        this.interval = 1000/this.fps;
        this.then;

        this.startAnimating();
    }

    titleAnimate.prototype = {
        startAnimating: function() {
            this.then = Date.now();

            this.animate();

        },
        animate: function() {
            requestAnimationFrame(this.animate.bind(this));
            
            var now = Date.now();
            var elapsed = now - this.then;

            // Meets requirements and we proceed with the frame
            if(elapsed > this.interval) {
                this.then = now - (elapsed % this.interval);
                this.draw();
            }
        },
        draw: function() {
            var firstChar = this.title[0];
            this.title += firstChar;
            this.title = this.title.substring(1);
            document.title = this.title;
        },
    };

    $.extend({
        titleAnimate: function(options) {
            return new titleAnimate(options);
        },
    });
}));
