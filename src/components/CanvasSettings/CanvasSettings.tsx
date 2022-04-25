import React, { useState } from 'react';
import { connect } from 'react-redux'
import Slider from '@material-ui/core/Slider'
import Divider from '@material-ui/core/Divider'
import { withStyles } from '@material-ui/core/styles'

import { GlobalStateType } from '../../types/store'
import './CanvasSettings.scss'
import { DispatchProps } from '../../types/global';

const RedSlider = withStyles({
    root: {
        color: 'red'
    },
    thumb: {
        color: 'red'
    }
})(Slider);

const GreenSlider = withStyles({
    root: {
        color: 'green'
    },
    thumb: {
        color: 'green'
    }
})(Slider)

const BlueSlider = withStyles({
    root: {
        color: 'blue'
    },
    thumb: {
        color: 'blue'
    }
})(Slider)

interface CanvasSettingsProps {
    canvas: Record<string, any>;
}

const CanvasSettings = (props: CanvasSettingsProps & DispatchProps) => {
    const [background, setBackground] = useState([...props.canvas.background.split(',')
        .map((num: string) => parseInt(num))])


    const handleChange = (num: number, v: number | number[]) => {
        setBackground([...background.slice(0,num), v, ...background.slice(num+1)])
    }

    const handleSaveCanvas = () => {
        props.dispatch({
            type: "PATCH_CANVAS",
            canvas: {
                picture: {
                    background: background.join(','),
                }
            }
        });
    }

    return (
        <>
            <div className="canvas-settings">
                <button className="save-btn" onClick={handleSaveCanvas}>Save Changes</button>
                <h3>Background Color</h3>
                <RedSlider 
                    value={background[0]}
                    min={0}
                    max={255}                    
                    valueLabelDisplay='auto'
                    onChange={(e,v) => handleChange(0, v)} />
                <GreenSlider 
                    value={background[1]}
                    min={0}
                    max={255}
                    valueLabelDisplay='auto'                    
                    onChange={(e,v) => handleChange(1, v)} />
                <BlueSlider 
                    value={background[2]}
                    min={0}
                    max={255}
                    valueLabelDisplay='auto'
                    onChange={(e,v) => handleChange(2, v)} />
            </div>
            <Divider />
        </>
    )
}

const mapStateToProps = (state: GlobalStateType) => {
    return {
        canvas: state.canvas
    }
}

export default connect(mapStateToProps)(CanvasSettings)