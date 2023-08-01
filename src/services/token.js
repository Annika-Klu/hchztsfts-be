import axios from "axios";
import queries from "../db/queries.js";

const generateToken = async () => {
   const { data } = await axios.get("https://random-word-api.herokuapp.com/word?length=10");
   const [randomWord] = data;
   const token = await queries.token.concatWithPassword(randomWord);
   await queries.token.insert(token);
   return randomWord;
}

export default generateToken;