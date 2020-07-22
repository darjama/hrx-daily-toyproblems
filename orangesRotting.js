
var orangesRotting = function(grid) {
    let rottens = [];
    let freshCount = 0;
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {
        if (grid[y][x] === 1) freshCount ++;
        if (grid[y][x] === 2) rottens.push([y,x]);
      }
    }
    if (!freshCount) return 0;
    let days = 0;
    while(rottens.length && freshCount) {
      let newRottens = [];
      for (let rotten of rottens) {
        const [y, x] = rotten;
        newRottens = [...newRottens, ...dailyRot(y,x,grid)];
      }
      rottens = newRottens;
      freshCount -= newRottens.length;
      days ++;
    }
    if (freshCount) return -1;
    return days;
};

var dailyRot = function(y,x, grid) {
  let result  = []
  const cells = [[y-1,x],[y,x-1],[y+1,x],[y,x+1]]
  cells.forEach(a => {
    const c = a[0], r = a[1];
    if (c >= 0 && r >= 0 && c < grid.length && r < grid[0].length ) {
          if (grid[c][r] === 1) {
      grid[c][r] = 2;
      result.push([c,r]);
          }
    }
                   })
  return result;
}

/**
 * 994. Rotting Oranges
 * In a given grid, each cell can have one of three values:
 * 
 * the value 0 representing an empty cell;
 * the value 1 representing a fresh orange;
 * the value 2 representing a rotten orange.
 * Every minute, any fresh orange that is adjacent (4-directionally) to a rotten orange becomes rotten.
 * 
 * Return the minimum number of minutes that must elapse until no cell has a fresh orange.  If this is impossible, return -1 instead.
 * 
 * Example 1:
 * Input: [[2,1,1],[1,1,0],[0,1,1]]
 * Output: 4
 * 
 * Example 2:
 * Input: [[2,1,1],[0,1,1],[1,0,1]]
 * Output: -1
 * Explanation:  The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.
 * 
 * Example 3:
 * Input: [[0,2]]
 * Output: 0
 * Explanation:  Since there are already no fresh oranges at minute 0, the answer is just 0.
 * 
 * Note:
 * 1 <= grid.length <= 10
 * 1 <= grid[0].length <= 10
 * grid[i][j] is only 0, 1, or 2.
 * @param {number[][]} grid
 * @return {number}
 */
