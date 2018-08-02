export default async function logout(req, res) {
    try {
        res.clearCookie(req.jwt.options.cookie);
    }
    catch (e) {
        throw `Error!`
    }

    return true;
}
