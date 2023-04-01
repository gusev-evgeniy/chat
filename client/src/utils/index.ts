const createHex = () => {
  var hexCode1 = "";
  var hexValues1 = "0123456789abcdef";
  
  for ( var i = 0; i < 6; i++ ) {
    hexCode1 += hexValues1.charAt(Math.floor(Math.random() * hexValues1.length));
  }
  return hexCode1;
}

export const generateGradient = () => {
  const deg = Math.floor(Math.random() *360);
  
  const gradient = "linear-gradient(" + deg + "deg, " + "#" + createHex() + ", " + "#" + createHex() +")";
  return gradient;
}