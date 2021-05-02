const validAmount = (amount1: number, amount2: number) => {
  //valid range error 0.01%
  if (Math.abs(amount1 - amount2) <= 1e5) {
    return true;
  } else {
    return false;
  }
};
export { validAmount };
