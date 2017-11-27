function scoreToAbc(scoreObj){
  if(scoreObj > 85){
    return 'A'
  }
  else if(scoreObj > 70 && scoreObj <= 85){
    return 'B'
  }
  else if(scoreObj > 55 && scoreObj <= 70){
    return 'C'
  }
  else if(scoreObj > 30 && scoreObj <= 55){
    return 'D'
  }
  else{
    return null
  }
}

module.exports = scoreToAbc
