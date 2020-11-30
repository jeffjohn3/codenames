import { words } from "@/consts/words";
import _ from "lodash";

export const generateWords = () => {
  const wordsSubset = _.sampleSize(words, 25);
  const wordList = wordsSubset.map((word, index) => {
    let color;
    const i = parseInt(index);
    if (i == 0) {
      color = "BLACK";
    } else if (i < 10) {
      color = "BLUE";
    } else if (i < 18) {
      color = "RED";
    } else {
      color = "BEIGE";
    }
    return {
      word: word,
      color: color,
      flipped: false,
    };
  });
  return _.shuffle(wordList);
};
