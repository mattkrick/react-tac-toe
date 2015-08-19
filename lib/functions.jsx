getCardinality = function(i) {
  //Shhhhh, shhhhhhhhhhhh. Don't try to understand.
  i = i - ((i >> 1) & 0x55555555);
  i = (i & 0x33333333) + ((i >> 2) & 0x33333333);
  return (((i + (i >> 4)) & 0x0F0F0F0F) * 0x01010101) >> 24;
};

t = function(str) {
  var arr = str.match(/.{1,7}/g);
  var str2 = '';
  for (var i = 0; i < arr.length; i++) {
    str2 += String.fromCharCode(parseInt(arr[i],2));
  }
  return str2;
};

player1Turn = function(i) {
  return (getCardinality(i) & 1) === 0;
};

checkForWinner = function (gameState) {
  //make a base mask for each type of win, move it across each row,col, AND it to remove all other moves, see if sum ==3
  const rowMask = parseInt('111', 2);
  const colMask = parseInt('1001001', 2);
  const lrDiagMask = parseInt('100010001', 2);
  const rlDiagMask = parseInt('001010100', 2);
  for (var x = 0; x <= 9; x += 9) {
    let winner = (x === 0) ? 'player1' : 'player2';
    for (let r = 0; r <= 6; r += 3) {
      if (getCardinality((rowMask << r + x & gameState)) === 3) {
        return winner;
      }
    }
    for (let r = 0; r < 3; r++) {
      if (getCardinality((colMask << r + x & gameState)) === 3) {
        return winner;
      }
    }
    if (getCardinality((lrDiagMask << x & gameState)) === 3) {
      return winner;
    }
    if (getCardinality((rlDiagMask << x & gameState)) === 3) {
      return winner;
    }
  }
};

