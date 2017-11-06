const score=(nilai)=>{
    if(nilai > 85){
        return "A";
    }else if(nilai > 70 && nilai <=85){
        return "B";
    }else if(nilai > 55 && nilai <=70){
        return "C";
    }else if(nilai <=55 && nilai !== null){
        return "D";
    }else if(nilai === "" || nilai === null){
        return "Empty";
    }
}

module.exports=score;
