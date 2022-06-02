console.log('This is the background page.');
console.log('Put the background scripts here.');
chrome.action.onClicked.addListener(tab => {
    chrome.tabs.sendMessage(tab.id,"toggle");
    console.log('message sent');
  });