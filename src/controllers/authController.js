import queries from "../db/queries.js";
import generateToken from "../services/token.js";

const login = async (req, res) => {
  const { password } = req.body;
  try {
    const correctPassword = await queries.verifyPassword(password);
    if (!correctPassword) return res.status(401).json("Incorrect credentials.");
    const randomWordFromToken = await generateToken(password);
    res.status(200).json(randomWordFromToken);
  } catch (error) {
    const message = error.response ? error.response : error.message;
    console.error(message);
    res.status(error.response ? error.response.status : 500).json(message);
  }
};

export default { login };
