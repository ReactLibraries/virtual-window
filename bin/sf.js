const fs = require("fs");
const path = require("path");

const TemplatePath = path.resolve(__dirname, "../Templates");
const TargetPath = path.resolve(__dirname, "../src/Components");

if (process.argv.length < 3) {
  console.log("sf ComponentName");
  return;
}
const componentName = process.argv[2];

const copyFile = async (src, dest) => {
  let text = await fs.promises.readFile(src, "utf8");
  fs.promises.writeFile(
    dest,
    text.replace(/{{{NAME}}}/g, componentName),
    "utf8"
  );
  console.log("output: %s", dest);
};

const getTemplets = () => {
  const files = fs.readdirSync(TemplatePath);
  return files
    .filter(
      (file) =>
        /\.template$/.test(file) &&
        !fs.statSync(path.resolve(TemplatePath, file)).isDirectory()
    )
    .map((file) => file.replace(/\.template$/, ""));
};

//ディレクトリ作成
try {
  fs.mkdirSync(path.resolve(TargetPath, componentName));
} catch (e) {
  /* */
}

//テンプレートからファイルの作成
getTemplets().forEach((template) =>
  copyFile(
    path.resolve(TemplatePath, `${template}.template`),
    path.resolve(
      TargetPath,
      componentName,
      template.replace(/{{{NAME}}}/, componentName)
    )
  )
);
