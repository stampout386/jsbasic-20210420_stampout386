function sumSalary(salaries) {
  let sumPay = 0;
  for (const key in salaries) {
      if (typeof salaries[key] === 'number' && isNaN(salaries[key]) === false && salaries[key] != Infinity && salaries[key] != -Infinity) {
             sumPay += salaries[key];
      }
  }
  return sumPay;
}
