export const useFormatCardNumber = (str: string) => {
  return str.replace(/(\d{4})(?=\d)/g, "$1-");
};
