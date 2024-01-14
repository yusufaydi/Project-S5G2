import "@testing-library/jest-dom/extend-expect";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

let dom, container;

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");
const script = fs.readFileSync(path.resolve(__dirname, "./index.js"), "utf8");
const code = script.replaceAll(" ", "").replaceAll("\n", "").toLowerCase();
//comment;
beforeEach(async () => {
  dom = new JSDOM(html, { runScripts: "dangerously" });
  container = dom.window.document;

  let scriptElement = dom.window.document.createElement("script");
  scriptElement.textContent = script;
  dom.window.document.head.appendChild(scriptElement);

  await new Promise((resolve) => dom.window.addEventListener("load", resolve));
});

test("[1] karanlikTemayiAcKapa isimli fonksiyon eklenmiş", () => {
  expect(code.includes("karanliktemayiackapa")).toBe(true);
});

test("[2] buton doğru başlangıç metni ile yaratılmış", () => {
  const buton = container.querySelector(".description #ackapa");
  //const buton = container.querySelector("#acKapa");
  expect(buton).toBeInTheDocument();
  expect(buton.textContent).toBe("Karanlık temayı aç");
});

test("[3] buton description classına sahip alana son child olarak eklenmiş", () => {
  const buton = container.querySelector(".description button:last-child");
  expect(buton).toBeInTheDocument();
});

test("[4] butondaki click eventi buton metinlerini doğru şekilde değiştiriyor", () => {
  const buton = container.querySelector(".description #ackapa");
  //const buton = container.getElementById("acKapa");
  buton.dispatchEvent(new dom.window.MouseEvent("click"));
  expect(buton.textContent).toBe("Karanlık temayı kapat");
  buton.dispatchEvent(new dom.window.MouseEvent("click"));
  expect(buton.textContent).toBe("Karanlık temayı aç");
});

test("[5] butondaki click eventi bodye dark classını doğru şekilde ekleyip, çıkarıyor", () => {
  const buton = container.querySelector(".description #ackapa");
  //const buton = container.getElementById("acKapa");
  const body = container.getElementsByTagName("body")[0];

  buton.dispatchEvent(new dom.window.MouseEvent("click"));
  expect(body.classList.contains("dark")).toBe(true);
  buton.dispatchEvent(new dom.window.MouseEvent("click"));
  expect(body.classList.contains("dark")).toBe(false);
});
