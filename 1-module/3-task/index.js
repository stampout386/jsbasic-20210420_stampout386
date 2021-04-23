function ucFirst(str) {
  let resultStr = '';

  if (!str){
      return resultStr;
    }
 
  return str[0].toUpperCase() + str.slice( 1, str.length);
}
 