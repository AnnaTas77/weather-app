import { clickedSearch } from './fetchweather.js'

const ninjaApi = {
    key: 'lQkX1TNpDHxVEcCOdkizHg==ijMXifMjNytwpDx5',
    baseUrl: "https://api.api-ninjas.com"
}

const userInput = document.getElementById("input-box");
const autocompleteResults = document.getElementById("autocomplete-results");

userInput.addEventListener("input", autoComplete);

/*clear autocomplete elements when somebody clicks in the document:*/
document.addEventListener("click", () => {
    closeAllLists(autocompleteResults);
});

function autoComplete() {
    if (userInput.value === undefined || userInput.value.length < 1) {
        return;
    }

    let cityArray = [];
    let city = userInput.value;

    fetch(`${ninjaApi.baseUrl}/v1/city?name=${city}&limit=20`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': ninjaApi.key
            }
        })
        .then((response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error(response.statusText);
            }
        }))
        .then(data => {
            if (data.length == 0) {
                closeAllLists(autocompleteResults);
                return;
            }

            autocompleteResults.classList.add("open-dropdown");
            // console.log('Autocomplete Data:', data);
            data.map((item) => {
                cityArray.push(`${item.name}, ${item.country}`);
                cityArray.sort();
            })
            // console.log('City Array:', cityArray);
            createAutocompleteListElements(cityArray, autocompleteResults, userInput);
        })
        .catch((error) => {
            console.log("Something went wrong.", error);
        });
}


function createAutocompleteListElements(data, containerElement, searchInputElement) {
    if (!data) {
        return;
    }
    containerElement.innerHTML = "";
    data.forEach((item) => {
        if (item.substr(0, searchInputElement.value.length).toLowerCase() == searchInputElement.value.toLowerCase()) {
            let b = document.createElement("li");
            /*makes the matching letters bold*/
            b.innerHTML = "<strong>" + item.substr(0, searchInputElement.value.length) + "</strong>";
            b.innerHTML += item.substr(searchInputElement.value.length);

            // b.innerText = item;
            b.addEventListener("click", () => {
                searchInputElement.value = item;
                clickedSearch();
                closeAllLists(containerElement);
            });
            b.addEventListener('keypress', () => {
                if (event.key === "Enter") {
                    searchInputElement.value = item;
                    closeAllLists(containerElement);
                }
            })
            containerElement.appendChild(b);
        }



    })
}

export function closeAllLists(container) {
    container.innerHTML = "";
    container.classList.remove("open-dropdown");
}