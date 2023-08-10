const calculateWPM = (totalEntries: number, time: number) => {
  const wpm = totalEntries / 5 / (countdownTime / 60);
  return wpm;
};
const updateWPMCounter = () => {
  const result = checkMatchingValues();
  const totalEntries = result.totalEntries;
  const wpmValue = calculateWPM(totalEntries, countdownTime);

  wpmElement.innerText = `WPM: ${Math.round(wpmValue)}`;
};
