const Jimp = require("jimp");

const handleAvatar = async (path) => {
  try {
    await Jimp.read(path).then((file) => {
      return file.resize(250, 250).write(`${file}`);
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = handleAvatar;
