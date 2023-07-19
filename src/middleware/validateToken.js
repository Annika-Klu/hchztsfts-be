import queries from "../db/queries.js";

const validateToken = async (req, res, next) => {
    const isAuthRoute = req.originalUrl.includes("auth");
    const randomWordFromToken = req.headers["hchztsfts-token"];
    const validTokenAvailable = await queries.token.validate(randomWordFromToken);
    if (!validTokenAvailable && !isAuthRoute) return res.status(401).json("Incorrect credentials.");
    if (validTokenAvailable && isAuthRoute) return res.status(202).json("Still logged in");
    next();
}

export default validateToken;