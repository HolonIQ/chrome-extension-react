export const capitalizeFirstLetter = (inputString: string) => {
  if (inputString === undefined || inputString == null) return;
  const _string = inputString?.charAt(0).toUpperCase() + inputString.slice(1);
  return _string;
};
