import React from "react";

import ExampleHeader from "ExampleHeader.js";
import example3Canvas from "canvas/example3.js";

class Example3 extends React.Component{
    constructor( props ){
        super( props );

        this.state =  {
            "value": 1
        };

        this.canvas = null;

        this.setCanvasRef = ( element ) => {
            this.canvas = element;
        };
    }

    onChange( e ){
        this.setState( {
            "value": e.target.value
        } );

        this.example.setSpeed( e.target.value );
    }

    render(){
        const code = `
            // By using the browsers requestAnimationFrame() and calculating
            // the current time we can create an animation loop that uses
            // time to make calculations

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
                    // ...animation logic
                };
            };

        `;

        return(
            <div className="example">
                <ExampleHeader title="requestAnimationFrame - Basic" code={code}/>
                <div className="flex">
                    <canvas ref={this.setCanvasRef} width="600" height="300"></canvas>
                    <select value={this.state.value} onChange={this.onChange.bind(this)}>
                        <option value="1">Slow</option>
                        <option value="10">Fast</option>
                    </select>
                </div>
            </div>
        );
    }

    componentDidMount(){
        this.example = new example3Canvas( this.canvas);

        this.example.initialize();
    }
};

export default Example3;
