'use client';

import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import Divider from '@/Component/Common/Divider/Divider';
import getCurrentBasePath from '@/utils/getCurrentBasePath';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export default function Resume() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(0);
  };
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth * 0.8,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      style={{
        background: '#f1f1f1',
      }}
    >
      <Document
        onLoadSuccess={onDocumentLoadSuccess}
        file={`${getCurrentBasePath()}/resume.pdf`}
      >
        {Array.from({ length: numPages }).map((val, index) => {
          return (
            <div key={index}>
              <Page
                pageIndex={index}
                width={windowSize.width}
                height={windowSize.height}
              ></Page>
              <Divider length={'300px'} thickness={'1px'} />
            </div>
          );
        })}
      </Document>
    </div>
  );
}
