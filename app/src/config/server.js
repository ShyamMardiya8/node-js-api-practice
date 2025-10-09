const cluster = require("cluster");
const os = require("node:os");
const app = require("../../..");
const { on } = require("node:events");

console.info("🚀 ~ cluster:", cluster);
if (cluster.isPrimary) {
  const numCPU = Math.max(1, os.cpus().length);
  for (let i = 0; i < numCPU; i++) cluster.fork();

  cluster.on("exit", (worker, code, signal) => {
    console.error(
      `worker ${worker.process.pid} died code ${code} Restarting....`
    );
  });
} else {
  app
    .then((module) => {
      const app = module.default || module.app || module;
      const port = 3000;
      app.listen(port, () =>
        console.log(`worker ${process.pid} started listening on ${port}`)
      );
    })
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
}
