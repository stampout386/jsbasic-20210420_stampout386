const tableDiagonal = document.querySelector('table');

function makeDiagonalRed(tableDiagonal) {

    for (let i = 0; i < tableDiagonal.rows.length; i++) {
        
        let row = tableDiagonal.rows[i];
        row.cells[i].style.backgroundColor = 'red';
        
    }
    
  }