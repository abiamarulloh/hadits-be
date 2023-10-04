const express = require("express");
const router = express.Router();
const shahih_muslim = require("../services/shahih_muslim");


/* GET hadist. */
router.get("/", async function (req, res, next) {
  try {
    let params = {
      page: req.query.page,
      search: req.query.search
    }
    res.json(await shahih_muslim.get(params));
  } catch (err) {
    console.error(`Error while getting Shahih Muslim `, err.message);
    next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    res.json(await shahih_muslim.getDetailHadits(req.params.id));
  } catch (err) {
    console.error(`Error while getting Shahih Muslim detail`, err.message);
    next(err);
  }
});

/* POST hadist */
router.post("/", async function (req, res, next) {
  try {
    res.json(await shahih_muslim.create(req.body));
  } catch (err) {
    console.error(`Error while creating hadist`, err.message);
    next(err);
  }
});

/* PUT hadist */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await shahih_muslim.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating hadist`, err.message);
    next(err);
  }
});

/* DELETE hadist */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await shahih_muslim.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting hadist`, err.message);
    next(err);
  }
});

module.exports = router;
