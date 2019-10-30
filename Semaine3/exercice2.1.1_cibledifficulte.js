



function calculerDifficulte(target){
    original_target = "26959535291011309493156476344723991336010898738574164086137773096960"
    difficulte = original_target / target
    return difficulte
}
console.log(calculerDifficulte(1147152896345386682952518188670047452875537662186691235300769792000))

/*

Écrire une fonction qui convertit la cible en difficulté.



000000000000000000148edf0000000000000000000000000000000000000000

So if you want to add a candidate block to the blockchain, you must get one with a blockhash that is below this value.

 difficulty = original_target / target

 
 calculerDifficulte(1147152896345386682952518188670047452875537662186691235300769792000 -> 23,5

An example bits field looks like:
bits: “18163c71” or 0x18163c71. Essentially 8 characters or 4 bytes. (because 1 hex char = 4 bits which is a nibble so 2 hex chars represents 1 byte, you can figure out the rest!)

To convert this “bits” field which is in hex to target, again in hex, we follow this formula.

target = coefficient * 2^(8 * (exponent – 3))




*/