function factorial(n) {
    let numberFactorial = n;
    if (n === 0 || n === 1){
        return 1
    } 
    for( i = n; i > 1; i--) {

         numberFactorial = numberFactorial * (i-1);}

 return numberFactorial;
}

// или
// function factorial(n) {
//     let a = 1;
//     for(i = n; i > 1; i--){
//      a *= i;
//     }

//  return a;
// }