const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function get(params) {
  const offset = helper.getOffset(params.page, config.listPerPage);
  const queryNLP = `WHERE MATCH(terjemah) AGAINST("${params.search}" IN NATURAL LANGUAGE MODE)`;
  const rows = await db.query(
    `SELECT * FROM sunan_tirmidzi ${
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
    `SELECT * FROM sunan_tirmidzi WHERE id=${id}`
  );

  const data = rows ? rows[0] : {};
  return data;
}

async function create(sunan_tirmidzi) {
  const result = await db.query(
    `INSERT INTO sunan_tirmidzi 
    (kitab, arab, terjemah) 
    VALUES 
    ('${sunan_tirmidzi.kitab}', '${sunan_tirmidzi.arab}', '${sunan_tirmidzi.terjemah}'`
  );

  let message = "Error in creating Sunan Tirmidzi ";

  if (result.affectedRows) {
    message = "Sunan Tirmidzi  created successfully";
  }

  return { message };
}

async function update(id, sunan_tirmidzi) {
  const result = await db.query(
    `UPDATE sunan_tirmidzi 
    SET kitab="${sunan_tirmidzi.kitab}", arab="${sunan_tirmidzi.arab}", terjemah="${sunan_tirmidzi.terjemah}"
    WHERE id=${id}`
  );

  let message = "Error in updating Sunan Tirmidzi";

  if (result.affectedRows) {
    message = "Sunan Tirmidzi updated successfully";
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(`DELETE FROM sunan_tirmidzi WHERE id=${id}`);

  let message = "Error in deleting Sunan Tirmidzi";

  if (result.affectedRows) {
    message = "Sunan Tirmidzi deleted successfully";
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
