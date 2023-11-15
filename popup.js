document.addEventListener('DOMContentLoaded', function () {
    const assignButton = document.getElementById('assign-button');
    const countdownSpan = document.getElementById('countdown');
    let countdownValue;
  
    const updateCountdown = () => {
      countdownSpan.textContent = formatTime(countdownValue);
    };
  
    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };
    const assignRandomQuestion = async () => {
        
        const jsonFileUrl = chrome.runtime.getURL('neetCode150.json');
        const response = await fetch(jsonFileUrl);
        const jsonData = await response.json();
       
    
          let randomIndex = Math.floor(Math.random() * jsonData.length)
          const randomProblem = jsonData[randomIndex]
          const randomProblemURL = randomProblem.href
    
        chrome.tabs.create({ url: randomProblemURL }, () => {
            resetCountdown();
          });
        resetCountdown();
      };
    assignButton.addEventListener('click', assignRandomQuestion);
    const startCountdown = () => {
      countdownValue = 3600;
      updateCountdown();
      const countdownInterval = setInterval(() => {
        countdownValue--;
        updateCountdown();
        if (countdownValue === 0) {
          clearInterval(countdownInterval);
        }
      }, 1000);
    };
    const resetCountdown = () => {
      startCountdown();
    };
    startCountdown();
  });
  