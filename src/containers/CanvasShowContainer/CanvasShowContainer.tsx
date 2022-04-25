import React from 'react';

import "./CanvasShowContainer.scss"
import Canvas from '../../components/Canvas/Canvas';
import CanvasTools from '../CanvasTools/CanvasTools';

const CanvasShowContainer = () => {
    return (
        <div className="canvas-container">
            <div className="tools curved">
                <CanvasTools />
            </div>
            <div className="canvas">
                <Canvas />
            </div>
        </div>
    )
}

export default CanvasShowContainer