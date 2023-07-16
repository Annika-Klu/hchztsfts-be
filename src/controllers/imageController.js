const allImages = async (req, res) => {
  try {
    res.status(200).json("All images");
  } catch (error) {
    console.error(error.response ? error.response : error.message);
    res.status(error.response ? error.response.status : 500);
  }
};

export default { allImages };
