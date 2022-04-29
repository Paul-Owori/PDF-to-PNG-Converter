"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeCanvasFactory = void 0;
const assert_1 = require("assert");
const canvas_1 = __importDefault(require("canvas"));
class NodeCanvasFactory {
    create(width, height) {
        (0, assert_1.strict)(width > 0 && height > 0, 'Invalid canvas size');
        const canvas = canvas_1.default.createCanvas(width, height);
        const context = canvas.getContext('2d');
        return {
            canvas,
            context,
        };
    }
    reset(canvasAndContext, width, height) {
        (0, assert_1.strict)(canvasAndContext.canvas, 'Canvas is not specified');
        (0, assert_1.strict)(width > 0 && height > 0, 'Invalid canvas size');
        canvasAndContext.canvas.width = width;
        canvasAndContext.canvas.height = height;
    }
    destroy(canvasAndContext) {
        (0, assert_1.strict)(canvasAndContext.canvas, 'Canvas is not specified');
        canvasAndContext.canvas.width = 0;
        canvasAndContext.canvas.height = 0;
        canvasAndContext.canvas = undefined;
        canvasAndContext.context = undefined;
    }
}
exports.NodeCanvasFactory = NodeCanvasFactory;
//# sourceMappingURL=node.canvas.factory.js.map