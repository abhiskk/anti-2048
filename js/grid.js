function Grid(size) {
  this.size = size;

  this.cells = [];

  this.build();
}

// Build a grid of the specified size
Grid.prototype.build = function () {
  for (var x = 0; x < this.size; x++) {
    var row = this.cells[x] = [];

    for (var y = 0; y < this.size; y++) {
      row.push(null);
    }
  }
};

// Find the first available random position
Grid.prototype.randomAvailableCell = function () {
  var cells = this.availableCells();

  if (cells.length) {
    return cells[Math.floor(Math.random() * cells.length)];
  }
};

// Find the best position to insert a 2 tile
Grid.prototype.bestAvailaibleCell = function () {
  var cells = this.availableCells();
  var counts = [];

  //get a count of number of two's adjacent to each cell
  //generate the new cell where the number of two's are maximum

  var dx = [-1,1,0,0];
  var dy = [0,0,-1,1];

  for(var a=0;a<cells.length;a++)
  {
    var c = 0;
    var x = cells[a].x, y = cells[a].y;
    for(var i=0;i<4;i++)
    {
        if( x+dx[i] >= 0 && x+dx[i] < this.size && y+dy[i] >= 0 && y+dy[i] < this.size && this.cells[x+dx[i]][y+dy[i]] != null && this.cells[x+dx[i]][y+dy[i]].value == 2 )
        {
          c++;
        } 
    }
    counts.push(c);
  }

  if (cells.length) {
    var bestInd = 0;
    var maxC = counts[0];
    for(var i=1;i<cells.length;i++)
      if( counts[i] > maxC )
      {
        bestInd = i;
        maxC = counts[i];
      } 
    return cells[bestInd];
  }
}

Grid.prototype.availableCells = function () {
  var cells = [];

  this.eachCell(function (x, y, tile) {
    if (!tile) {
      cells.push({ x: x, y: y });
    }
  });

  return cells;
};

Grid.prototype.countCells = function () {
  var cells = [];
}

// Call callback for every cell
Grid.prototype.eachCell = function (callback) {
  for (var x = 0; x < this.size; x++) {
    for (var y = 0; y < this.size; y++) {
      callback(x, y, this.cells[x][y]);
    }
  }
};

// Check if there are any cells available
Grid.prototype.cellsAvailable = function () {
  return !!this.availableCells().length;
};

// Check if the specified cell is taken
Grid.prototype.cellAvailable = function (cell) {
  return !this.cellOccupied(cell);
};

Grid.prototype.cellOccupied = function (cell) {
  return !!this.cellContent(cell);
};

Grid.prototype.cellContent = function (cell) {
  if (this.withinBounds(cell)) {
    return this.cells[cell.x][cell.y];
  } else {
    return null;
  }
};

// Inserts a tile at its position
Grid.prototype.insertTile = function (tile) {
  this.cells[tile.x][tile.y] = tile;
};

Grid.prototype.removeTile = function (tile) {
  this.cells[tile.x][tile.y] = null;
};

Grid.prototype.withinBounds = function (position) {
  return position.x >= 0 && position.x < this.size &&
         position.y >= 0 && position.y < this.size;
};
