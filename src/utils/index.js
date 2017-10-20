// utils here

export const downloadFile = (fileName, data, type) => {
  const blob = new Blob([data], { type });
  // pro IE
  if (navigator.appVersion.toString().indexOf(".NET") > 0) {
    window.navigator.msSaveBlob(blob, fileName);
  } else {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};
