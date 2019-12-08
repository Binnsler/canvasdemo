import React from "react";

import ExampleHeader from "ExampleHeader.js";
import Game from "game/game.js";

class Example5 extends React.Component{
    constructor( props ){
        super( props );

        this.canvas = null;

        this.setCanvasRef = ( element ) => {
            this.canvas = element;
        };
    }

    render(){
        const code = `
            // By mixing basic functionality, spritesheets, JSON data, and
            // requestAnimationFrame() we can build something as complex as a game

            // To play, move with the left and right arrow keys, shooting with
            // the up arrow
        `;

        return(
            <div className="example">
                <ExampleHeader title="requestAnimationFrame - Complex" code={code}/>
                <div className="flex">
                    <canvas ref={this.setCanvasRef} width="320" height="480"></canvas>
                </div>
            </div>
        );
    }

    componentDidMount(){
        const context = this.canvas.getContext( "2d" );
        let example = new Game( this.canvas, context );

        example.initialize();
    }
};

export default Example5;
