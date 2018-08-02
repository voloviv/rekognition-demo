export default async function loadAuth(req) {
    if (req.jwt.valid) {
        // console.log('JWT Token is valid');
        return req.jwt.payload;
    }
    else {
        // console.log('JWT Token is NOT valid');
        return null;
    }
}
