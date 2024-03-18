function charCount(str) {
  // make object to return at end
  var result = {};
  // loop over string, for each character...
  for (var i = 0; i < str.length; i++) {
    var char = str[i].toLowerCase();
    // if the char is not a number/letter skip to nex letter
    if (!/^[a-z0-9]$/.test(char)) {
      continue;
    }
    // if the char is a key in object, add one to count
    if (result[char] > 0) {
      result[char]++;
    }
    // if the char is a number/letter AND not in object, add it to object and set value to 1
    else {
      result[char] = 1;
    }
  }
  // if character is something else (space, period, etc.) don't do anything
  // return object at end
  return result;
}

function refactoredCharCount(str) {
  const obj = {};
  for (let char of str) {
    if (isAlphaNumeric(char)) {
      char = char.toLowerCase();
      obj[char] = ++obj[char] || 1;
    }
  }
  return obj;
}

function isAlphaNumeric(char) {
  const asciiValue = char.charCodeAt();
  return (
    (asciiValue > 47 && asciiValue < 58) ||
    (asciiValue > 64 && asciiValue < 91) ||
    (asciiValue > 96 && asciiValue < 123)
  );
}
console.log(refactoredCharCount("Hello there im 123!@"));
