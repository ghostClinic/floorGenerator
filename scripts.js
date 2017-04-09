

window.onload = function() {
    //page form elements
    var rbRandomH    = document.getElementById("rbRandomH");

    var rbFixedH     = document.getElementById("rbFixedH");

    
    var tbFixedW     = document.getElementById("tbFixedW");
    var tbFixedH     = document.getElementById("tbFixedH");

    var divMinMax    = document.getElementById("divMinMax");
    var cbAlternateH = document.getElementById("cbAlternateH");

    var tbMinH       = document.getElementById("tbMinH");
    var tbMaxH       = document.getElementById("tbMaxH");

    var tbColors     = document.getElementById("tbColors");

    var tbCW         = document.getElementById("tbCW");
    var tbCH         = document.getElementById("tbCH");

    var tbGap        = document.getElementById("tbGap");

    var ta           = document.getElementById('ta');
    var canvas       = document.getElementById('canvas');
    var btnGenerate  = document.getElementById('btnGenerate');


    //default values
    var build = {
        cW: 0,        //canvas width
        cH: 0,        //canvas height
        pW: 30,       //plank width
        pH: 220,      //plank height
        minPH: 80,    //minimum value on random plank length
        maxPH: 140,   //maximum value of random plank length 
        pCounter: 0,  //plank counter
        pColors: [], //plank colors
        pGap: 1,     //gap between planks
        pX: 0,       //plank x position
        pY: 0,       //plank y position
        svgItems: "" //svg assembled code
    };

    var options = {
        altColPos: true,      //value alternates - determines which columns are alternated
        alternatePos: false, //alternate adjacent columns
        randomLength: false, //randomize plank length
    };


        // divMinMax.setAttribute("disabled", true);
        // divMinMax.setAttribute("disabled", true);
        divMinMax.style.opacity = "0.3";


    function getRandomNumber(minimum, maximum) {
        return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
    }


    function insertBuildValues() {

        //reset pX and pY coordinates
        build.pX = 0;
        build.pY = 0;

        build.cW = Number(tbCW.value);
        build.cH = Number(tbCH.value);
        build.pW = Number(tbFixedW.value);

        build.pGap = Number(tbGap.value);

        var colors = tbColors.value.replace(/["'\s]/g, '');

        build.pColors = colors.split(",");


        if (rbRandomH.checked) {
            options.randomLength = true;
            build.minPH = Number(tbMinH.value);
            build.maxPH = Number(tbMaxH.value);
        } else if (rbFixedH.checked) {
            options.randomLength = false;
            build.pH = Number(tbFixedH.value);

        }

        //set alternate position of adjacent rows
        if (cbAlternateH.checked) {
            options.alternatePos = true;
        } else {
            options.alternatePos = false;
        }
    }

    function createSVGlineItem(x, y, bg, w, h) {
        return "<rect x='" + x + "' y='" + y + "' fill='" + bg + "' width='" + w + "' height='" + h + "' /> \n ";
    }

    function createSVGHead(cW, cH) {
        return "<?xml version='1.0' encoding='utf-8'?> \n <!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'> \n <svg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='" + cW + "px' height='" + cH + "px' viewBox='0 0 " + cW + " " + cH + "' enable-background='new 0 0 " + cW + " " + cH + "' xml:space='preserve'>\n";

    }


    function createSVG() {
    	//clear svg text area
        ta.value = "";

        //create svg code
        var svg = createSVGHead(build.cW, build.cH) + build.svgItems + "</svg>";
        //insert svg code into text area
        ta.value = svg;
        //clear svg line items
        build.svgItems = "";
    }

    function PlankObj() {

        this.x = build.pX;
        this.y = build.pY;
        this.w = build.pW;
        this.h = build.pH;

        if (options.randomLength === true) {
            this.h = getRandomNumber(build.minPH, build.maxPH);
        }

        var bg = build.pColors[getRandomNumber(0, build.pColors.length - 1)];
        c.fillStyle = bg;


        c.fillRect(this.x, this.y, this.w, this.h);
        //create svg line item for this plank and add it to build.svgItems
        build.svgItems = build.svgItems + createSVGlineItem(this.x, this.y, bg, this.w, this.h);

        if (build.pY + this.h < build.cH) {
            build.pX = this.x;
            //continue populating current column until bottom of canvas is reached
            build.pY = build.pY + this.h + build.pGap;
        } else {
            //bottom of canvas has been reached, begin a new column.
            build.pX = build.pX + this.w + build.pGap;



            //if planks are all uniform size, this determines if planks alternate position on
            if (options.alternatePos === true) {

                if (options.altColPos === false) {

                    build.pY = 0;
                } else {
                    //if the previous column started at the top of the canvas, start next column at the top - plank width / 2
                    build.pY = -Math.abs(build.pH / 2);

                }

            } else {
                build.pY = 0;
            }

            options.altColPos = !options.altColPos;

        }
    }





    function generatePlanks() {
        while (build.pX < build.cW) {

            var pl = new PlankObj();

        }

    }


    function sizeCanvas() {

        canvas.width = build.cW;
        canvas.height = build.cH;
        c = canvas.getContext('2d');
        c.fillStyle = "#fff";
        c.fillRect(0, 0, build.cW, build.cH);

    }

    function buildFloor() {
        insertBuildValues();
        sizeCanvas();
        generatePlanks();
        createSVG();
    }

    btnGenerate.onclick = function() {  	
        buildFloor();
    };



    rbRandomH.onclick = function() {

        cbAlternateH.checked = false;
        divMinMax.style.opacity = "1";
    };

    rbFixedH.onclick = function() {
        divMinMax.style.opacity = "0.3";
    };

}; //window
