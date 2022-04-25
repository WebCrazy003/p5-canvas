export type ShapeType = any;

export interface GlobalStateType {
    canvas: Record<string, any>;
    canvasShapes: Array<Record<string, any>>;
    myShapes: Array<ShapeType>;
    selected: string;
};
