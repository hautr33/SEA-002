// 1. Write a function to format money string:
// Example: 10000000 => “10,000,000" || 123456 => “123,456" || 12000.02 => "12,000.02"

function formatMoneyString(money) {
  let moneyString = money.toString();

  let parts = moneyString.split('.');
  let integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (parts.length > 1) {
    return integerPart + '.' + parts[1];
  } else {
    return integerPart;
  }
}

const test = [10000000, 123456, 12000.02, 1234567890.12345, 0];
test.forEach((money) => {
  console.log(`Money format for ${money} is: ${formatMoneyString(money)}`);
});