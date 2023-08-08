export default () => {
  const date = new Date(Date.now());

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const ms = date.getMilliseconds().toString().padStart(3, "0");

  return `[${hours}:${minutes}:${seconds}:${ms}]`;
};
