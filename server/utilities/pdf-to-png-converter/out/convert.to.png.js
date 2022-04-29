"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfToPng = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const pdfjs = __importStar(require("pdfjs-dist/legacy/build/pdf"));
const node_canvas_factory_1 = require("./node.canvas.factory");
const cMapUrl = '../node_modules/pdfjs-dist/cmaps/';
const cMapPacked = true;
async function pdfToPng(pdfFilePathOrBuffer, props) {
    const isBuffer = Buffer.isBuffer(pdfFilePathOrBuffer);
    if (!isBuffer && !(0, fs_1.existsSync)(pdfFilePathOrBuffer)) {
        throw Error(`PDF file not found on: ${pdfFilePathOrBuffer}.`);
    }
    if (props?.outputFilesFolder && !(0, fs_1.existsSync)(props.outputFilesFolder)) {
        (0, fs_1.mkdirSync)(props.outputFilesFolder, { recursive: true });
    }
    if (!props?.outputFileMask && isBuffer) {
        throw Error('outputFileMask is required when input is a Buffer.');
    }
    const pdfFileBuffer = isBuffer
        ? pdfFilePathOrBuffer
        : (0, fs_1.readFileSync)(pdfFilePathOrBuffer);
    const pdfDocInitParams = {
        data: new Uint8Array(pdfFileBuffer),
        cMapUrl,
        cMapPacked,
    };
    pdfDocInitParams.disableFontFace = props?.disableFontFace ?? true;
    pdfDocInitParams.useSystemFonts = props?.useSystemFonts ?? false;
    if (props?.pdfFilePassword) {
        pdfDocInitParams.password = props?.pdfFilePassword;
    }
    const pdfDocument = await pdfjs.getDocument(pdfDocInitParams).promise;
    const pngPagesOutput = [];
    const targetedPages = props?.pages
        ? props.pages
        : Array.from({ length: pdfDocument.numPages }, (_, index) => index + 1);
    if (targetedPages.some((pageNum) => pageNum < 1)) {
        throw new Error('Invalid pages requested, page numbers must be >= 1');
    }
    for (const pageNumber of targetedPages) {
        if (pageNumber > pdfDocument.numPages) {
            // If a requested page is beyond the PDF bounds we skip it.
            // This allows the use case "generate up to the first n pages from a set of input PDFs"
            continue;
        }
        const page = await pdfDocument.getPage(pageNumber);
        const viewport = page.getViewport({ scale: props?.viewportScale ?? 1.0 });
        const canvasFactory = new node_canvas_factory_1.NodeCanvasFactory();
        const canvasAndContext = canvasFactory.create(viewport.width, viewport.height);
        const renderContext = {
            canvasContext: canvasAndContext.context,
            viewport,
            canvasFactory,
        };
        await page.render(renderContext).promise;
        const pageName = props?.outputFileMask ?? (0, path_1.parse)(pdfFilePathOrBuffer).name;
        const pngPageOutput = {
            name: `${pageName}_page_${pageNumber}.png`,
            content: canvasAndContext.canvas.toBuffer(),
            path: '',
        };
        if (props?.outputFilesFolder) {
            pngPageOutput.path = (0, path_1.resolve)(props.outputFilesFolder, pngPageOutput.name);
            (0, fs_1.writeFileSync)(pngPageOutput.path, pngPageOutput.content);
        }
        pngPagesOutput.push(pngPageOutput);
    }
    return pngPagesOutput;
}
exports.pdfToPng = pdfToPng;
//# sourceMappingURL=convert.to.png.js.map