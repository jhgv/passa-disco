/**
 * This method takes an object with the fields and values to be
 * updated and convert into the SQL statement part for these fields.
 *
 * Example: For {a: 1, b: 2, c: 3} the output will be 'a='1',b='2',c='3'
 *
 * @alias namespace~doStuff
 */
module.exports.parseRequestBodyToUpdateValues = reqBody => {
  let updateQuery = '';
  for (let key in reqBody) {
    if (reqBody.hasOwnProperty(key)) {
      const fieldValue = reqBody[key] === 'NULL' ? 'NULL' : `'${reqBody[key]}'`;
      updateQuery = updateQuery + key + '=' + fieldValue + ',';
    }
  }
  // Remove the last comma from the string
  return updateQuery.slice(0, -1);
};
