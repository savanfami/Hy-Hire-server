// import { PORT } from "config/envConfig/config";
import * as server from "../src/presentation/server";
import { connectDB } from "./config/envConfig/config";
(async () => {
  try {
    server;
    await connectDB();
  } catch (error) {
    console.error("issues in running server", error);
    throw new Error("issues in running server");
  } finally {
    process.on("SIGINT", async () => {
      console.log("server shutting down");
      process.exit();
    });
  }
})();
