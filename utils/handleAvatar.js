const Jimp = require("jimp");

async function handleAvatar(path) {
  try {
    await Jimp.read(path).then((file) => {
      return file.resize(250, 250).write(path);
    });
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = handleAvatar;
