
//C 9 2 1   voir la solution hexatodec.js



h = "C921"




function isHex(h) {
    var a = parseInt(h,16);
    return (a.toString(16) ===h.toLowerCase())
    }
    
function val(charactere){
    hexa =[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']
    return hexa.indexOf(charactere)
}


function convert(h){
    //D’abord on verifie que ce sont bien des caracteres hexadecimaux
     if (isHex(h))
            long = h.length-1
            puissance = 0
            total = 0
            sum = 0
         //Pour chaque caractere on va verifier si cest un chiffre ou une lettre
        
        for (let j = h.length-1; j >= 0; j--) {
            const i = h[j];
            
            console.log(i)

            //Pour chaque caractere on va verifier si cest un chiffre ou une lettre

            

            /*total = i * 16 ** puissance
            

            long -= 1
            puissance += 0
            sum += total
*/
            
            }

        return sum
        }

console.log(convert(h))


  

//

/*
Caractere de la fin * 16^0
Caractere de la fin - 1 * 16^1
-=     *16^
*/