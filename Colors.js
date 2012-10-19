"use strict";//Just don't cross the streams!!
/*
 * Requires: 
 *   extras-math.js
 */

function Color(r,g,b){
    this.r = r;
    this.g = g;
    this.b = b;
}

function RGB2HexStr(r,g,b){
    return Math.byte2Hex(r) + Math.byte2Hex(g) + Math.byte2Hex(b);
}

Color.prototype.copy= function( color ){
    if( color instanceof Color ){
        this.r = color.r;
        this.b = color.b;
        this.g = color.g;
        return this;
    }
    return new Color(this.r,this.g,this.b);
}

//------------------------------------------------
// Returns an object that represents a random color
// in rgb format. {r:#,g:#,b:#}
//------------------------------------------------
Color.prototype.rndColor = function(){
    this.r = new Number(Math.floor(Math.rndRange(0, 256)));
    this.g = new Number(Math.floor(Math.rndRange(0, 256)));
    this.b = new Number(Math.floor(Math.rndRange(0, 256)));
    return this;
}

//------------------------------------------------
// Converts the color into a color string.
//
//------------------------------------------------
Color.prototype.toString = function(format, strChar){
    var r = Math.round(this.r),
        g = Math.round(this.g),
        b = Math.round(this.b);
    if( strChar === undefined ) strChar = '&nbsp;&nbsp;&nbsp;&nbsp';

    switch( format ){
    case 'hex':
    case '16':
        return '#' + RGB2HexStr(r,g,b);
    case 'rgb':
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    case 'div':
        return '<div style="background-color:' + this.toString('hex') + '; display:inline;">' + strChar + '</div>';
    case 'font':
        return '<font color="' + this.toString('hex') + '">' + strChar + '</font>';
    case 'json':
    default:
        return '{r:' + r + ', g:' + g + ', b:' + b + '}';
    }
}

Color.prototype.add = function( color ){
    if( ! color instanceof Color ) throw 'Color.add only accepts a Color as an argument';
    var c = new Color();
    c.r = this.r + color.r;
    c.g = this.g + color.g;
    c.b = this.b + color.b;
    return c;
}

Color.prototype.sub = function( color ){
    if( ! color instanceof Color ) throw 'Color.sub only accepts a Color as an argument';
    var c = new Color();
    c.r = this.r - color.r;
    c.g = this.g - color.g;
    c.b = this.b - color.b;
    return c;
}

Color.prototype.subScalor = function( scalor ){
    if( (scalor = parseFloat(scalor)) === NaN ) throw 'Color.sub only accepts numeric values as arguments';
    this.r -= scalor;
    this.g -= scalor;
    this.b -= scalor;
    return this;
}

Color.prototype.addScalor = function( scalor ){
    if( (scalor = parseFloat(scalor)) === NaN ) throw 'Color.add only accepts numeric values as arguments';
    this.r += scalor;
    this.g += scalor;
    this.b += scalor;
    return this;
}

Color.prototype.multScalor = function( scalor ){
    if( (scalor = parseFloat(scalor)) === NaN ) throw 'Color.multScalor only accepts numeric values as arguments';
    this.r *= scalor; 
    this.g *= scalor; 
    this.b *= scalor; 
    return this;
}

Color.prototype.distance = function( color ){
    if( ! color instanceof Color ) throw 'Color.sub only accepts a Color as an argument';
    return Math.sqrt( (color.r-this.r)*(color.r-this.r) + (color.g-this.g)*(color.g-this.g) + (color.b-this.b)*(color.b-this.b) );
}

Color.prototype.dot = function( color ){
    if( ! color instanceof Color ) throw 'Color.sub only accepts a Color as an argument';
    return this.r*color.r + this.g*color.g + this.b*color.b;
}

Color.prototype.magnitude = function( ){
    return Math.sqrt(this.r*this.r + this.g*this.g + this.b*this.b);
}

Color.prototype.unitVector = function( ){
    var u = this.magnitude();

    return new Color(this.r/u, this.g/u, this.b/u);
}

//------------------------------------------------
// Colors class. Contains operations to be done on
// Colors.
//
//------------------------------------------------
function Colors(){
    this.color = new Color();
}

