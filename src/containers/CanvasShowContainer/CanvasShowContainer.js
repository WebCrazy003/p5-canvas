import React from 'react';
import "./CanvasShowContainer.scss"
import Canvas from '../../components/Canvas/Canvas';
import { connect } from 'react-redux'
import CanvasTools from '../CanvasTools/CanvasTools';

const CanvasShowContainer = props => {
    return (
            <div className="canvas-container">
                    <div className="tools curved">
                        <CanvasTools />
                    </div>
                    <div className="canvas">
                        <Canvas paramsId={props.paramsId} />
                    </div>
            </div>
    )
}

const mapStateToProps = (state) => {
    return {
        canvas: state.canvas,
        admin: state.admin
    }
}

export default connect(mapStateToProps)(CanvasShowContainer)