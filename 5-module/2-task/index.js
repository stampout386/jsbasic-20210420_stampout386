function toggleText() {
  const button = document.querySelector('.toggle-text-button');
  const removeDiv = document.querySelector('#text');
  
  button.addEventListener('click', () => {
      if (removeDiv.hasAttribute('hidden')) {
          removeDiv.removeAttribute('hidden');
      } else {
           removeDiv.setAttribute('hidden', true);
      }
  })

}

