import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Slider, InputLabel, FormControl, MenuItem, Select, Typography, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles'

import {ReactComponent as Arrow} from "../../assets/dropdown.svg"
import { ShapeType } from '../../types/store'
import { DispatchProps } from '../../types/global'
import "./ShapeEdit.scss"

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

interface ShapeEditProps {
    shape: ShapeType;
}

const ShapeEdit = (props: ShapeEditProps & DispatchProps) => {

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (props.shape.id !== shape.id) {
            setShape({
                ...props.shape,
                fill: [...props.shape.fill.split(',').map((num: string) => parseInt(num))],
                stroke: [...props.shape.stroke.split(',').map((num: string) => parseInt(num))]
            })
        }
    })

    const [shape, setShape] = useState({
        ...props.shape,
        fill: [...props.shape.fill.split(',').map((num: string) => parseInt(num))],
        stroke: [...props.shape.stroke.split(',').map((num: string) => parseInt(num))]
    })
    const [open, setOpen] = useState(false)

    const handleSubmit = () => {
        props.dispatch({
            type: "EDIT_SHAPE",
            animation: {
                ...shape,
                stroke: shape.stroke.join(','),
                fill: shape.fill.join(',')
            }
        });
        props.dispatch({
            type: "CHANNEL_PATCH_SHAPE",
            animation: {
                p5_shape: {
                    ...shape,
                    stroke: shape.stroke.join(','),
                    fill: shape.fill.join(',')
                }
            }
        });
    }

    const handleInputChange = (name: string, value: any) => {
        setShape({
            ...shape, 
            [name]: value
        })
    }

    const handleColorChange = (id: number, name: string, value: number | number[]) => {
        setShape({
            ...shape,
            [name]: [...shape[name].slice(0,id), value, ...shape[name].slice(id + 1)]
        })
    }

    const handleOpenShape = () => {
        setOpen(!open)
    }

    return (
        <div className="shape" key={shape.id}>
        <button className="dropdown-btn" onClick={handleOpenShape}><Arrow className={open ? "rotate" : ""} /> Shape: <span>{shape.shape}</span></button>
        <div className={open ? "dropdown" : "dropdown seen"}>
        <div className="tool-header">
            <button className="save-btn" onClick={handleSubmit}>Save Changes</button>
        </div>
        <div className="tool" >
            <ul>
            <li style={{display: "flex", justifyContent: "space-between"}}>
                <FormControl>
                    <InputLabel id="shape-select">Shape</InputLabel>
                    <Select 
                        labelId="shape-select"
                        id="shape-select"
                        name="shape"
                        defaultValue={""}
                        value={shape.shape} 
                        onChange={(e,v) => handleInputChange("shape", e.target.value)}>
                        <MenuItem value="rect" >Rectangle</MenuItem>
                        <MenuItem value="ellipse" >Ellipse</MenuItem>
                        <MenuItem value="triangle" >Triangle</MenuItem>
                        <MenuItem value="line" >Line</MenuItem>
                    </Select>
                </FormControl>
            </li>
            <li >
                <Typography id="slider" gutterBottom>
                    Fill Color
                </Typography>
                <RedSlider 
                    value={shape.fill[0]}
                    min={0}
                    max={255}
                    valueLabelDisplay='auto'
                    onChange={(e,v) => handleColorChange(0, "fill", v)} />
                <GreenSlider 
                    value={shape.fill[1]}
                    min={0}
                    max={255}
                    valueLabelDisplay='auto'
                    onChange={(e,v) => handleColorChange(1, "fill", v)} />
                <BlueSlider 
                    value={shape.fill[2]}
                    min={0}
                    max={255}
                    valueLabelDisplay='auto'
                    onChange={(e,v) => handleColorChange(2, "fill", v)} />
          
            </li>
            <li className="toolbox">
                <div>
                    <Typography id="slider" gutterBottom>
                        Width
                    </Typography>
                    <Slider 
                        name="width"
                        min={0}
                        max={50}
                        value={shape.width}
                        valueLabelDisplay='auto'
                        onChange={(e,v) => handleInputChange("width", v)} />
                    <Typography id="slider" gutterBottom>
                        Height
                    </Typography>
                    <Slider 
                        name="height"
                        min={0}
                        max={50}
                        value={shape.height}
                        valueLabelDisplay='auto'
                        onChange={(e,v) => handleInputChange("height", v)} />
                    <Typography id="slider" gutterBottom>
                        Amount
                    </Typography>
                    <Slider 
                        name="amount"
                        min={0}
                        max={20}
                        value={shape.amount}
                        valueLabelDisplay='auto'
                        onChange={(e,v) => handleInputChange("amount", v)}
                        />
                    <Typography id="slider" gutterBottom>
                        Orbit
                    </Typography>
                    <Slider
                        name="orbit"
                        min={-100}
                        value={shape.orbit}
                        valueLabelDisplay='auto'
                        onChange={(e,v) => handleInputChange("orbit", v)} />
                    <Typography id="slider" gutterBottom>
                        Spin
                    </Typography>
                    <Slider
                        name="spin"
                        min={-100}
                        value={shape.spin}
                        valueLabelDisplay='auto'
                        onChange={(e,v) => handleInputChange("spin", v)}
                    />
                </div>
            </li>
            <li>
                <Typography id="slider" gutterBottom>
                    Stroke Color
                </Typography>
                <RedSlider 
                    name="stroke"
                    valueLabelDisplay="auto"
                    value={shape.stroke[0]}
                    min={0}
                    max={255}
                    aria-label="Stroke"
                    onChange={(e,v) => handleColorChange(0, "stroke", v)} />
                <GreenSlider 
                    name="stroke"
                    valueLabelDisplay="auto"
                    value={shape.stroke[1]}
                    min={0}
                    max={255}
                    onChange={(e,v) => handleColorChange(1, "stroke", v)} />
                <BlueSlider 
                    name="stroke"
                    valueLabelDisplay="auto"
                    value={shape.stroke[2]}
                    min={0}
                    max={255}
                    onChange={(e,v) => handleColorChange(2, "stroke", v)} />
            </li>
            </ul>
        </div>
        </div>
        <Divider />
        </div>
    )
}


export default connect()(ShapeEdit)