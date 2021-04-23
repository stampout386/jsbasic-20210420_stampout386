function ucFirst(str) {
  let resultStr = '';

  if ( str === undefined){
      return resultStr;
    }
 
  return str.slice(0,1).toUpperCase() + str.slice( 1, str.length);
}
 