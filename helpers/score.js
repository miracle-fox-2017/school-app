function score(Obj) {
	// body...
	if(Obj.score > 85) {
		return  "A";
	}
	if(Obj.score > 70 && Obj.score <=85) {
		return  "B";
	}
	if(Obj.score > 55 && Obj.score <=70) {
		return  "C";
	}
	if(Obj.score <= 55 && Obj.score !== null) {
		return "E";
	}
	if(Obj.score == '' || Obj.score == null) {
		return "empty";
	}					
}

module.exports = score;