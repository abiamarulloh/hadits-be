const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function get(params) {
  const offset = helper.getOffset(params.page, config.listPerPage);
  const queryNLP = `WHERE MATCH(terjemah) AGAINST("${params.search}" IN NATURAL LANGUAGE MODE)`;
  const rows = await db.query(
    `SELECT * FROM shahih_muslim ${
      params.search ? queryNLP : ""
    } LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page: params.page };

  return {
    data,
    meta,
  };
}

async function getDetailHadits(id) {
  const rows = await db.query(
    `SELECT * FROM shahih_muslim WHERE id=${id}`
  );
  const data = rows ? rows[0] : {};
  return data;
}

async function create(shahih_muslim) {
  const result = await db.query(
    `INSERT INTO shahih_muslim(kitab, arab, terjemah) VALUES('${shahih_muslim.kitab}', '${shahih_muslim.arab}', '${shahih_muslim.terjemah}')`
  );

  let message = "Error in creating Shahih Muslim ";
  if (result.affectedRows) {
    message = "Shahih Muslim  created successfully";
  }

  return { message };
}

async function update(id, shahih_muslim) {
  const result = await db.query(
    `UPDATE shahih_muslim 
    SET kitab="${shahih_muslim.kitab}", arab="${shahih_muslim.arab}", terjemah="${shahih_muslim.terjemah}"
    WHERE id=${id}`
  );

  let message = "Error in updating Shahih Muslim";

  if (result.affectedRows) {
    message = "Shahih Muslim updated successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(`DELETE FROM shahih_muslim WHERE id=${id}`);

  let message = "Error in deleting Shahih Muslim";

  if (result.affectedRows) {
    message = "Shahih Muslim deleted successfully";
  }

  return { message };
}

module.exports = {
  get,
  getDetailHadits,
  create,
  update,
  remove,
};
