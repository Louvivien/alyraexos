//nombre de dollars pour un eth
let ethToUsd = 100
//depot en eth
let ethDeposit = 2 
//valeur en dai
let daiCreation = 100

let minimumRatio = 1.5

//100 USD = 1 ETH
//CDP x : 2 eth en depot 100 DAI cree
//100 dai = 2ETH * 50
//50 dai = 1ETH * 50



//1. Collateralisation
    let collateralisation = (ethDeposit * ethToUsd) / daiCreation * 100
    console.log("le taux de collateralisation est de", collateralisation, "%")

// 2. quel est mon cours de liquidation
    //liquidation price => prix pour lequel le contrat sera liquide
    // le montant de depot ne suffit plus a rembourser

    //100usd = 100dai pour avoir 100dai, je dois deposer 150dai 
    //je peux les deposer en eth seulement
    //je dois deposer 150dai pour pouvoir avoir 100 dai

    let liquidationPrice = (daiCreation * minimumRatio)/ethDeposit
    console.log("le cours de liquidation est de", liquidationPrice, "$")

//3. ce contrat se fait liquider que se passe t il ?
    const tax = 0.13
    ethToUsd = liquidationPrice

    //let newDeposit = ethDeposit - daiCreation / ethToUsd

    let newDepositValue = ethDeposit * ethToUsd
    let newDeposit = newDepositValue - daiCreation + daiCreation * tax
    //150 - 100 +13
    console.log("", newDeposit,"dai")
    //on obtient des dai

    newEthDeposit = newDeposit / ethToUsd

    console.log("Votre nouveau depot est de ", newEthDeposit,"Eth")


//4. j'ai toujours mes DAI, quelle est ma perte nette en ETH ?

//let newEthValue = daiCreation / ethToUsd
//let totalEth = newEthValue + newEthvalue






















































