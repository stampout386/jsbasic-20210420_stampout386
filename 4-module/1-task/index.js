function makeFriendsList(friends) {
  const ul = document.createElement('ul');
  friends.forEach(({firstName, lastName}) => {
      let li = document.createElement('li');
      li.innerHTML = `${firstName} ${lastName}`;
      ul.append(li);
  });
  return ul;
}