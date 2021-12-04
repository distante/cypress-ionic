import liveServer from "@compodoc/live-server";

liveServer.start({
  file: "index.html",
  root: "./html", 
  ignore: "src,cypress",
  mount: [["/node_modules", "./node_modules"]]
});