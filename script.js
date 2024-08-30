const commandInput = document.getElementById("commandInput");
const outputDiv = document.querySelector(".output");

const commands = {
    help: `Available Commands:\nwhoami: Tells you who are you\nsign-in: Redirects you to the login page\nsign-out: Sign out the current user\nget-location: Gets your current location\nclear: clears out everything on screen!`,
    whoami: "You are a guest user.",
    "sign-in": "Redirecting to the login page...",
    "sign-out": "You have signed out.",
    "get-location": "Fetching your current location...",
    clear: "",
};

commandInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const input = commandInput.value.trim().toLowerCase();
        let outputText;

        if (commands[input]) {
            outputText = commands[input];
        } else {
            outputText = `${input}: command not found`;
        }

        if (input === "clear") {
            outputDiv.textContent = `<br>`;
        } else {
            outputDiv.innerHTML += `$ saurabhdamale-dev >> ${input}<br>${outputText}<br><br>`;
        }

        if (input === "sign-in") {
            setTimeout(() => {
                location.href = "./signin.html";
            }, 5000);
        }

        // Firstly need to check if user is signed in or not
        if (input === "sign-out") {
            setTimeout(() => {
                location.href = "./login.html";
            }, 5000);
        }

        // Get users live location
        if (input === "get-location") {
            // Check if Geolocation is supported
            if ("geolocation" in navigator) {
                navigator.geolocation.watchPosition(
                    successCallback,
                    errorCallback,
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0,
                    }
                );
            } else {
                outputDiv.innerHTML += `Geolocation is not supported by your browser.<br>`;
            }

            // Success callback function
            function successCallback(position) {
                outputDiv.innerHTML += `Location found! <br />Latitude: ${position.coords.latitude} <br />Longitude: ${position.coords.longitude} <br />Accuracy: ${position.coords.accuracy}<br>`;
            }

            // Error callback function
            function errorCallback(error) {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        outputDiv.innerHTML +=
                            `User denied the request for Geolocation. <br /><br>`;
                        break;
                    case error.POSITION_UNAVAILABLE:
                        outputDiv.innerHTML +=
                            `Location information is unavailable. <br /><br>`;
                        break;
                    case error.TIMEOUT:
                        outputDiv.innerHTML +=
                            `The request to get user location timed out. <br /><br>`;
                        break;
                    case error.UNKNOWN_ERROR:
                        outputDiv.innerHTML +=
                            `An unknown error occurred. <br /><br>`;
                        break;
                }
            }
        }

        // Clear the input field
        commandInput.value = "";

        // Refocus the input field and place it after the new prompt
        commandInput.focus();
        outputDiv.scrollTop = outputDiv.scrollHeight; // Ensure the scroll is at the bottom
    }
});
