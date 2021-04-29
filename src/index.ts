import express, { Express } from "express";
import { AddressInfo } from "net";
import cors from "cors";

const app: Express = express();

app.use(express.json());
app.use(cors());
//app.use("/entity-name", entityRouter)

const server = app.listen(3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running at http://localhost:${address.port}`);
  } else {
    console.log(`Failure upon starting server.`);
  }
});
