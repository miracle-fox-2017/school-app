function konversiNilai(nilai) {
  if(nilai > 85){
    return 'A'
  }else if(nilai > 70){
    return 'B'
  }else if(nilai > 55){
    return 'C'
  }else if(nilai > 0){
    return 'E'
  }else if(nilai == null){
    return
  }
}

module.exports = konversiNilai
