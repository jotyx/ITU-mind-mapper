import { find } from "lodash";

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

export const coordinatesInsideNode = (x, y, map) => {
  return find(
    map.nodes,
    n => x >= n.x && x <= n.x + n.width && y >= n.y && y <= n.y + n.height
  );
};
