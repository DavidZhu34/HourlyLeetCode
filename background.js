let timerId;

const assignRandomQuestion = async () => {
  const jsonFileUrl = chrome.runtime.getURL('neetCode150.json');
const response = await fetch(jsonFileUrl);
const jsonData = await response.json();
    let randomIndex = Math.floor(Math.random() * jsonData.length)
    const randomProblem = jsonData[randomIndex]
    const randomProblemURL = randomProblem.href

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.update(tabs[0].id, { url: randomProblemURL });
  });
};

const startTimer = () => {
  timerId = setTimeout(assignRandomQuestion, 3600000);
};

const resetTimer = () => {
  clearTimeout(timerId);
  startTimer();
};

chrome.tabs.onActivated.addListener(() => {
  resetTimer();
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'assignRandomQuestion') {
    assignRandomQuestion();
    resetTimer();
  }
});

startTimer();
