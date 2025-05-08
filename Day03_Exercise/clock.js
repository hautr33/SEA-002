const readline = require('readline');

function clearConsole() {
  // Xóa màn hình
  process.stdout.write('\x1Bc');
}

function getClockFace(hour, minute, second) {
  const face = [
    '-  -  -  -  -  -  -  -',
    '-  -  -  -  -  -  -  -',
    '-  -  -  -  -  -  -  -',
    '-  -  -  -  -  -  -  -',
    '-  -  -  -  -  -  -  -',
    '-  -  -  -  -  -  -  -',
    '-  -  -  -  -  -  -  -',
    '-  -  -  -  -  -  -  -',
  ]


  const centerLine = `🕒 ${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:${String(second).padStart(2, '0')}`;

  return [...face, centerLine];
}

function drawClock() {
  const now = new Date();
  const hour = now.getHours();
  const min = now.getMinutes();
  const sec = now.getSeconds();

  clearConsole();
  const face = getClockFace(hour % 12, min, sec);
  face.forEach(line => console.log(line));
}

// Cập nhật mỗi giây
setInterval(drawClock, 1000);
drawClock();
