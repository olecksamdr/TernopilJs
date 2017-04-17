function countWords(inputWords) {
  return inputWords.reduce((prevObj, current) => {
    if (prevObj[current])
      prevObj[current]++;
    else
      prevObj[current] = 1;

    return prevObj;
  }, {});
}

module.exports = countWords;
