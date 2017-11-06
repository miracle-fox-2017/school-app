function scoreLetter(score) {
  if (score > 85) {
    return 'A';
  } else if (score > 70) {
    return 'B';
  } else if (score > 55) {
    return 'C';
  } else if (score > 0 && score <= 55) {
    return 'E';
  } else {
    return 'empty';
  }
}

module.exports = scoreLetter;
