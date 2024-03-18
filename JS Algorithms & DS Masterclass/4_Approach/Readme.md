Algorithm: A process or set of steps to accomplish a certain task

<h2>Problem solving strategy:</h2>

- Understand the problem
- Explore concrete examples
- Break it down
- Solve/Simplify
- Look back and refactor
- Test

<h4>Understand the problem</h4>

1. Can I restate the problem in my own words?
2. What are the inputs that go into the problem?
3. What are the outputs that should come from the solution to the problem?
4. Can the outputs be determined from the inputs? In other words, do I have enough information to solve the problem?

<h4>Explore concrete examples</h4>

1. Write a function which takes in a string and returns counts of each character in the string.
2. What about spaces? What if the input is a number?
3. What if the input is empty?
4. What if the input is not a string?
5. What if the input is a string with special characters?
6. What if the input is a string with upper and lower case characters?

<h4>Break it down</h4>

Explicitly write out the steps you need to take - Wite it in psudo code.

```
function charCount(str) {
  // make object to return at end
  var result = {};
  // loop over string, for each character...
  for (var i = 0; i < str.length; i++) {
    var char = str[i].toLowerCase();
    // if the char is a number/letter AND is a key in object, add one to count
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
```

<h4>Solve/Simplify</h4>

- Solve the problem. If you can't, solve a simpler problem.
- Find the core difficulty in what you're trying to do.
- Temporarily ignore that difficulty.
- Write a simplified solution.
- Then incorporate that difficulty back in.

<h4>Look back and refactor</h4>

- Can you check the result?
- Can you derive the result differently?
- Can you understand it at a glance?
- Can you use the result or method for some other problem?
- Can you improve the performance of your solution?
- Can you think of other ways to refactor?
- How have other people solved this problem?

See refactoredCharCount in script.js
