import React from "react";

const ExampleHeader = ( props ) => (
    <div>
        <h1>{props.title}</h1>
        <div className="code">
            <pre>
                <code>
                    {props.code}
                </code>
            </pre>
        </div>
    </div>
);

export default ExampleHeader;
