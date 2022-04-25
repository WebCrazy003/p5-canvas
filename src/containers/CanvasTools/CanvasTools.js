import React from 'react';
import { connect } from 'react-redux'
// import { api } from '../../services/api'
import ShapeEdit from '../../components/ShapeEdit/ShapeEdit'
import CanvasSettings from '../../components/CanvasSettings/CanvasSettings'
import "./CanvasTools.scss"
// import BrushIcon from '@material-ui/icons/Brush';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AllOutIcon from '@material-ui/icons/AllOut';
import SettingsIcon from '@material-ui/icons/Settings';

const shapeDefaultValue = {
    "id": 214,
    "user_id": 44,
    "picture_id": 44,
    "fill": "0,0,0",
    "frequency": "treble",
    "stroke": "0,0,0",
    "shape": "rect",
    "width": 5,
    "height": 5,
    "amount": 5,
    "orbit": 0,
    "spin": 0,
    "stagger_radius": 0,
    "stagger_place": 0,
    "picture": {
      "id": 44,
      "title": "Testing P5",
      "background": "44,172,118",
      "mid_mapping_1": -100,
      "mid_mapping_2": 100,
      "treble_mapping_1": 116,
      "treble_mapping_2": 250,
      "bass_mapping_1": 50,
      "bass_mapping_2": 200,
      "p5_shapes": [
        {
          "id": 203,
          "picture_id": 44,
          "user_id": 44,
          "fill": "0,0,0",
          "frequency": "treble",
          "stroke": "0,0,0",
          "shape": "rect",
          "width": 5,
          "height": 5,
          "amount": 5,
          "orbit": 0,
          "spin": 0,
          "stagger_radius": 0,
          "stagger_place": 0,
          "created_at": "2022-04-25T00:14:48.597Z",
          "updated_at": "2022-04-25T00:14:48.597Z"
        },
        {
          "id": 205,
          "picture_id": 44,
          "user_id": 44,
          "fill": "203,87,72",
          "frequency": "treble",
          "stroke": "0,0,0",
          "shape": "rect",
          "width": 17,
          "height": 5,
          "amount": 5,
          "orbit": 33,
          "spin": 0,
          "stagger_radius": 0,
          "stagger_place": 0,
          "created_at": "2022-04-25T00:15:56.938Z",
          "updated_at": "2022-04-25T00:16:37.471Z"
        },
        {
          "id": 204,
          "picture_id": 44,
          "user_id": 44,
          "fill": "63,199,253",
          "frequency": "treble",
          "stroke": "150,45,0",
          "shape": "triangle",
          "width": 13,
          "height": 14,
          "amount": 5,
          "orbit": -31,
          "spin": 93,
          "stagger_radius": 0,
          "stagger_place": 0,
          "created_at": "2022-04-25T00:14:49.387Z",
          "updated_at": "2022-04-25T00:17:39.571Z"
        },
        {
          "id": 214,
          "picture_id": 44,
          "user_id": 44,
          "fill": "0,0,0",
          "frequency": "treble",
          "stroke": "0,0,0",
          "shape": "rect",
          "width": 5,
          "height": 5,
          "amount": 5,
          "orbit": 0,
          "spin": 0,
          "stagger_radius": 0,
          "stagger_place": 0,
          "created_at": "2022-04-25T03:14:27.424Z",
          "updated_at": "2022-04-25T03:14:27.424Z"
        }
      ]
    },
    "user": {
      "id": 44,
      "name": "Ray",
      "email": "raycoaster99001@gmail.com"
    }
  }

const CanvasTools = (props) => {

    const renderMyAnimations = () => {
        switch (props.selected) {
            case "shapes":
                return (
                    <div className="tools-container">
                        <div className="shape-container">
                            <button className="new-shape" onClick={() => handleNewAnimation('p5_shape')}><AddCircleIcon /> Create New Shape</button>
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
    
    const handleNewAnimation = (modelName) => {
        // api.animation.newAnimation(modelName, props.canvas_id)
        //     .then(resp => resp.json())
        //     .then(json => {
        //         if (modelName == 'animate_mo') {
        //             props.dispatch({type: "HTTP_NEW_BURST", animation: json})
        //         } else {
        //             props.dispatch({type: "HTTP_NEW_SHAPE", animation: json})
        //         }
        //     })
        props.dispatch({type: "HTTP_NEW_SHAPE", animation: shapeDefaultValue })
        props.dispatch({type: "CHANNEL_POST_SHAPE", animation: { p5_shape: shapeDefaultValue }})
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


const mapStateToProps = state => {
    return {
        myShapes: state.myShapes,
        myBrush: state.myBrush,
        selected: state.selected,
        admin: state.admin
    }
}

export default connect(mapStateToProps)(CanvasTools)