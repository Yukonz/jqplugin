$.widget('plg.colorize', {

    options: {
        color: ['red'],
        delay: 1000
    },

    _create: function() {
        this.initialColor = this.element.css('color');
        this.inCycle = false;
    },

    setColor: function(options) {
        var self = this,
            colorsCount = options.colors.length,
            i = 0;

        this.delay = options.delay;
        this.options = options;

        if(!(Array.isArray(options.colors))){
            setTimeout(function(){
                self.element.css('color', options.colors);
            }, options.delay)
        } else {
            this.colorCycle = setInterval(function(){
                self.element.css('color', options.colors[i]);
                i++;
                if (i === colorsCount) {
                    if (self.inCycle === false){
                        clearInterval(self.colorCycle);
                    } else i=0;
                }
            }, self.delay);
        }
    },

    setColorInCycle: function(options) {
        this.inCycle = true;
        this.setColor(options);
    },

    cycleColor: function() {
        this.inCycle = true;
        this.setColor(this.options);
    },

    removeColor: function() {
        this.stopCycle();
        this.element.css('color', this.initialColor);
    },

    stopCycle: function() {
        this.inCycle = false;
        clearInterval(this.colorCycle);
    },

    resetColorCycle: function(options) {
        this.stopCycle();
        if (options.delay === undefined) options.delay = this.delay;
        this.setColorInCycle(options);
    },

    resetColor: function(options) {
        this.stopCycle();
        if (options.delay === undefined) options.delay = this.delay;
        this.setColor(options);
    }
});