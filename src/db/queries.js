import query from "./db.js";

const preparedStatements = {
  allFolders: {
    name: "get-all-folders",
    text: "SELECT DISTINCT folder FROM images",
    rowMode: "array"
  },
  previewData: {
    name: "get-folder-album-preview",
    text: "SELECT folder AS name, img_id AS preview FROM images WHERE preview = true ORDER BY folder_order"
  },
  allImages: {
    name: "get-all-images-data",
    text: "SELECT id, img_order, img_id, caption FROM images ORDER BY img_order",
  }
};

const getFolderData = {
  allFolders: async () => {
    const result = await query(preparedStatements.allFolders);
    return result.rows.map(arr => arr[0]);
  },
  albumPreviews: () => {
    return query(preparedStatements.previewData);
  }
}

const getImageData = {
  all: () => {
    return query(preparedStatements.allImages);
  },
  byFolder: (folder) => {
    const statement =
      "SELECT id, img_order, img_id, caption FROM images WHERE folder LIKE $1";
    const params = [folder];
    return query(statement, params);
  },
};

export default { getFolderData, getImageData };
