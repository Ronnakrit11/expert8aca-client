"use client"
import { useState } from "react";
// import default react-pdf entry
import { Document, Page, pdfjs } from "react-pdf";
// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`
import workerSrc from "./pdf-worker";

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PDFViewer({ link }: any) {
    const [file, setFile] = useState("./sample-file.pdf");
    const [numPages, setNumPages] = useState(null);

    function onFileChange(event: any) {
        setFile(event.target.files[0]);
    }

    function onDocumentLoadSuccess({ numPages: nextNumPages }: any) {
        setNumPages(nextNumPages);
    }

    return (
        <div>
            <div className="w-full flex justify-center ">
                <Document file={link} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from({ length: numPages as any }, (_, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            renderAnnotationLayer={false}
                            renderTextLayer={false}
                        />
                    ))}
                </Document>
            </div>
        </div>
    );
}
