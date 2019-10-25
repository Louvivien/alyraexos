/*Écrire un programme qui convertisse un nombre décimal en sa version hexadécimal little endian et hexadécimal big endian sans avoir recours aux fonctions de conversion du langage utilisé

conversion(466321)
466321  → 0x 07 1d 91 (big endian)
    → 0x 91 1d 07 (little endian)
    
    a finir
    
    */
    
    function convertDeciToHexa(h){
        hexa = h.toString(16)
        if (h.lenght % 2 == 1){
            hexa = '0' + hexa

        }
        return hexa;
        
        }

function big endian(h){{
        xxxx

        }
        return bigendian;
        
        }


        function convertHexaLittleEndianToHexa(h){
            if (h.length %2 ==1){
                h = '0' +h
            }
            let retour = ""
            for (var i = 0; i < h.length-1; i+=2){
                retour = h[i] + h[i+1]+ retour
            }
            return retour
        }

    


    console.log(convertDeciToHexa(466321))


