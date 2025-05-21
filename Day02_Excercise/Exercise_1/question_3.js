// 3. Write the function to count how many words appear in a string (oneTwoThree => 3)

function countWordsInString(str) {
  const words = str.match(/[A-Z]?[a-z]+|[A-Z]+(?![a-z])/g);
  
  if (!words) {
    return 0;
  }
  
  return words.length;
}

const testStrings = ['oneTwoThree', 'helloWorld', 'JavaScriptIsAwesome', 'countWordsInString'];
testStrings.forEach((str) => {
  console.log(`The string "${str}" contains ${countWordsInString(str)} words.`);
});