export function isNumeric(n:any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }


  export const getNumericVal = (val:any)=>{
     return  isNumeric(val)?parseFloat( Number(val ).toFixed(2)):0
  }