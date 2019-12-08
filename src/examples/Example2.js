import React from "react";

import ExampleHeader from "ExampleHeader.js";
import example2Canvas from "canvas/example2.js";

class Example2 extends React.Component{
    constructor( props ){
        super( props );

        this.canvas = null;

        this.setCanvasRef = ( element ) => {
            this.canvas = element;
        };
    }

    render(){
        const code = `
            // By combining the basic functionality of drawing text, images, and shapes,
            // with a little additional logic we can create something as complex as
            // a graphing engine that accepts a dataset. Throw in hover detection
            // and we can make that graph interactive.

            const data = {
                "data": [
                    {
                        "label": "Mathematics",
                        "values": {
                            "First": 13,
                            "Second": 83,
                            "Third": 24,
                            "Fourth": 54
                        }
                    },
                    {
                        "label": "Science",
                        "values": {
                            "First": 74,
                            "Second": 21,
                            "Third": 71,
                            "Fourth": 44
                        }
                    },
                    {
                        "label": "Reading",
                        "values": {
                            "First": 90,
                            "Second": 22,
                            "Third": 71,
                            "Fourth": 10
                        }
                    }
                ],
                "legend": {
                    "First": "#ff0000",
                    "Second": "#0400ff",
                    "Third": "#13bf00",
                    "Fourth": "#ffe900"
                }
            }

            let example = new example2Canvas( this.canvas, data, {} );

            example.initialize();

        `;

        return(
            <div className="example">
                <ExampleHeader title="Basic Functionality - Extended" code={code}/>
                <div className="flex">
                    <canvas ref={this.setCanvasRef} width="600" height="300"></canvas>
                </div>
            </div>
        );
    }

    componentDidMount(){
        const data = {
            "data": [
                {
                    "label": "Mathematics",
                    "values": {
                        "First": 13,
                        "Second": 83,
                        "Third": 24,
                        "Fourth": 54
                    }
                },
                {
                    "label": "Science",
                    "values": {
                        "First": 74,
                        "Second": 21,
                        "Third": 71,
                        "Fourth": 44
                    }
                },
                {
                    "label": "Reading",
                    "values": {
                        "First": 90,
                        "Second": 22,
                        "Third": 71,
                        "Fourth": 10
                    }
                }
            ],
            "legend": {
                "First": "#ff0000",
                "Second": "#0400ff",
                "Third": "#13bf00",
                "Fourth": "#ffe900"
            }
        }

        let example = new example2Canvas( this.canvas, data, {} );

        example.initialize();
    }
};

export default Example2;
