/// <reference types="node" />
export declare type PdfToPngOptions = {
    viewportScale?: number;
    outputFilesFolder?: string;
    disableFontFace?: boolean;
    useSystemFonts?: boolean;
    pdfFilePassword?: string;
    outputFileMask?: string;
    pages?: number[];
};
export declare type PngPageOutput = {
    name: string;
    content: Buffer;
    path: string;
};
export declare function pdfToPng(pdfFilePathOrBuffer: string | ArrayBufferLike, props?: PdfToPngOptions): Promise<PngPageOutput[]>;
