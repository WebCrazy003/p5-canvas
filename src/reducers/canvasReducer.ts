import { GlobalStateType } from '../types/store';

const initialState: GlobalStateType = {
    canvas: {}, 
    canvasShapes: [], 
    myShapes: [],
    selected: 'shapes',
}

export default function canvasReducer(state = initialState, action: any) {
    switch(action.type) {
        case "LOAD_CANVAS": 
            return {
                ...state,
                canvas: action.canvas,
                canvasShapes: action.canvas.p5_shapes,
                myShapes: action.canvas.p5_shapes,
            }
        case "PATCH_CANVAS":
            return {
                ...state,
                canvas: action.canvas.picture
            }
        case "NEW_SHAPE":
            return {
                ...state,
                myShapes: [...state.myShapes, action.animation]
            }
        case "EDIT_SHAPE":
            const myShapes = state.myShapes.map(animation => {
                if (animation.id === action.animation.id) {
                    return action.animation
                } else {
                    return animation
                }})
            return {
                ...state,
                myShapes: [...myShapes]
            }
        case "CHANNEL_POST_SHAPE":
            return {
                ...state,
                canvasShapes: [...state.canvasShapes, action.animation.p5_shape]
            }
        case "CHANNEL_PATCH_SHAPE":
            const canvasShapes = state.canvasShapes.map(animation => {
                if (animation.id === action.animation.p5_shape.id) {
                    return action.animation.p5_shape
                } else {
                    return animation
                }
            })
            return {
                ...state,
                canvasShapes: [...canvasShapes]
            }
        case "SELECT_ANIMATION":
            return {
                ...state,
                selected: action.animation
            }
        case "REMOVE_CANVAS":
            return {
                ...state,
                canvas: {},
                myAnimations: [],
                canvasAnimations: [],
                selected: ''
            }
        default:
            return state
    }
}