import * as XLSX from "xlsx";

export const exportToExcel = (data, filename = "export") => {
  //Data To Worksheet
  const ws = XLSX.utils.json_to_sheet(data);
  //New WorkBook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, `Sheet1`);

  //File Create Download
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

export const importFromExcel = () => {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".xlsx, .xls, .csv";

    input.onchange = (event) => {
      const file = event.target.files[0];

      if (!file) {
        resolve(null);
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });

          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          const json = XLSX.utils.sheet_to_json(worksheet);

          resolve(json);
        } catch (error) {
          console.error("An error occurred while reading the file:", error);
          reject(error);
        }
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsArrayBuffer(file);
    };

    input.click();
  });
};
