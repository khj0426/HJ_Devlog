const isNotEmptyStr = (str: string) => {
  return typeof str === 'string' && str.length > 0;
};

export default isNotEmptyStr;
