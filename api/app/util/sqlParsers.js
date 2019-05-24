module.exports.parseRequestBodyToUpdateValues = reqBody => {
  let updateQuery = '';
  for (let key in reqBody) {
    if (reqBody.hasOwnProperty(key)) {
      updateQuery = updateQuery + key + "='" + reqBody[key] + "',";
    }
  }
  return updateQuery.slice(0, -1);
};
