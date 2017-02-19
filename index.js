// 1- Plugin
// 2- Call

//////
// 1- backgroundGradient plugin
//////
(function($)
{

  $.fn.backgroundGradient = function( options ){

    var defauts = {
        "colors" : new Array(
            [237,80,83],  // first color left
            [233,97,61],  // first color right
            [237,25,76],  // second color left
            [198,23,212], // second color right
            [15,181,225], // third color left
            [60,112,216], // third color right
            [99,205,57],  // fourth color left
            [47,204,140]  // fourth color right*/
        ),
        "gradientSpeed" : 10, // transition speed
    }
    
    var params = $.extend(defauts, options);

    var i = 2;
    var colorsLength = params.colors.length;
    var step = 0;

    // color table indices for: 
    // current color left
    // next color left
    // current color right
    // next color right
    var colorIndices = [0,1,2,3];



    return this.each( function(){
        var $this = $(this);
        startGradient( $this );
    });

    function startGradient( $this ){
        setInterval(function(){
          updateGradient( $this );
        }, params.gradientSpeed);
    }

    function updateGradient( $this ){
        if ( $===undefined ) return;
        var CurrentColorLeft  = params.colors[colorIndices[0]];
        var NextColorLeft     = params.colors[colorIndices[2]];
        var CurrentColorRight = params.colors[colorIndices[1]];
        var NextColorRight    = params.colors[colorIndices[3]];

        var istep = 1 - step;

        // On the left : First color increase whereas next color decrease
        var r1 = Math.round(istep * CurrentColorLeft[0] + step * NextColorLeft[0]);
        var g1 = Math.round(istep * CurrentColorLeft[1] + step * NextColorLeft[1]);
        var b1 = Math.round(istep * CurrentColorLeft[2] + step * NextColorLeft[2]);

        var colorLeft = "rgb("+r1+","+g1+","+b1+")";

        // On the right : First color increase whereas next color decrease
        var r2 = Math.round(istep * CurrentColorRight[0] + step * NextColorRight[0]);
        var g2 = Math.round(istep * CurrentColorRight[1] + step * NextColorRight[1]);
        var b2 = Math.round(istep * CurrentColorRight[2] + step * NextColorRight[2]);

        var colorRight = "rgb("+r2+","+g2+","+b2+")";

        $this.css({
            background: "linear-gradient(to left, "+colorLeft+", "+colorRight+")"
        });
          

        // Next step
        step += 0.001;

        // We need next colors
        // Step can't exceed 1 else we take rest of modulo by 1
        if ( step >= 1 )
        {
          step = 0;
          if( i+2 < colorsLength && colorsLength > 4){
            colorIndices = [i,i+1,i+2,i+3];
            i = i + 2 ;
          }else if( i+2 == colorsLength || ( colorsLength == 4 && i < colorsLength ) ){
            colorIndices = [i,i+1,0,1];
            if( colorsLength == 4 ){
              i = i + 2;
            }else
              i++;
          }else{
            colorIndices = [0,1,2,3];
            i = 2;
          }



          /*if( i == 0 ){
            colorIndices = [2,3,4,5];
            i++;
          }else if( i == 1 ){
            colorIndices = [4,5,6,7];
            i++;
          }else if( i == 2 ){
            colorIndices = [6,7,0,1];
            i++;
          }else{
            colorIndices = [0,1,2,3];
            i = 0;
          }*/
        
        }
    }


  };

})(jQuery);





//////
// 1- Call with 2 params : an array of colors and the speed animation
//////
$('#gradient').backgroundGradient(
    {
        "colors" : new Array(
            [237,80,83],  // first color left
            [233,97,61],  // first color right
            [237,25,76],  // second color left
            [198,23,212], // second color right
            [15,181,225],  // third color left
            [60,112,216], // third color right
            [99,205,57],  // fourth color left
            [47,204,140] // fourth color right*/
        ),
        //"gradientSpeed" : 0.001
        "gradientSpeed" : 30 // delay between two colors (sec)
    }
);