function scoreNilai(setNilai) {

    if (setNilai > 85) {
        return 'A';
    } else if (setNilai >= 70 && setNilai <= 85) {
        return 'B';
    } else if (setNilai <= 69 && setNilai > 55) {
        return 'C';
    } else if (setNilai <= 55 && setNilai !== null) {
        return 'E';
    } else {
        return 'empty';
    }

}

module.exports = scoreNilai;