(function(){
    //------------------------------------------------
    // Returns an array of colors that are a gradient.
    //
    // @param: Frequency - integer (optional); r is a constant that controls how 
    //    fast the wave oscillates. Gets the colors to change 
    //    more frequently or more slowly. Changing each freq 
    //    will give you more variaty of colors
    // @param: Increment - integer (optional); is a variable that counts up, typically provided by a loop
    // @param: Amplitude - integer (optional); controls how high (and low) the wave goes
    // @param: Center - integer (optional); controls the center position of the wave. 
    // Example: makeGradient(.3,.3,.3,0,2,4); //produces a rainbow
    //------------------------------------------------
    Colors.prototype.makeGradient = function( frequency1, frequency2, frequency3, phase1, phase2, phase3, center, width, len ) {
        if (len == undefined)      len = 50;//How many colors
        if (center == undefined)   center = 128;//The center of 0 to 255
        if (width == undefined)    width = 127;//Distance to travel or maximum deviation from the center value
        var a = new Array();

        for( var i = 0; i < len; ++i ) {
            var c = new Color();
            c.r = Math.sin(frequency1*i + phase1) * width + center;
            c.g = Math.sin(frequency2*i + phase2) * width + center;
            c.b = Math.sin(frequency3*i + phase3) * width + center;
            a.push(c);
        }
        return a;
    }

    Colors.prototype.makeGradient2 = function( frequency1, frequency2, frequency3, 
                                               phase1, phase2, phase3, len, width1, 
                                               width2, width3, center1, center2, center3 ) {
        if (len == undefined)     len = 50;//How many colors
        if (center1 == undefined) center1 = 128;//The center of 0 to 255
        if (center2 == undefined) center2 = 128;//The center of 0 to 255
        if (center3 == undefined) center3 = 128;//The center of 0 to 255
        if (width1 == undefined)  width1 = 127;//Distance to travel or maximum deviation from the center value
        if (width2 == undefined)  width2 = 127;//Distance to travel or maximum deviation from the center value
        if (width3 == undefined)  width3 = 127;//Distance to travel or maximum deviation from the center value
        var a = new Array();

        for( var i = 0; i < len; ++i ) {
            var c = new Color();
            c.r = Math.sin(frequency1*i + phase1) * width1 + center1;
            c.g = Math.sin(frequency2*i + phase2) * width2 + center2;
            c.b = Math.sin(frequency3*i + phase3) * width3 + center3;
            a.push(c);
        }
        return a;
    }

    //------------------------------------------------
    // Creates a repeating gradient.
    // Let's say you want the color cycle to repeat every 6 steps. 
    // The way I accomplish this is by using a frequency value 
    // which corresponds to 1/6th of 2p. Remember that the 
    // sine wave repeats every 2p, so this will make the 
    // colors repeat every 6 increments. 
    // @param: steps - integer (optional); repeat after number of steps
    // @param: center - integer (optional); a value between 0 and 255 that you want the colors to center around
    // @param: width - integer (optional); how far around the ceter to travel
    // @param: len - integer (optional); How many colors to return 
    //------------------------------------------------
    Colors.prototype.repeatingGradient = function( steps, center, width, len ){
        if( steps  === undefined ) steps = 6;
        var frequency = 2*Math.PI/steps;

        return this.makeGradient(frequency,frequency,frequency,0,2,4, center,width, len);
    }
    
    //------------------------------------------------
    // Creates a non repeating gradient 
    // If you don't want the colors to repeat exactly, 
    // then use frequency values which don't go evenly 
    // into 2p. It turns out that the number 2.4 works 
    // very well for this. 2.4 in radians, is very close 
    // to the golden angle (137.51°), which is the angle 
    // that many plants grow new shoots to maximize the 
    // sunlight received by leaves. Here I'm using essentially 
    // the same technique - I am maximizing the distance 
    // between color repeats (which would be like overlapping 
    // leaves around a stem). 2.4 is a good frequency to use 
    // if you're selecting colors for a pie chart or graph, 
    // and you're not sure how many data values you're going 
    // to need to plot.
    // @param: center - integer (optional); a value between 0 and 255 that you want the colors to center around
    // @param: width - integer (optional); how far around the ceter to travel
    // @param: len - integer (optional); How many colors to return 
    // @return: array; an array of colors.
    //------------------------------------------------
    Colors.prototype.nonRepeatingGradient = function( center, width, len ){
        var frequency = 2.4;
        return this.makeGradient( frequency, frequency, frequency, 0, 2, 4, center, width, len );
    }
    
    //------------------------------------------------
    // Creates a non repeating gradient with more variety.
    // than nonRepeatingGradient().
    // If you combine the above with the trick of using 
    // separate freqencies for each color, and insure 
    // that none of the individual frequencies are 
    // multiples of each other, you can get even more 
    // variety. Here I'm using frequency of 1.666, 2.666, and 4.666.
    // @param: center - integer (optional); a value between 0 and 255 that you want the colors to center around
    // @param: width - integer (optional); how far around the ceter to travel
    // @param: len - integer (optional); How many colors to return 
    // @return: array; an array of colors
    //------------------------------------------------
    Colors.prototype.nonRepeatingGradient2 = function( center, width, len ){
        var redFrequency = 1.666,
            grnFrequency = 2.666,
            bluFrequency = 3.666;
        return this.makeGradient(redFrequency, grnFrequency, bluFrequency, 0, 0, 0, center, width, len );
    }

    //------------------------------------------------
    // Html formats a string to have a color gradient
    // @param: str - string; the string to format
    // @param: phase (optional) - integer; additional phase shift
    //    variable.
    // @return; A html color formatted string. using the 
    //    font tag.
    //------------------------------------------------
    Colors.prototype.colorTextGradient = function( str, phase ){
        if( phase == undefined ) phase = 0;
        var center    = 128,
            width     = 127,
            frequency = Math.PI*2/str.length,
            rtn = '';

        for( var i=0; i < str.length; ++i ){
            red   = Math.sin(frequency*i+2+phase) * width + center;
            green = Math.sin(frequency*i+0+phase) * width + center;
            blue  = Math.sin(frequency*i+4+phase) * width + center;
            rtn += '<font color="rgb(' + red + ',' + green + ',' + blue + ')">' + str.substr(i,1) + '</font>';
        }
        return rtn;
    }

    //------------------------------------------------
    // Returns an array of colors that are a linear gradient
    // between the two given colors.
    // @param: colorStart - Color;
    // @param: colorEnd - Color;
    // @param: step - integer;
    // @return; array of colors
    //------------------------------------------------
    Colors.prototype.linearGradient = function( colorStart,  colorEnd, steps ){
        if( !(colorStart instanceof Color && colorEnd instanceof Color ) ) return [];
        var rtn = [];
        steps = parseInt(steps); 
        var  colorD = colorEnd.sub(colorStart); 

        for( var i=0, r=0, tc=null; i<steps; i++ ){
            tc = new Color();
            r = i/(steps-1);
            tc.r = colorStart.r + colorD.r*r;
            tc.g = colorStart.g + colorD.g*r;
            tc.b = colorStart.b + colorD.b*r;
            rtn.push( tc );
        }

        return rtn;
    } 
})();
