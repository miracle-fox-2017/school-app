

function getScore(nilai){
  if(nilai >= 85){
    return 'A';
  }
  else if(nilai >= 70){
    return 'B';
  }
  else if(nilai >= 55){
    return 'C';
  }
  else{
    return 'Empty';
  }
}

module.exports = getScore
