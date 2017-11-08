function scoreLetter(score) {
// Score > 85, A
// Score > 70, B
// Score > 55, C
// Score <= 55, E
// Tidak ada score, empty
  if (score > 85) {
    return 'A'
  } else if (score > 70) {
    return 'B'
  } else if (score > 55) {
    return 'C'
  } else if (score > 0 && score <= 55) {
    return 'E'
  } else {
    return 'empty'
  }
}
 module.exports = scoreLetter;
