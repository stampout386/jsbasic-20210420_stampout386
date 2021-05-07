function highlight(table) {
  const tr = table.rows;

  for (let i = 1; i < tr.length; i++) {
      const td = tr[i].cells;
      
      
      if (td[3].hasAttribute('data-available')){
            td[3].dataset.available === 'false' ? tr[i].classList.add('unavailable') : tr[i].classList.add('available')
      } else {
          tr[i].setAttribute('hidden', false)
      };
        if(td[2].innerHTML === 'm') {
          tr[i].classList.add('male')}
        if(td[2].innerHTML === 'f') {
          tr[i].classList.add('female')
        };
        if(td[1].innerHTML < 18) {
          tr[i].style = "text-decoration: line-through"
      };
  }
}
