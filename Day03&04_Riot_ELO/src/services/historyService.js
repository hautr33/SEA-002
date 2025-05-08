const History = require('../models/History');

const matchHistory = [];

/**
 * Lưu một trận đấu vào danh sách history
 * @param {Object} data - chứa thông tin trận đấu
 */
function logMatch(data) {
  const entry = new History(data);
  matchHistory.unshift(entry);
}

/**
 * Trả về danh sách lịch sử trận gần nhất
 * @param {number} limit - số lượng tối đa (mặc định 10)
 */
function getHistory(limit = 10) {
  return matchHistory.slice(0, limit);
}

module.exports = { logMatch, getHistory };
