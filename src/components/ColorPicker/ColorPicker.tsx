import React from "react"
import { Slider } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import "./ColorPicker"

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

interface ColorPickerProps {
    red: number;
    green: number;
    blue: number;
    handleChange: (color: string, v: number | number[]) => void;
}

const ColorPicker = ({red, green, blue, handleChange}: ColorPickerProps) => {
    return (
        <>
            <RedSlider 
                value={red}
                min={0}
                max={255}
                valueLabelDisplay='auto'
                onChange={(e,v) => handleChange("red", v)} />
            <GreenSlider 
                value={green}
                min={0}
                max={255}
                valueLabelDisplay='auto'
                onChange={(e,v) => handleChange("green", v)} />
            <BlueSlider 
                value={blue}
                min={0}
                max={255}
                valueLabelDisplay='auto'
                onChange={(e,v) => handleChange("blue", v)} />
        </>
    )
}

export default ColorPicker