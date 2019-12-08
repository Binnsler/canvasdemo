const Example3 = function example3( canvas ){
    this.canvas = canvas;
    this.context = this.canvas.getContext( "2d" );
    this.lastFrameTime = 0;
    this.x = 0;
    this.y = 140;
    this.direction = "right";

    this.initialize = () => {
        this.setSpeed( 1 );
        this.loop();
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
        this.gameTime = Math.floor( this.currentFrameTime );
        this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height );

        this.calculateDirection();

        if( this.direction == "right" ){
            this.x += 1;
        }
        else{
            this.x -= 1;
        }

        this.context.fillStyle = "#000000";
        this.context.fillRect( this.x, this.y, 20, 20 );
    };

    this.calculateDirection = () => {
        if( this.direction == "right" && this.x >= this.canvas.width - 20 ){
            this.direction = "left";
        }
        else if( this.x <= 0 ){
            this.direction = "right";
        }
    };

    this.setSpeed = ( multiplier ) => {
        this.fps = 1000 / ( 30 * multiplier );
    }
};

export default Example3;
