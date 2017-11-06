function scoring(num){
  if(num>85){
    return 'A'
  } else if (num> 70) {
    return 'B'
  } else if (num> 55) {
    return 'C'
  } else if (num>0 && num<= 55) {
    return 'E'
  } else if (num== null) {
    return 'EMPTY'
  } else {
    return 'err'
  }
}

// console.log(scoring())


module.exports = scoring;