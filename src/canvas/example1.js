const example1 = function example1( canvas, context ){
    this.canvas = canvas;
    this.context = context;

    this.image = new Image();

    this.image.onload = () => {
        this.context.drawImage(
            this.image,
            10,
            35,
            250,
            125,
            60,
            60,
            100,
            50
        );

        // Change fill color
        this.context.fillStyle = "#000000";

        // Draw rectangle at origin 0, 0 with height and width of 30px
        this.context.fillRect( 0, 0, 30, 30 );

        this.context.fillStyle = "#ff021f";
        this.context.fillRect( 30, 30, 30, 30 );

        // Write text at 60, 60
        this.context.fillText( "Hello World", 60, 60 );
    };

    this.image.src = "/src/content/ufos.png";
};

export default example1;
