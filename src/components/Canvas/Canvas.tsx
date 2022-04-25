import React, { RefObject } from 'react';
import { connect } from 'react-redux'
import p5 from 'p5'

import CanvasAdapter from '../../constants/CanvasAdapter'
import { GlobalStateType } from '../../types/store'
import { DispatchProps } from '../../types/global'
import "./Canvas.scss"

interface CanvansProps {
    canvas: Record<string, any>,
    selected: string,
    shapes: Record<string, any>[],
}

class Canvas extends React.Component<CanvansProps & DispatchProps> {
    private myRef: RefObject<HTMLDivElement>;
    private myP5?: p5;

    constructor(props: CanvansProps & DispatchProps) {
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount() {
        if (this.myRef) {
            this.myP5 = new p5 (this.sketch, this.myRef.current!)
        }
    }

    sketch = (p: p5) => {
        p.setup = () => {
            if (this.myRef) {
                p.createCanvas(this.myRef.current!.offsetWidth, this.myRef.current!.offsetHeight);
                p.angleMode(p.DEGREES)
            }
        };

        p.windowResized = () => {
            if (this.myRef && this.myRef.current) {
                p.resizeCanvas(this.myRef.current.offsetWidth, this.myRef.current.offsetHeight); 
            }
        }
      
        p.draw = () => {
            const { background } = this.props.canvas
    
            p.background(`rgb(${background})`)

            p.translate(p.width / 2, p.height / 2);

            CanvasAdapter.readShapes(this.props.shapes, p)
        };
    }

    componentWillUnmount() {
        this.props.dispatch({type: "REMOVE_CANVAS"})
    }

    render() {
        return (
            <div className="container">
                <div id="canvas" className="canvas" ref={this.myRef}/>
            </div>
        )
    }
}

const mapStateToProps = (state: GlobalStateType) => {
    return {
        canvas: state.canvas,
        selected: state.selected,
        shapes: state.canvasShapes,
    }
}

export default connect(mapStateToProps)(Canvas)
