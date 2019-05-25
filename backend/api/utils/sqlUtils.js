module.exports.parseRequestBodyToUpdateValues = reqBody => {
  let updateQuery = '';
  for (let key in reqBody) {
    if (reqBody.hasOwnProperty(key)) {
      const fieldValue = reqBody[key] === 'NULL' ? 'NULL' : `'${reqBody[key]}'`;
      updateQuery = updateQuery + key + '=' + fieldValue + ',';
    }
  }
  return updateQuery.slice(0, -1);
};
