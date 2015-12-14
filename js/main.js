class MatrixFiller {
  constructor() {
    this.size = 7; 
  }
  
  /**
  * Fill from left upper corner to right, to bottom,
  * to left and to up, etc.
  */
  fillBySpiralInside() {
    var direction = 'right';
    var minX = 0;
    var minY = 0;
    var maxX = this.size - 1;
    var maxY = this.size - 1;
    var currentX = 0;
    var currentY = 0;

    function changeDirection() {
      switch (direction) {
        case 'right':
          direction = 'down';
          minY++;
          break;
        case 'down':
          direction = 'left';
          maxX--;
          break;
        case 'left':
          direction = 'up';
          maxY--;
          break;
        case 'up':
          direction = 'right';
          minX++;
          break;
      }
    }

    for (let i = 0, max = Math.pow(this.size, 2); i < max; i++) {
      (function(x, y, index) {
        setTimeout(function() {
          this.highlightMatrixItem(x, y);
          let middle = Math.floor(this.size / 2);
          if (x === middle && y === middle)
            this.highlightFillingFinish(x, y);
        }.bind(this), 100 * index);
      }.call(this, currentX, currentY, i));
      
      switch (direction) {
        case 'right':
          currentX++;
          if (currentX > maxX - 1) {
            changeDirection();
          }
          break;
        case 'down':
          currentY++;
          if (currentY > maxY - 1) {
            changeDirection();
          }
          break;
        case 'left':
          currentX--;
          if (currentX < minX + 1) {
            changeDirection();
          }
          break;
        case 'up':
          currentY--;
          if (currentY < minY + 1) {
            changeDirection();
          }
          break;
      }
    }
  };
  
  highlightMatrixItem(x, y) {
    var matrixItem = document.querySelector(`.matrix__item[data-x="${x}"][data-y="${y}"]`);
    if (matrixItem)
      matrixItem.className += ' matrix__item--highlighted';
  }
  
  highlightFillingFinish(x, y) {
    var lastMatrixItem = document.querySelector(`.matrix__item[data-x="${x}"][data-y="${y}"]`);
    if (lastMatrixItem)
      lastMatrixItem.className += ' matrix__item--last';
  }
}

var filler = new MatrixFiller();
filler.fillBySpiralInside();
