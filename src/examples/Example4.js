import React from "react";

import ExampleHeader from "ExampleHeader.js";
import example4Canvas from "canvas/example4.js";

class Example4 extends React.Component{
    constructor( props ){
        super( props );

        this.canvas = null;

        this.setCanvasRef = ( element ) => {
            this.canvas = element;
        };
    }

    render(){
        const code = `
            // Using requestAnimationFrame(), images created by a designer,
            // and a bit of logic, we can make a simple animation
        `;

        return(
            <div className="example">
                <ExampleHeader title="requestAnimationFrame - Advanced" code={code}/>
                <div className="flex">
                    <canvas ref={this.setCanvasRef} width="900" height="450"></canvas>
                </div>
            </div>
        );
    }

    componentDidMount(){
        this.example = new example4Canvas( this.canvas);

        this.example.initialize();
    }
};

export default Example4;
