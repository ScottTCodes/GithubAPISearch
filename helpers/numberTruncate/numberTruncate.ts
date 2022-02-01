import numeral from 'numeral';

const numberTruncate = (number: number) => {
  if (number >= 1000) {
    return numeral(number).format('0.0a');
  }

  return number;
};

export default numberTruncate;
