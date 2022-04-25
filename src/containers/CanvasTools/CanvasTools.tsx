import React from 'react';
import { connect } from 'react-redux'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AllOutIcon from '@material-ui/icons/AllOut';
import SettingsIcon from '@material-ui/icons/Settings';

import ShapeEdit from '../../components/ShapeEdit/ShapeEdit'
import CanvasSettings from '../../components/CanvasSettings/CanvasSettings'
import './CanvasTools.scss'
import { SHAPE_DEFAULT } from '../../constants/initialData';
import { GlobalStateType  } from '../../types/store'
import { DispatchProps } from '../../types/global'
import { ShapeType } from '../../types/store';

interface CanvasToolsProps {
    myShapes: ShapeType[],
    selected: string,
}

const CanvasTools = (props: CanvasToolsProps & DispatchProps) => {

    const renderMyAnimations = () => {
        switch (props.selected) {
            case "shapes":
                return (
                    <div className="tools-container">
                        <div className="shape-container">
                            <button className="new-shape" onClick={() => handleNewAnimation()}>
                                <AddCircleIcon /> Create New Shape
                            </button>
                            {props.myShapes ? props.myShapes.map(shape => <ShapeEdit shape={shape} />) : null}
                        </div>
                    </div>
                )
            case "settings":
                return (
                    <div className='tools-container' >
                        <CanvasSettings />
                    </div> 
                )
            default:
                return ""
        }
    }
    
    const handleNewAnimation = () => {
        props.dispatch({type: "NEW_SHAPE", animation: SHAPE_DEFAULT})
        props.dispatch({type: "CHANNEL_POST_SHAPE", animation: { p5_shape: SHAPE_DEFAULT}})
    }

    const renderShapeButton = () => {
        return (
            <button onClick={() => props.dispatch({type: 'SELECT_ANIMATION', animation: "shapes"})}>
                <AllOutIcon /> Shapes
            </button>
        )
    }

    const renderSettingButton = () => {
        return (
            <button onClick={() => props.dispatch({type: 'SELECT_ANIMATION', animation: "settings"})}>
                <SettingsIcon /> Settings
            </button>
        )
    }

    return (
        <>
            <div className="tools-selector">
                {renderShapeButton()}
                {renderSettingButton()}
            </div>
            {renderMyAnimations()}
        </>
    )
}


const mapStateToProps = (state: GlobalStateType) => {
    return {
        myShapes: state.myShapes,
        selected: state.selected,
    }
}

export default connect(mapStateToProps)(CanvasTools)