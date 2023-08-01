import query from "./db.js";

const driveUrl = process.env.DRIVE_URL;

const preparedStatements = {
  allFolders: {
    name: "get-all-folders",
    text: "SELECT DISTINCT folder FROM images",
    rowMode: "array",
  },
  previewData: {
    name: "get-folder-album-preview",
    text: `SELECT folder AS name, CONCAT('${driveUrl}', img_id) AS preview FROM images WHERE preview = true ORDER BY folder_order`,
  },
  allImages: {
    name: "get-all-images-data",
    text: `SELECT id, img_order, CONCAT('${driveUrl}', img_id) AS src, caption FROM images ORDER BY img_order`,
  },
};

const verifyPassword = async (password) => {
  const statement =
    "SELECT EXISTS (SELECT id FROM users WHERE name like 'Gast' AND password LIKE sha256($1::bytea))";
  const result = await query(statement, [`${password}`]);

  return result.rows?.length ? result.rows[0].exists : false;
};

const token = {
  insert: (tokenBase) => {
    const statement = "INSERT INTO tokens (token) VALUES (encode($1::bytea, 'hex'))";
    return query(statement, [`${tokenBase}`]);
  },
  concatWithPassword: async (randomWordFromToken) => {
    const statement = "SELECT CONCAT((SELECT password FROM users WHERE name LIKE 'Gast'), $1)";
    const { rows } = await query(statement, [`${randomWordFromToken}`]);
    if (rows.length) return rows[0].concat;
  },
  validate: async (randomWordFromToken) => {
    const concatenated = await token.concatWithPassword(randomWordFromToken);
    const statement = "SELECT * FROM tokens WHERE token LIKE encode($1::bytea, 'hex') AND expires_at > NOW()";
    const { rowCount: validTokenAvailable } = await query(statement, [`${concatenated}`]);
    return Boolean(validTokenAvailable);
  }
};

const getFolderData = {
  allFolders: async () => {
    const result = await query(preparedStatements.allFolders);
    return result.rows.map((arr) => arr[0]);
  },
  albumPreviews: () => {
    return query(preparedStatements.previewData);
  },
};

const getImageData = {
  all: () => {
    return query(preparedStatements.allImages);
  },
  byFolder: (folder) => {
    const statement =
      "SELECT id, img_order, CONCAT($1, img_id) AS src, caption FROM images WHERE folder LIKE $2";
    const params = [`${driveUrl}`, folder];
    return query(statement, params);
  },
};

export default { verifyPassword, token, getFolderData, getImageData };
