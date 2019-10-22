

function hexToDec(hex){
    var result = 0, digitValue;
    hex = hex.toLowerCase();
    for(var i = 0; i < hex.length; i++){
        digitValue = '0123456789abcdefgh'.indexOf(hex[i]);
        result = result * 16 + digitValue;

    }
    return result;
    
}

console.log(hexToDec('C921'))


/*function convertHexaToDecimal(h){
    decimal = parseInt(h,16)
    return decimal
}
console.log(convertHexaToDecimal('C921'))
*/