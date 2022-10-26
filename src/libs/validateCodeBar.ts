export default (value: string) => {
  const valueInt = parseInt(value);
  if (value.length < 12 || isNaN(valueInt)) {
    return value;
  } else {
    if (isNaN(valueInt)) {
      return value;
    }
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
  }
};
