const fs = require("fs");
const request = require("request");
const { GITHUB_REF, GITHUB_REPOSITORY, GITHUB_TOKEN,GITHUB_HEAD_REF ,GITHUB_BASE_REF} = process.env;

const num = GITHUB_REF.split("/")[2];
const rep = GITHUB_REPOSITORY.split("/");
const branch = `${GITHUB_HEAD_REF.replace(/\//,'-')}--${GITHUB_BASE_REF.replace(/\//,'-')}`;
const url = `https://${rep[0]}.github.io/${rep[1]}/??branch=${branch}`;

const readFileList = (pathName) =>
  fs.promises
    .readFile(pathName, { encoding: "utf-8" })
    .then((e) => JSON.parse(e))
    .catch(() => {});

readFileList("index.json")
  .then((params) => {
    const body = `
<${url}>  

Images: ${params?.actualItems.length || 0}  
Faild: ${params?.diffItems.length || 0}   
New: ${params?.newItems.length || 0}  
Delete: ${params?.deletedItems.length || 0}  
`;

    request.post(
      {
        uri: `https://api.github.com/repos/${GITHUB_REPOSITORY}/issues/${num}/comments?access_token=${GITHUB_TOKEN}`,
        headers: {
          "User-Agent": "https://api.github.com/meta",
          "Content-type": "application/json",
        },
        json: { body },
      },
      (_error, _response, body) => {
        console.log(body);
      }
    );
  });
