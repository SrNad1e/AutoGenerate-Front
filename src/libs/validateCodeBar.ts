export default (value: string) => {
  const valueArray = value.slice();
  let barcode = '';
  for (let i = 0; i < 13; i++) {
    if (i < valueArray.length) {
      barcode = `${barcode}${valueArray[i]}`;
    } else {
      barcode = `0${barcode}`;
    }
  }

  return barcode;
};
