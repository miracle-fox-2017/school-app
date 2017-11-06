function scoreToABC (obj){
  if(obj > 85){
    return 'A'
  }else if(obj > 70 && obj <= 85){
    return 'B'
  }else if(obj > 55 && obj <= 70){
    return 'C'
  }else if(obj > 30 && obj <= 55){
    return 'D'
  }else{
    return null
  }
}

module.exports = scoreToABC