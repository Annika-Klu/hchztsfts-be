import axios from "axios";
import queries from "../db/queries.js";

const generateToken = async password => {
   const { data } = await axios.get("https://random-word-api.herokuapp.com/word?length=10");
   const [randomWord] = data;
   const tokenBase = `${password}${randomWord}`;
   const token = Buffer.from(tokenBase).toString("hex");
   await queries.token.insert(token);
   return randomWord;
}

export default generateToken;