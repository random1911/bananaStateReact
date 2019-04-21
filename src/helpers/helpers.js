export const generateDate = () => {
  const date = new Date();
  return Date.parse(date);
};
export const getPromise = (result, timeout = 0) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(result);
    }, timeout);
  });
};
export const isElementInsideParent = (targetNode, parentNode) => {
  if (targetNode === parentNode) {
    return true;
  }
  while (targetNode.parentElement && targetNode !== document.body) {
    targetNode = targetNode.parentElement;
    if (targetNode === parentNode) {
      return true;
    }
  }
  return false;
};
