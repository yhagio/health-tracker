// Display an error message to user
module.exports = {
  displayErrorToUser: function(targetDOM, errorMessage, duration) {
    // Create a message and display it
    var pTag = document.createElement("p");
    pTag.setAttribute("class", "errorMessage");
    pTag.innerHTML = errorMessage;
    targetDOM.appendChild(pTag);

    // remove the message after 'duration' seconds
    setTimeout(function() {
      while (targetDOM.firstChild) {
        targetDOM.removeChild(targetDOM.firstChild);
      }
    }, duration);
  }
}
