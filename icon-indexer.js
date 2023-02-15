// npx

const path = require("path");
const fs = require("fs");

const startDir = "papirus-icon-theme/Papirus/64x64/apps";
var isWin = process.platform === "win32";
const deliminator = isWin ? "\\" : "/";

var finder = require("findit")(process.argv[2] || startDir, {
  followSymlinks: true,
});

finder.on("directory", function (dir, stat, stop) {
  var base = path.basename(dir);
  if (base === ".git" || base === "node_modules") stop();
  // else console.log(dir + '/')
});

const readIsSvg = (fileData) => {
  let letter = fileData.charAt(0);
  return letter === "<";
};

let icons = {};

//This listens for files found
finder.on("file", function (file) {
  const path = file.toString();

  const data = fs.readFileSync(path, "utf8");

  const isSvg = readIsSvg(data);
  if (isSvg) {
    const fileNameWithExtension = path.split(deliminator)[4];
    let fileName = fileNameWithExtension.split(".")[0];

    console.log(fileName.toString());
    icons[`${fileName.toLowerCase()}`] = {
      path,
      // data,
    };

    // todo - unescape: https://stackoverflow.com/questions/4253367/how-to-escape-a-json-string-containing-newline-characters-using-javascript
  }
});

finder.on("end", function () {
  const json = JSON.stringify(icons);
  fs.writeFile("icons.json", json, function (err) {
    if (err) throw err;
    console.log("complete");
  });
});
