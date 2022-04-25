import React from 'react';
import { connect } from 'react-redux'

import CanvasShowContainer from '../../containers/CanvasShowContainer/CanvasShowContainer'
import "./CanvasShow.scss"
import { CANVAS_INIT_DATA } from '../../constants/initialData'
import { GlobalStateType } from '../../types/store';
import { DispatchProps } from '../../types/global';

interface CanvasShowProps {
    canvas: Record<string, any>;
}

class CanvasShow extends React.Component<CanvasShowProps & DispatchProps> {

    componentDidMount() {
        this.props.dispatch({type: "LOAD_CANVAS", canvas: CANVAS_INIT_DATA})
    }

    render() {
        return (
            <main className="canvas-show">
                <CanvasShowContainer />
            </main>
        )
    }
}

const mapStateToProps = (state: GlobalStateType) => {
    return {
        canvas: state.canvas,
    }
}

export default connect(mapStateToProps)(CanvasShow)