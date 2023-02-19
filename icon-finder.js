const { findBestMatch } = require("string-similarity");
const fs = require("fs");
const { readFileSync, readFile } = fs;

let rawdata = readFileSync("icons.json");
let icons = JSON.parse(rawdata);

function readModuleFile(path, callback) {
  try {
    var filename = fs.resolve(path);
    readFile(filename, "utf8", callback);
  } catch (e) {
    console.log(e);
    callback(e);
  }
}

function findIcon(icon) {
  var matches = findBestMatch(`${icon}`, Object.keys(icons));
  // console.log(matches.filter((m) => m.rating > 0.8));
  return matches;
}

let str = process.argv[2];
str = str.toLowerCase();

if (str) {
  const { ratings, bestMatch } = findIcon(str);
  if (!bestMatch) return;

  const { target, rating } = bestMatch;

  const icon = icons[target];

  if (!icon) return;

  const { path } = icon;
  const data = fs.readFileSync(path.toString(), "utf8");

  console.log(icon);
  console.log(data);
} else {
  console.log("Please enter a search term");
}
