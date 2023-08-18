export const NoDuplicate = (newval, table, currval)=>{
    for (let i = 0; i < table.length; i++) {
        if(table[i]){
            for(let j = 0; j < table[i].length ; j++){
                if(newval == table[i][j]){
                    if(currval){
                        return currval
                    }else{
                        return false
                    }
                }
            }
        }
    }
    
    return newval
}