decodeMorse = function(morseCode){
  return morseCode.split("   ").map(s => s.split(" ").map(c => MORSE_CODE[c]).join("")).join(" ").trim();
}


console.log(decodeMorse('.... . -.--   .--- ..- -.. .'));
