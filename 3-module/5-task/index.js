const REGEX = /[\s,]+/;

function getMinMax(str) {
  const strNumber = str.split(REGEX).filter(item => isFinite(item));
    
    return {
        min : Math.min(...strNumber),
        max : Math.max(...strNumber),
    }
}
