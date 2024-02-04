//importing built-ins of node, no need to install just import and use. works without 'node:' also
import os from "node:os";

//importing external libraries
import express from "express";

//importing own created modules
import config from "./config";
import apiRouter from "./api-router";
import serverRender from "./render";

//console.log(express);
//console.log(config.PORT, config.HOST);

//express gives an api which we can use to create server object.
const server = express();

//To make express serve static assets, we add a middleware to express stack. Here serves all static assets under dist dir
//Express goes through all these layers(middleware) and checks valid request/not and serves.
server.use(express.static("dist"));

//To make express aware about ejs. viewengines allows us to render web pages using template files. Here ejs template file
server.set("view engine", "ejs");

server.use("/api", apiRouter);
//middleware to serve the home path request and respond
server.get(["/", "/contest/:contestId"], async (req, res) => {
  //res.send("Hello Express");

  const { initialMarkup, initialData } = await serverRender(req);
  //to render the index.ejs file
  res.render("index", {
    initialMarkup,
    initialData,
  });
});

//server listening on port 8080, localhost and executes an function on mount.
server.listen("8080", "localhost", () => {
  console.info(
    `Express server listening at ${config.SERVER_URL}\n`,
    `free memory available,${os.freemem()}`,
  );
});
