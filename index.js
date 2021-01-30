const getSearchParams = () =>
  Object.fromEntries(
    location.search
      .slice(1)
      .split("&")
      .map((s) => s.split("="))
  );

const getBranches = async () => {
  const res = await fetch("./captures/index.txt?" + Date.now()).catch(() => null);
  return res && (await res.text()).split("\n").filter((v) => v);
};
const getImages = async (story) => [
  story,
  await fetch(`./captures/${story}/image_diff/index.json?` + Date.now())
    .then((e) => e.json())
    .catch(() => null),
];

const getSnapshotList = async () =>
  Promise.all((await getBranches())?.map((story) => getImages(story)));

const snapshotList = getSnapshotList();
const stories = () => {
  snapshotList.then((snapshots) => {
    const headers = ["Img", "Diff", "Add", "Del"];
    const images = snapshots
      .map((image) => [
        image[0],
        {
          branch: image[0].split("--")[0],
          target: image[1]?.target,
          isPR: !!image[0].split("--")[1],
          images: [
            image[1]?.actualItems || [],
            image[1]?.diffItems || [],
            image[1]?.newItems || [],
            image[1]?.deletedItems || [],
          ],
        },
      ])
      .sort((a, b) => (a[0] === "master" ? -1 : a[0] < b[0] ? -1 : 1));

    const updateImage = () => {
      const params = getSearchParams();
      const index = Math.max(headers.indexOf(params["prefix"]), 0);
      const branch = params["branch"];
      const target = params["target"] || "";
      const storyInfo = images.find(
        ([name, info]) => name === branch && (!target || info.target == target)
      )?.[1];
      const box = document.querySelector(".images");
      while (box.childNodes.length) box.removeChild(box.childNodes[0]);
      storyInfo?.images[index].forEach((file) => {
        const title = document.createElement("a");
        title.className = "imageTitle";
        title.innerText = file;
        title.target = "_blank";
        title.href = `captures/${branch}/stories/?path=/story/${file
          .match(/(.*)_.*$/)[1]
          .replace(/(.*)\/(.*)$/, "$1--$2")
          .replace(/\/ /g, "-")}`;
        box.appendChild(title);
        if (index === 1) {
          const buttons = document.createElement("div");
          box.appendChild(buttons);
          ["Self", "Diff", "Target"].forEach((name) => {
            const button = document.createElement("button");
            button.innerText = name;
            buttons.appendChild(button);
            button.onclick = () => {
              switch (name) {
                case "Target":
                  img.src = `./captures/${storyInfo.target}/screenshots/${file}`;
                  break;
                case "Diff":
                  img.src = `./captures/${branch}/image_diff/${file}`;
                  break;
                case "Self":
                  img.src = `./captures/${branch}/screenshots/${file}`;
                  break;
              }
            };
          });
        }
        const img = document.createElement("img");
        img.src = `./captures/${index < 3 ? branch : storyInfo.target || "master"}/${
          index !== 1 ? "screenshots" : "image_diff"
        }/${file}`;
        img.onclick = () => {
          open(img.src, "_blank");
        };
        box.appendChild(img);
      });
      const cell = document.querySelector(
        `table[data-branch=${branch}][data-target${
          target ? `=${target}` : ""
        }] tr:nth-of-type(2) td:nth-of-type(${index + 1})`
      );
      document.querySelectorAll("table .select").forEach((node) => node.classList.remove("select"));
      if (cell) cell.classList.add("select");
    };

    images.forEach(([name, info]) => {
      const list = document.querySelector(".list");
      const table = document.createElement("table");
      table.dataset.branch = name;
      table.dataset.target = info.target || "";
      list.appendChild(table);

      const headerRow = table.insertRow();
      headers.forEach((name) => {
        headerRow.insertCell().innerText = name;
      });
      const row = table.insertRow();
      info.images.forEach((snapshot, i) => {
        const button = document.createElement("div");
        button.className = "link";
        button.innerText = snapshot.length;
        button.onclick = () => {
          history.pushState(
            null,
            null,
            `?branch=${name}&prefix=${headers[i]}&target=${info.target || ""}`
          );
          updateImage();
        };
        row.insertCell().appendChild(button);
      });
      const cellStory = table.insertRow().insertCell();
      cellStory.colSpan = 4;
      cellStory.innerHTML = `<a class="link" target="_blank" href='./captures/${name}/stories/?${Date.now()}'+>${
        info.isPR ? "[PR]" : ""
      }${info.branch} → ${info.target || "master"}</a>`;
    });
    updateImage();
    addEventListener("popstate", updateImage);
  });
};

addEventListener("DOMContentLoaded", () => stories());
