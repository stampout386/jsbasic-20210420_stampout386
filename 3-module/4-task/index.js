function showSalary(users, ageIn){
  return users
  .filter(({age}) => age <= ageIn)
  .map(({name, balance}) => `${name}, ${balance}`)
  .join('\n');

}