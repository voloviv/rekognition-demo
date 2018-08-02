export default function checkFail(res, result) {

  // const r = result === undefined ? result : { error: 'Unknown'}

  if (typeof result.error === 'string' || typeof result.error === 'object') {
    res.status(400).send({ error: result.error });
    console.log(result.error);
    return true;
  }
  return false;
}
