import Canvas from 'canvas';
export interface CanvasContext {
    canvas?: Canvas.Canvas;
    context?: Canvas.CanvasRenderingContext2D;
}
export declare class NodeCanvasFactory {
    create(width: number, height: number): CanvasContext;
    reset(canvasAndContext: CanvasContext, width: number, height: number): void;
    destroy(canvasAndContext: CanvasContext): void;
}
