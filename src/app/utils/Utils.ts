export class Utils {
  /**
   * Shuffles an array in place.
   * @param array
   */
  static shuffleArray(array: Array<string>) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
}