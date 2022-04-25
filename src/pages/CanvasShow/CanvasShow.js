import React from 'react';
import CanvasShowContainer from '../../containers/CanvasShowContainer/CanvasShowContainer'
import "./CanvasShow.scss"
import { connect } from 'react-redux'
// import { api } from '../../services/api'

class CanvasShow extends React.Component {

    componentDidMount() {
        // api.canvas.fetchCanvas(this.props.match.params.id)
        //     .then(resp => resp.json())
        //     .then(json => {
        //         console.log("json:", json);
        //         this.props.dispatch({type: "LOAD_CANVAS", canvas: json})
        //     })
        this.props.dispatch({type: "LOAD_CANVAS", canvas: {
            "id": 45,
            "title": "creating test",
            "background": "255,255,255",
            "mid_mapping_1": -100,
            "mid_mapping_2": 100,
            "treble_mapping_1": 100,
            "treble_mapping_2": 250,
            "bass_mapping_1": 50,
            "bass_mapping_2": 200,
            "p5_shapes": [],
            "user": {
                "id": 44,
                "name": "Ray",
                "email": "raycoaster99001@gmail.com"
            }
        }})
    }

    render() {
        return (
            <main className="canvas-show">
                <CanvasShowContainer 
                    paramsId={this.props.match.params.id} />
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user_id: state.user_id,
        canvas: state.canvas,
        admin: state.admin
    }
}

export default connect(mapStateToProps)(CanvasShow)