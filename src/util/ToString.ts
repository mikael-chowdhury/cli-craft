export default (obj: any): string => {
  let finalString = "";
  if (typeof obj == "string") {
    finalString = obj;
  } else if (typeof obj == "object") {
    finalString = JSON.stringify(obj, null, 4);
  }

  return finalString;
};
