import queries from "../db/queries.js";

const getFolderData = async (req, res) => {
  try {
    const { rows } = await queries.getFolderData.albumPreviews();
    if (!rows.length) return res.status(404).json("No data available.")
    res.status(200).send(rows);
  } catch (error) {
    const message = error.response ? error.response : error.message;
    console.error(message);
    res.status(error.response ? error.response.status : 500).json(message);
  }
};

const getImageData = async (req, res) => {
  const { folder } = req.query;
  try {
    const { rows } = await queries.getImageData.byFolder(folder);
    if (!rows.length) return res.status(404).json("No image data available");
    res.status(200).json(rows);
  } catch (error) {
    const message = error.response ? error.response : error.message;
    console.error(message);
    res.status(error.response ? error.response.status : 500).json(message);
  }
};

export default { getFolderData, getImageData };
