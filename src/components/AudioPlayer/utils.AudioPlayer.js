const formatNumber = new Intl.NumberFormat(
  {},
  {
    minimumIntegerDigits: 2,
    maximumFractionDigits: 0
  }
).format;

export const formatTime = time => {
  const min = formatNumber(Math.floor(time / 60));
  const sec = formatNumber(time % 60);

  return `${min}:${sec}`;
};
