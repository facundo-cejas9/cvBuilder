import React, { useRef } from "react";
import jsPdf from "jspdf";
import html2canvas from "html2canvas";
import CvCreated from "./CvCreated";

export const PdfCreated = () => {
  const templateRef = useRef(null);

  const handleGeneratePdf = async () => {
    const input = templateRef.current;

    try {
      const canvas = await html2canvas(input, { scale: 3 }); // Aumentar la escala para mejorar la resolución
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPdf({
        orientation: "retraitable",
        unit: "cm",
        format: "a4",
      });

      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      const margin = 1; // 1 cm de margen en todos los lados

      pdf.addImage(imgData, "PNG", margin, margin, width - 2 * margin, height - 2 * margin)
      pdf.save("cv.pdf");
    } catch (error) {
      console.log("No se pudo generar el PDF");
    }
  };

  return (
    <div>
      <div ref={templateRef}>
        <CvCreated />
      </div>
      <div className="buttonDownload">
      <button  onClick={handleGeneratePdf}>Descargar PDF</button>
      </div>
      
    </div>
  );
};

export default PdfCreated;