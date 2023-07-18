import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
   connectionString: process.env.PG_URL
});

pool.on("error", (error, client) => {
   console.error("Unexpected error on idle client", error)
   throw Error(`DB pool error: ${JSON.stringify(error)}`)
});

const dataTypeIds = new Map([
    ["int8", 20]
])
pkg.types.setTypeParser(dataTypeIds.get("int8"), function (val) { return parseInt(val); });

const query = (statement, params) => {
   return new Promise(async function (resolve, reject) {
      const client = await pool.connect();
      client.query(statement, params, function (err, result) {
        if (err) {
         client.release();
          reject(err);
          return;
        }
        client.release();
        resolve(result);
      });
   });
}

export default query;
