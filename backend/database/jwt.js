import jwt from "jsonwebtoken";

export const authorization = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, process.env.JWTSECRET);
        req.id = data.id;
        req.email = data.email;
        return next();
    } catch {
        return res.sendStatus(403);
    }
};