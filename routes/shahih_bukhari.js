const express = require("express");
const router = express.Router();
const shahih_bukhari = require("../services/shahih_bukhari");

/* GET hadist. */
router.get("/", async function (req, res, next) {
  try {
     let params = {
      page: req.query.page,
      search: req.query.search
    }
    res.json(await shahih_bukhari.get(params));
  } catch (err) {
    console.error(`Error while getting Shahih Bukhari `, err.message);
    next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    res.json(await shahih_bukhari.getDetailHadits(req.params.id));
  } catch (err) {
    console.error(`Error while getting Shahih Bukhari detail`, err.message);
    next(err);
  }
});

/* POST hadist */
router.post("/", async function (req, res, next) {
  try {
    res.json(await shahih_bukhari.create(req.body));
  } catch (err) {
    console.error(`Error while creating hadist`, err.message);
    next(err);
  }
});

/* PUT hadist */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await shahih_bukhari.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating hadist`, err.message);
    next(err);
  }
});

/* DELETE hadist */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await shahih_bukhari.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting hadist`, err.message);
    next(err);
  }
});

module.exports = router;
