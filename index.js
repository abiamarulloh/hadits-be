const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const shahih_muslim = require("./routes/shahih_muslim");
const shahih_bukhari = require("./routes/shahih_bukhari");
const sunan_tirmidzi = require("./routes/sunan_tirmidzi");
const general_hadist = require("./routes/general");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/general", general_hadist);
app.use("/api/hadist/shahih-muslim", shahih_muslim);
app.use("/api/hadist/shahih-bukhari", shahih_bukhari);
app.use("/api/hadist/sunan-tirmidzi", sunan_tirmidzi);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
