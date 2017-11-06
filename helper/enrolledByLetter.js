function ScoreByLetter(param) {
  param.SubjectWithStudents.forEach(subjectWithScore=>{
    if (subjectWithScore.score >= 85) {
      subjectWithScore.scoreLeter = 'A'
    }
    else if (subjectWithScore.score >70) {
      subjectWithScore.scoreLeter = 'B'
    }
    else if (subjectWithScore.score > 55) {
      subjectWithScore.scoreLeter = 'C'
    }
    else if (subjectWithScore.score <= 55 && subjectWithScore.score != null) {
      subjectWithScore.scoreLeter = 'D'
    }
    else {
      subjectWithScore.scoreLeter = 'Empty'
    }
  })
  // console.log(param);
  return param
}

module.exports = ScoreByLetter;
