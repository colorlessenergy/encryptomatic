// https://www.codewars.com/kata/595ddfe2fc339d8a7d000089/train/javascript

// the task

/*
  write a function that takes two inputs a code and a message
  
  the code organize the messages by putting the letters in the message that comes
  after alphabetical in the code.

  if there are duplicates in the code or message take out the extra duplicates when the
  message is being organized

*/

// pseudo code

/*
  store the entire alphabet in a string

  in code and message clone and remove any duplicates

  make an object with the current letters in the code.
    in the object it will have the current letter
  
  when looking for which letter comes next
  
  check every letter in the message and check which distance is the shortest to
  the current code.

  if all letters arent used look for the letter closest to the end in the organized letters
  and add the rest of the letters to it.

*/


function hamsterMe(code, message) {
  var allLetters = "abcdefghijklmnopqrstuvwxyz";
  var remainingLetters = allLetters.slice(0);
  var nodupCode = removeDup(code);
  nodupCode.forEach(function (current) {
    if (remainingLetters.indexOf(current) > -1) {
      remainingLetters = remainingLetters.replace(current, "");
    }
  });

  console.log(remainingLetters);
  var storeCode = {};
  // moves the current code letter into an object
  nodupCode.forEach(function (current, index) {
    storeCode[index] = {
      current: current,
      letters: []
    }
  });

  
  var sortedLetters = storeLetters(allLetters, storeCode, remainingLetters);
  console.log(sortedLetters);

  return message;
}

function removeDup(arr) {
  return arr.split("").map(function (current, index) {
    if (arr.indexOf(current) === index) {
      return current;
    }
  }).filter(function (current) {
    return current !== undefined;
  });
}

function storeLetters(string, storeCode, remain) {
  // console.log(string, storeCode, remain, code);
  var code = [];
  for (var key in storeCode) {
    code.push(storeCode[key].current)
  }

  var storeCode = storeCode;

  if (remain.length == 0) {
    var found = "";
    var lettersOrganized = {};

    for (var key in storeCode) {
      found = found + storeCode[key].current;
      found = found + storeCode[key].letters.join("")
      lettersOrganized[key] = {}

      if (storeCode[key].letters.length == 0) {
        lettersOrganized[key].letters = [];
        lettersOrganized[key].lead = storeCode[key].current;
      } else {
        lettersOrganized[key].lead = storeCode[key].letters.shift();
        storeCode[key].letters.push(storeCode[key].current);
        lettersOrganized[key].letters = storeCode[key].letters;
      }
    } 

    var lostLetters = string.split("").filter(function (current) {
      console.log(found.indexOf(current) == -1, string, current)
      return found.indexOf(current) == -1;
    });
    console.log(lettersOrganized, lostLetters);
    
    return '';
  }

  code.forEach(function (currentLetter, index) {
    if ((string.indexOf(remain[0]) - string.indexOf(currentLetter)) == 1) {
      storeCode[index].letters.push(storeCode[index].current);
      storeCode[index].current = remain[0];
      return;
    } 
  });

  remain = remain.slice(1);

  storeLetters(string, storeCode, remain);
}

hamsterMe('hmster', 'hamster')