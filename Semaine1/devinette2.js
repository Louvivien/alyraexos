const readline = require('readline')
let solution = Math.round(Math.random()*100+1);
const rli = readline.createInterface({
 input: process.stdin,
 output: process.stdout
})
console.log("Devinez le nombre entre 1 et 100")
rli.on('line', (userinput) => {
 if (userinput < solution){
 console.log("C'est plus que ", userinput)
 } else if (userinput > solution){
 console.log("C'est moins que ", userinput)
 } else if (userinput == solution){
 rli.close()
 console.log("Vous avez gagné!")
 } else {
 console.log("Entrée illisible")
 }
})



