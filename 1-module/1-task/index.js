function factorial(n) {
    let a = n;
    if (n === 0 || n === 1){
        return 1
    } else {
    for(i = n; i > 1; i--){
     a = a*(i-1);
    }
}
 return a;
}

// или
// function factorial(n) {
//     let a = 1;
//     for(i = n; i > 1; i--){
//      a *= i;
//     }

//  return a;
// }