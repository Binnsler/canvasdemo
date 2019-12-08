import React from "react";

import ExampleHeader from "ExampleHeader.js";
import example1Canvas from "canvas/example1.js";

class Example1 extends React.Component{
    constructor( props ){
        super( props );

        this.canvas = null;

        this.setCanvasRef = ( element ) => {
            this.canvas = element;
        };
    }

    render(){
        const code = `
            // Grab canvas element and select 2d context to get Canvas 2D API
            var canvas = document.getElementById( "canvas" );
            var context = canvas.getContext( "2d" );

            // Create image, set up drawing in load callback, set image src
            this.image = new Image();

            this.image.onload = () => {
                this.context.drawImage(
                    this.image,
                    10,  // x where sprite starts on spritesheet
                    35,  // y where sprite starts on spritesheet
                    250, // width on spritesheet
                    125, // height on spritesheet
                    20,  // x origin on canvas
                    20,  // y origin on canvas
                    100, // width to draw sprite on canvas
                    50   // height to draw sprite on canvas
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

            // Select spritesheet
            this.image.src = "/src/content/ufos.png";
        `;

        return(
            <div className="example">
                <ExampleHeader title="Basic Functionality" code={code}/>
                <div className="flex">
                    <canvas ref={this.setCanvasRef} width="300" height="300"></canvas>
                </div>
            </div>
        );
    }

    componentDidMount(){
        const context = this.canvas.getContext( "2d" );

        let example = new example1Canvas( this.canvas, context );
    }
};

export default Example1;
