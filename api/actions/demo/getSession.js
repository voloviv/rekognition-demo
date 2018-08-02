const uuidv1 = require('uuid/v1');

export default async function getSession(req, res) {
  res.jwt({
    sess: uuidv1()
  });
  return res.send({ status: 1 });
}
