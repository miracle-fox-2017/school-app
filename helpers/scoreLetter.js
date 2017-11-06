module.exports = function (score) {

    // console.log(score.score, "Haloooooooooooooooooooooooooooooo")
    if (score.score) {
        if (score.score > 85) {
            return "A"
        } else if (score.score > 70) {
            return "B"
        } else if (score.score > 55) {
            return "C"
        } else if (score.score >= 0 && score.score <= 55) {
            return "E"
        }
    } else {
        return "Empty"
    }

}