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
  var finalOutput = "";
  nodupCode.forEach(function (current) {
    if (remainingLetters.indexOf(current) > -1) {
      remainingLetters = remainingLetters.replace(current, "");
    }
  });

  var storeCode = {};
  // moves the current code letter into an object
  nodupCode.forEach(function (current, index) {
    storeCode[index] = {
      current: current,
      letters: []
    }
  });

  
  var sortedLetters = storeLetters(allLetters, storeCode, remainingLetters);
  for (var i = 0; i < message.length; i++) {
     for (var findLetter in sortedLetters) {
        if (sortedLetters[findLetter].lead == message[i]) {
          finalOutput += sortedLetters[findLetter].lead + "1";
        } else if (sortedLetters[findLetter].letters.indexOf(message[i]) !== -1) {
          finalOutput += sortedLetters[findLetter].lead + (sortedLetters[findLetter].letters.indexOf(message[i]) + 2);
        }
     }
   }

  console.log(finalOutput)
  return finalOutput;
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
    var lastLetterAlpha = [];
    var lettersOrganized = {};

    for (var key in storeCode) {
      found = found + storeCode[key].current;
      found = found + storeCode[key].letters.join("")
      lettersOrganized[key] = {};

      if (storeCode[key].letters.length == 0) {
        lettersOrganized[key].letters = [];
        lettersOrganized[key].lead = storeCode[key].current;
      } else {
        lettersOrganized[key].lead = storeCode[key].letters.shift();
        storeCode[key].letters.push(storeCode[key].current);
        lettersOrganized[key].letters = storeCode[key].letters;
      }
    }

    // finds the last letters in every letter array in the object.

    for (var organizedLetterKey in lettersOrganized) {
      var lastLetter = lettersOrganized[organizedLetterKey].letters[lettersOrganized[organizedLetterKey].letters.length - 1];
      if (lastLetter !== undefined) {
        lastLetterAlpha.push(lettersOrganized[organizedLetterKey].letters[lettersOrganized[organizedLetterKey].letters.length - 1])
      } else {
        lastLetterAlpha.push(lettersOrganized[organizedLetterKey].lead);
      }
    }

    // moves the last letter to end of the array then get the last letter

    var lastFoundLetter = lastLetterAlpha.sort().join("");
    lastFoundLetter = lastFoundLetter[lastFoundLetter.length-1];

    // gets all the letters that weren't used
    var lostLetters = string.split("").filter(function (current) {
      return found.indexOf(current) == -1;
    });

  
    // looks in every letters array in the organized object and
    // finds the last letter
    for (var olk in lettersOrganized) {
      if (lettersOrganized[olk].letters.indexOf(lastFoundLetter) !== -1 || lettersOrganized[olk].lead.indexOf(lastFoundLetter) !== -1) {
        lostLetters.forEach(function (letter) {
          lettersOrganized[olk].letters.push(letter)
        })
      }
    }


    return lettersOrganized;
  }

  // stores the letters in the object
  code.forEach(function (currentLetter, index) {
    if ((string.indexOf(remain[0]) - string.indexOf(currentLetter)) == 1) {
      storeCode[index].letters.push(storeCode[index].current);
      storeCode[index].current = remain[0];
    } 
  });

  remain = remain.slice(1);

  return storeLetters(string, storeCode, remain);
}

// //"h1t8m1s1t1e1r1"
// hamsterMe("wgz", "xretdmjcbxubp"); // w2g12z6g14z5g7g4z4z3w2g15z3g10
// hamsterMe("hamster", "helpme"); // "h1e1h5m4m1e1" works
// hamsterMe("hhhhammmstteree", "hamster")  // "h1a1m1s1t1e1r1" works
// hamsterMe("hamster", "abcdefghijklmnopqrstuvwxyz") // "a1a2a3a4e1e2e3h1h2h3h4h5m1m2m3m4m5r1s1t1t2t3t4t5t6t7"); 
// hamsterMe("f", "abcdefghijklmnopqrstuvwxyz") // "f22f23f24f25f26f1f2f3f4f5f6f7f8f9f10f11f12f13f14f15f16f17f18f19f20f21", "One letter code ?"); works