function makeFriendsList(friends) {
  let ul = document.createElement('ul');
  friends.map(({firstName, lastName}) => {
      let li = document.createElement('li');
      li.innerHTML = `${firstName} ${lastName}`;
      ul.append(li);
  });
  return ul;
}