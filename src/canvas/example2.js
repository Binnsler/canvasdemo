const StackedBarGraph = function stackedBarGraph( canvas, initData, options ){
    var defaultOptions = {
        "watermark": false
    };

    this.canvas = canvas;
    this.context = this.canvas.getContext( "2d" );
    this.data = initData.data;
    this.options = Object.assign( defaultOptions, options );
    this.yAxisLabel = initData.yAxisLabel ? initData.yAxisLabel : "Number of students";
    this.legend = initData.legend;
    this.hover = {};
    this.columnTotals = {};
    this.mouse = {
        "x": 0,
        "y": 0
    };
    this.highestValue = 0;
    this.numColumns = 0;

    this.initialize = function initialize(){
        var category;
        var columnScore;
        var score;
        var i = 0;

        // Create graphBody which will hold columns, but not labels
        this.graphBody = {
            "origin": {
                "x": 75,
                "y": 10
            },
            "height": this.canvas.height - 50,
            "width": this.canvas.width - 100
        };

        // Loop over all data and create columnTotals
        for( i; i < this.data.length; i++ ){
            this.numColumns++;
            columnScore = 0;
            category = this.data[i].label;

            for( score in this.data[i].values ){
                columnScore += this.data[i].values[score];
            }

            if( columnScore > this.highestValue ){
                this.highestValue = columnScore;
            }

            this.columnTotals[category] = columnScore;
        }

        this.columnWidth = this.graphBody.width / this.numColumns;

        // Create highest value for label by rounding highest value to next 100
        this.topCutOff = this.getMaxChartValue( this.highestValue );

        this.addListeners();

        this.render();
    };

    this.render = function render(){
        // Clear canvas
        this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );
        this.canvas.style.cursor = "default";

        this.drawGraphLines();

        this.drawColumns();

        // After drawing all graph parts, draw hover
        this.drawHover.call( this );
    };

    /* eslint-disable complexity */
    this.getMaxChartValue = function getMaxChartValue( num ){
        let stringifiednum = num.toString();
        let numberDigits = stringifiednum.length;
        let newNum;

        if( num <= 8 ){
            return 8;
        }

        if( num <= 16 ){
            return 16;
        }

        if( numberDigits == 2 || numberDigits == 3 ){
            newNum = Math.ceil( num / 10 ) * 10;
        }

        if( numberDigits > 3 ){
            newNum = Math.ceil( num / 100 ) * 100;
        }

        return newNum;
    };

    this.addListeners = function addListeners(){
        this.canvas.addEventListener(
            "mousemove",
            ( e ) => {
                this.mouse = {
                    "x": e.offsetX,
                    "y": e.offsetY
                };

                this.render();
            }
        );
    };

    this.drawColumns = function drawColumns(){
        var category;
        var score;
        var blockHeight;
        var blockWidth = this.graphBody.width / this.numColumns;
        var i = 0;
        var x;
        var y;

        // Loop over all data and create a column label and column for each category
        // checking for hover highlights each time
        for( i; i < this.data.length; i++ ){
            category = this.data[i].label;
            x = this.graphBody.origin.x + ( blockWidth * i );
            y = this.graphBody.origin.y + this.graphBody.height;

            this.drawColumnLabel( category, blockWidth, x, y, i );

            // For each score in a column, create a block
            for( score in this.data[i].values ){
                blockHeight = ( this.data[i].values[score] / this.topCutOff ) * this.graphBody.height;
                y -= blockHeight;

                // Change color to match legend
                this.context.fillStyle = this.legend[score];

                // Check if block is being hovered to draw backing block
                this.checkHoverHighlight( category, score, x, y, blockWidth, blockHeight );

                // Draw block
                this.context.beginPath();
                this.context.rect(
                    x + ( blockWidth * 0.1 ),
                    y,
                    blockWidth * 0.8,
                    blockHeight
                );
                this.context.closePath();
                this.context.fill();

                // Check if block is being hovered to draw label
                this.checkHover( category, score, this.data[i].values[score] );
            }
        }
    };

    this.drawColumnLabel = function drawColumnLabel( category, blockWidth, x, y, i ){
        var textWidth;
        var lineX;
        var labelX;
        var text = category;
        var textFullWidth = this.context.measureText( category ).width;

        // If category label is longer then 12 characters, take first 9 and add "..."
        if( textFullWidth > blockWidth ){
            text = category.substring( 0, 9 ) + "...";
        }

        textWidth = this.context.measureText( text ).width;
        labelX = x + ( ( blockWidth / 2 ) - ( textWidth / 2 ) );
        lineX = x + ( blockWidth / 2 );

        this.context.fillStyle = "#000000";

        // If odd indexed, push down an extra 10px and draw a line
        if( ( i % 2 ) == 0 ){
            this.context.fillText( text, labelX, this.graphBody.height + 22 );
        }
        else{
            this.context.beginPath();
            this.context.moveTo( lineX, y );

            // Label moves down if odd-indexed
            y += 10;

            this.context.lineTo( lineX , y );
            this.context.stroke();
            this.context.closePath();

            this.context.fillText( text, labelX, this.graphBody.height + 32 );
        }

        // Draw blank rectangle over text to see if it is being hovered
        this.context.beginPath();
        this.context.rect(
            labelX,
            y,
            textWidth,
            13
        );
        this.context.closePath();

        this.checkColumnLabelHover( category );
    };

    this.checkHover = function checkHover( category, score, value ){
        if( this.context.isPointInPath( this.mouse.x, this.mouse.y ) ){
            this.canvas.style.cursor = "pointer";

            this.hover[`${category}${score}`] = {
                "x": this.mouse.x,
                "y": this.mouse.y,
                "value": value,
                "category": category,
                "score": score

            };
        }
        else{
            delete this.hover[`${category}${score}`];
        }
    };

    this.drawHover = function drawHover(){
        var item;
        var hover;
        var text;
        var percent;
        var layout;
        var finalLayout;
        var rectWidth;


        for( item in this.hover ){
            hover = this.hover[item];

            // If hovering column label
            if( hover.label ){
                layout = {
                    "rectX": hover.x + 14,
                    "textX": hover.x + 10
                };

                text = hover.label;

                rectWidth = Math.max( this.context.measureText( text ).width, this.context.measureText( hover.score ).width );

                // If hover text goes beyond edges of canvas, mirror flip over X axis of cursor
                finalLayout = this.checkEdges( layout, rectWidth );

                this.context.fillStyle = "#444444";
                this.context.fillRect( finalLayout.rectX - 2, hover.y - 2, rectWidth + 10, 18 );

                this.context.fillStyle = "#FFFFFF";
                this.context.fillRect( finalLayout.rectX, hover.y, rectWidth + 6, 14 );

                this.context.fillStyle = "#000000";
                this.context.fillText( text, finalLayout.textX + 8, hover.y + 10 );
            }
            // Else hovering column block
            else{
                layout = {
                    "rectX": hover.x + 15,
                    "textX": hover.x + 17
                };

                percent = ( ( hover.value / this.columnTotals[hover.category] ) * 100 ).toFixed( 2 );

                text = `${percent}% or ${hover.value} / ${this.columnTotals[hover.category]}`;

                rectWidth = Math.max( this.context.measureText( text ).width, this.context.measureText( hover.score ).width ) + 30;

                // If hover text goes beyond edges of canvas, mirror flip over X axis of cursor
                finalLayout = this.checkEdges( layout, rectWidth );

                this.context.fillStyle = "#444444";
                this.context.fillRect( finalLayout.rectX - 2, hover.y - 2, rectWidth + 4, 26 );

                this.context.fillStyle = "#FFFFFF";
                this.context.fillRect( finalLayout.rectX, hover.y, rectWidth, 22 );

                this.context.fillStyle = this.legend[hover.score];
                this.context.fillRect( finalLayout.textX, hover.y + 2, 18, 18 );

                this.context.fillStyle = "#000000";
                this.context.fillText( text, finalLayout.textX + 22, hover.y + 10 );
                this.context.fillText( hover.score, finalLayout.textX + 22, hover.y + 19 );
            }
        }
    };

    this.checkColumnLabelHover = function checkColumnLabelHover( category ){
        if( this.context.isPointInPath( this.mouse.x, this.mouse.y ) ){
            this.canvas.style.cursor = "pointer";

            this.hover[category] = {
                "x": this.mouse.x,
                "y": this.mouse.y,
                "label": category
            };
        }
        else{
            delete this.hover[category];
        }
    };

    this.checkEdges = function checkEdges( layout, rectWidth ){
        if( this.canvas.width < layout.rectX + rectWidth ){
            return {
                "rectX": layout.rectX - rectWidth - 25,
                "textX": layout.textX - rectWidth - 25
            };
        }

        return layout;
    };

    this.drawGraphLines = function drawGraphLines(){
        var progression = [ 0, 0.25, 0.5, 0.75, 1 ];
        var label;
        var i = 0;
        var pointFrom = {};
        var pointTo = {};

        // Draw lines at 0%, 25%, 50%, 75%, and 100% of this.topCutOffs
        for( i; i < progression.length; i++ ){
            pointFrom = {
                "x": this.graphBody.origin.x - 10,
                "y": this.graphBody.origin.y + this.graphBody.height - ( this.graphBody.height * progression[i] )
            };

            pointTo = {
                "x": pointFrom.x + this.graphBody.width + 10,
                "y": pointFrom.y
            };

            label = Math.floor( this.topCutOff * progression[i] );

            this.drawLine( pointFrom, pointTo, label );
        }

        this.drawYAxisLabel();
    };

    this.drawYAxisLabel = function drawYAxisLabel(){
        this.context.save();
        this.context.translate( this.canvas.width / 2, this.canvas.height / 2 );
        this.context.rotate( ( Math.PI / 180 ) * -90 );
        this.context.fillStyle = "#000000";
        this.context.fillText( this.yAxisLabel, 0, -( this.canvas.width / 2 ) + 15 );
        this.context.restore();
    };

    this.drawLine = function drawLine( pointFrom, pointTo, label ){
        var textWidth = this.context.measureText( label ).width;

        // Draw label
        this.context.fillStyle = "#000000";
        this.context.fillText( label, pointFrom.x - textWidth - 10, pointFrom.y );

        // Draw line
        this.context.beginPath();
        this.context.moveTo( pointFrom.x, pointFrom.y );
        this.context.lineTo( pointTo.x, pointTo.y );
        this.context.stroke();
        this.context.closePath();
    };

    this.checkHoverHighlight = function checkHoverHighlight( category, score, x, y, blockWidth, blockHeight ){
        if( this.hover[`${category}${score}`] ){
            this.context.globalAlpha = 0.4;

            this.context.beginPath();
            this.context.rect(
                x,
                y,
                blockWidth,
                blockHeight
            );
            this.context.closePath();
            this.context.fill();

            this.context.globalAlpha = 1.0;
        }
    };
};

export default StackedBarGraph;
