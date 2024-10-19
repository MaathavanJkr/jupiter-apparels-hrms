import cors from "cors";
import config from "./config/config";
import app from "./app";

app.use(cors());

const port = config.port;
app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
