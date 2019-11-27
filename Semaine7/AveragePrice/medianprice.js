
const Uniswap = require('./etheruniswaprice.js')
const Dao = require('./ethermakerdaoprice.js')



async function getAverage () {

    let value1 = await Dao.ReadMedianizer()
    let value2 = await Uniswap.priceInwei()

getAverage().then((result) => { 
    console,log(result)
})