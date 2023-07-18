import queries from "../db/queries.js";

const validFolder = async (req, res, next) => {
    const { folder } = req.query;
    if (!folder) return res.status(404).json("Folder missing");

    const folders = await queries.getFolderData.allFolders();
    if (!folders.includes(folder)) return res.status(404).json("Invalid folder");

    next();
}

export default validFolder;