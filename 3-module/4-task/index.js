function showSalary(users, age){
  return users
  .filter(item => item.age <= age )
  .map(item => `${item.name}, ${item.balance}`)
  .join('\n');

  // let filterAge = users.filter(item => item.age <= age );

  // return filterAge.map(item => `${item.name}, ${item.balance}`).join('\n'); // можно все одной строкой но это слишком длинно на мой взгляд
  

}