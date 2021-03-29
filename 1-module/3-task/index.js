function ucFirst(str) {
  let b = '';
  if ( str === undefined){
      b += '';
      return b;
  } else {
      
      let a = str.split([]);
      for (let i = 0; i < a.length; i++) {
          
             if ( i === 0 ){
                 b += a[i].toUpperCase();
             } else {
                b += a[i];
             }
      }
  }
  return (b);
}
