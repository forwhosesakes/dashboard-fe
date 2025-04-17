export function isNumeric(n:any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }


  export const getNumericVal = (val:any,d=2)=>{
     return  isNumeric(val)?parseFloat( Number(val ).toFixed(d)):0
  }