const Example4 = function example4( canvas ){
    this.canvas = canvas;
    this.context = this.canvas.getContext( "2d" );
    this.lastFrameTime = 0;
    this.backgroundOffset = 0;
    this.fps = 1000 / 60;
    this.alienY = 250;
    this.alienDirection = "up";

    this.initialize = () => {
        this.background = new Image();
        this.alien = new Image();
        this.shadow = new Image();

        this.background.onload = () => {
            this.loop();
        };

        this.shadow.src = "/src/content/roswellShadow.png";
        this.alien.src = "/src/content/roswellShip.png";
        this.background.src = "/src/content/roswellLandscape.png";
    };

    this.loop = () => {
        let elapsed;

        this.currentFrameTime = Date.now();

        elapsed = this.currentFrameTime - this.lastFrameTime;

        if( elapsed > this.fps ){
            this.draw();
            this.lastFrameTime = this.currentFrameTime;
        }

        requestAnimationFrame( this.loop );
    };

    this.draw = () => {
        this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );

        // Draw two backgrounds
        this.context.drawImage(
            this.background,
            this.backgroundOffset,
            0
        );

        this.context.drawImage(
            this.background,
            this.backgroundOffset + 2252,
            0
        );


        // Draw alien
        this.context.drawImage(
            this.alien,
            50,
            this.alienY
        );

        // Draw shadow
        this.context.drawImage(
            this.shadow,
            115,
            400
        );

        this.calculateBackgroundOffset();
        this.calculateAlienY();
    };

    this.calculateBackgroundOffset = () => {
        if( this.backgroundOffset == -2252 ){
            this.backgroundOffset = 0;
        }
        else{
            this.backgroundOffset = this.backgroundOffset - 2;
        }
    };

    this.calculateAlienY = () => {
        if( this.alienDirection == "down" ){
            this.alienY = this.alienY + 0.5;
        }
        else if( this.alienDirection == "up" ){
            this.alienY = this.alienY - 0.5;
        }

        if( this.alienDirection == "down" && this.alienY > 250 ){
            this.alienDirection = "up";
        }
        else if( this.alienDirection == "up" && this.alienY < 230 ){
            this.alienDirection = "down";
        }
    };
};

export default Example4;
