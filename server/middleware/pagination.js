// import db connection
const connection = require("../db/connection");

function paginatedData(req, res) {
  // limit as 20
  const limit = parseInt(req.params.limit);

  // page number
  const page = parseInt(req.query.page);
  // calculate offset
  const offset = (page - 1) * limit;
  // query for fetching data with page number and offset
  const prodsQuery =
    "select * from Patients limit " + limit + " OFFSET " + offset;
  connection.getConnection(function (err, connection) {
    connection.query(prodsQuery, function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();
      if (error) throw error;
      // create payload
      var jsonResult = {
        products_page_count: results.length,
        page_number: page,
        products: results,
      };
      // create response
      var myJsonString = JSON.parse(JSON.stringify(jsonResult));
      res.statusMessage = "Products for page " + page;
      res.statusCode = 200;
      res.json(myJsonString);
      res.end();
    });
  });
}

module.exports = paginatedData;
