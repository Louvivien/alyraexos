const readline = require('readline')
const rli = readline.createInterface({
 input: process.stdin,
 output: process.stdout
})
let solution = 0
rli.on('line', (userinput) => {
    console.log("Vous avez entré:", userinput)
if (userinput == solution){
 rli.close()
}})



