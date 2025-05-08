function updateMMR(mmr, lp, win, K = 30) {
    const opponent = mmr + Math.floor(Math.random() * 200 - 100);
    const expected = 1 / (1 + Math.pow(10, (opponent - mmr) / 400));
    const actual = win ? 1 : 0;
    const delta = Math.round(K * (actual - expected));
  
    mmr += delta;
    lp += win ? 20 : -15;
  
    if (lp >= 100) {
      lp = 0; // rank up
    } else if (lp < 0) {
      lp = 75; // rank down
    }
  
    return { mmr, lp };
  }
  
  module.exports = { updateMMR };
  