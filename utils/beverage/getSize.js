function getSize(size) {
  switch (size) {
    case "large":
      return "4x";
    case "big":
      return "2x";
    case "small":
    default:
      return "1x";
  }
}

function getWidth(size) {
  switch (size) {
    case "large":
      return 880;
    case "big":
      return 440;
    case "small":
    default:
      return 220;
  }
}

module.exports = {
  getSize,
  getWidth,
};
