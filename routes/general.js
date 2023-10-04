const express = require("express");
const router = express.Router();
const general = require("../services/general");

/* GET hadist. */
router.get("/hadist-popular", async function (req, res, next) {
  try {
    let params = {
      page: req.params.page,
    };
    res.json(await general.getPopularHadist(params));
  } catch (err) {
    console.error(`Error while getting Shahih Bukhari `, err.message);
    next(err);
  }
});

module.exports = router;
