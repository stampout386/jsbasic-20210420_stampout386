function sumSalary(salaries) {
  let sumPay = 0;
  for (const key in salaries) {
      if (isFinite(salaries[key])) {
             sumPay += salaries[key];
      }
  }
  return sumPay;
}
