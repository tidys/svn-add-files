const { join, relative } = require("path")
const { execSync } = require("child_process")
const glob = require("glob")
const pattern = join(__dirname, "**/*.a").replace(/\\/g, "/");
const files = glob.globSync(pattern);
const addedFiles = [];
const added = execSync("svn status", { cwd: __dirname }).toString();

added.split("\r\n").forEach(line => {
  if (line.startsWith("A")) {
    const file = line.substring(1).trim();
    addedFiles.push(file);
  }
})

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const url = relative(__dirname, file)
  if (addedFiles.includes(url)) continue;
  console.log(file);
  const ret = execSync(`svn add ${url}`, { cwd: __dirname })
  console.log(ret.toString())
}
console.log("finish")