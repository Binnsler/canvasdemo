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

            // Draw alien ship from /src/content/roswellShip.png
            this.context.drawImage(
                this.image,
                70,
                70,
                135,
                73
            );

            // Change fill color and draw black square
            this.context.fillStyle = "#000000";
            this.context.fillRect( 0, 0, 30, 30 );

            // Draw red square
            this.context.fillStyle = "#ff021f";
            this.context.fillRect( 30, 30, 30, 30 );

            // Write text at 60, 60
            this.context.font = "20px Arial";
            this.context.fillStyle = "#000000";
            this.context.fillText( "Hello World", 65, 60 );
        `;

        return(
            <div className="example">
                <ExampleHeader title="Canvas Basic Functionality" code={code}/>
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
