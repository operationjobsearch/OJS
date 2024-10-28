export const checkExists = (refObject: React.RefObject<any>[]) => {
  refObject.forEach((element) => {
    if (!element.current) return false;
  });

  return true;
};
