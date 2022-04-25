import p5 from 'p5'

import { BASE_RADIUS } from './initialData'
import { ShapeType } from '../types/store'

class CanvasAdapter {

    static readShapes(array: ShapeType[], p5: p5) { 
        for (let i = 0; i < array.length; i++) {
            CanvasAdapter.readJsonShape(array[i], p5)
        }
    }

    static readJsonShape(json: any, p: p5) {
        p.push()

        p.fill(`rgb(${json.fill})`)
        p.stroke(`rgb(${json.stroke})`)

        const { width, height, amount, spin, orbit, shape } = json
        const radius = BASE_RADIUS
        p.rotate(orbit * p.frameCount/10)
        switch (shape) {
            case "rect":
                //This will allow the shape to rotate around its own axis
                for (let i = 0; i < amount; i++) {
                    p.push()
                        p.rotate((360/amount) * i)
                        p.push()
                            p.translate(radius, radius)
                            p.rotate(spin * p.frameCount/10)
                            p.rectMode(p.CENTER)
                            p.rect(0, 0, width, height)
                        p.pop()
                    p.pop()
                }
                break;
            case "ellipse":
                for (let i = 0; i < amount; i++) {
                    p.push()
                        p.rotate((360/amount)*i)
                        p.push()
                            p.translate(radius, radius)
                            p.rotate(spin * p.frameCount/10)
                            p.ellipseMode(p.CENTER)
                            p.ellipse(0, 0, width, height)
                        p.pop()
                    p.pop()
                }
                break;
            case "triangle":
                for (let i = 0; i < amount; i++) {
                    p.push()
                        p.rotate((360/amount)*i)
                        p.push()
                            const center = 2 * height/3
                            p.translate(radius, radius)
                            p.rotate(spin * p.frameCount/10)
                            p.triangle(0, -center, width, height, -width, height)
                        p.pop()
                    p.pop()
                }
                break;
            case "line":
                for (let i = 0; i < amount; i++) {
                    p.push()
                        p.rotate((360/amount)*i)
                        p.push()
                            p.translate(radius, radius)
                            p.rotate(spin * p.frameCount/10)
                            p.line(0, 0, width, height)
                        p.pop()
                    p.pop()
                }
                break;
            default:
        }
        p.pop()
    }
}

export default CanvasAdapter
