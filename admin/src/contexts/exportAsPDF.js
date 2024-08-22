import jsPDF from "jspdf";
import "jspdf-autotable";

export const downloadPdf = (head, bodyData, Title) => {
  // console.log("turdfsz", Title);
  // console.log(bodyData);
  const unit = "pt";
  const size = "A4"; // Use A1, A2, A3 or A4
  const orientation = "portrait"; // portrait or landscape
  const doc = new jsPDF(orientation, unit, size);
  const headers = head;
  const content = {
    startX: 50,
    head: headers,
    body: bodyData,
  };
  // console.log(content);
  doc.text(Title, 50, 30);
  doc.autoTable(content);
  doc.save(`${Title}.pdf`);
};

