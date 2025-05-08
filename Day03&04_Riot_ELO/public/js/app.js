function sendResult(win) {
    fetch('/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ win: win })
    })
      .then(res => res.json())
      .then(data => {
        document.getElementById('result').textContent = `MMR: ${data.mmr}, LP: ${data.lp}`;
      });
  }
  