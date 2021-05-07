const validAmount = (amount1: number, amount2: number) => {
  //valid range error 1%
  if (Math.abs(amount1 - amount2) <= 1e7) {
    return true;
  } else {
    return false;
  }
};
export { validAmount };
