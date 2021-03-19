import pkg from "pg";
const { Pool } = pkg;

function Database(config) {
  this.pool = new Pool(config);
  this.query = function (sql, values) {
    return this.pool.query(sql, values);
  };
  this.insert = function (table, record) {
    const keys = Object.keys(record);
    const nums = new Array(keys.length);
    const data = new Array(keys.length);
    let i = 0;
    for (const key of keys) {
      data[i] = record[key];
      nums[i] = `$${++i}`;
    }
    const fields = keys.join(", ");
    const params = nums.join(", ");
    const sql = `INSERT INTO ${table} (${fields}) VALUES (${params})`;
    return this.query(sql, data);
  };

  this.select = async function (
    table,
    { sort, limit, offset },
    fields = ["*"],
    condition = null
  ) {
    const keys = fields.join(", ");
    const sql = `SELECT ${keys} FROM ${table}`;
    let whereClause = "";
    let args = [];
    let i = 1;
    if (condition) {
      whereClause = " WHERE " + condition;
    }
    const filters = [];
    if (sort) {
      filters.push("ORDER BY");
      const fields = sort.split(",");
      let count = fields.length;
      for (const field of fields) {
        const order = field.charAt(0) === "-" ? "DESC" : "ASC";
        filters.push(`${field.substring(1)} ${order}`);
        count--;
        if (count > 0) filters.push(",");
      }
    }
    if (limit) {
      filters.push(`LIMIT $${i++}`);
      args.push(limit);
    }
    if (offset) {
      filters.push(`OFFSET $${i++}`);
      args.push(offset);
    }
    const res = await this.query(sql + whereClause + filters.join(" "), args);
    return res.rows;
  };
}

export default Database;
