function getMinMax(str) {
  let strNumber = str.split(/[\s,]+/).map(item => isFinite(item) ? item : '');
    
    return {
        min : Math.min(...strNumber),
        max : Math.max(...strNumber),
    }
}
