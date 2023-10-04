const express = require("express");
const router = express.Router();
const sunan_tirmidzi = require("../services/sunan_tirmidzi");

/* GET hadist. */
router.get("/", async function (req, res, next) {
  try {
    let params = {
      page: req.query.page,
      search: req.query.search
    }
    res.json(await sunan_tirmidzi.get(params));
  } catch (err) {
    console.error(`Error while getting Sunan Tirmidzi `, err.message);
    next(err);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    res.json(await sunan_tirmidzi.getDetailHadits(req.params.id));
  } catch (err) {
    console.error(`Error while getting Sunan Tirmidzi detail`, err.message);
    next(err);
  }
});

/* POST hadist */
router.post("/", async function (req, res, next) {
  try {
    res.json(await sunan_tirmidzi.create(req.body));
  } catch (err) {
    console.error(`Error while creating hadist`, err.message);
    next(err);
  }
});

/* PUT hadist */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await sunan_tirmidzi.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating hadist`, err.message);
    next(err);
  }
});

/* DELETE hadist */
router.delete("/:id", async function (req, res, next) {
  try {
    res.json(await sunan_tirmidzi.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting hadist`, err.message);
    next(err);
  }
});

module.exports = router;
