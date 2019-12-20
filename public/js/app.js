const searchButton = document.querySelector('#search-button');
const searchTerm = document.querySelector('#search-term');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');
 
searchButton.addEventListener('click', (e) => {
    
    e.preventDefault();

    const location = searchTerm.value;
    messageOne.textContent = 'Loading...';
    fetch('/weather?address=' + encodeURIComponent(location)).then((response) => {
    
        response.json().then(({error, location, forecast}) => {
            
            if (error) {
                messageOne.textContent = error;
            } else {

                messageOne.textContent = location;
                messageTwo.textContent = forecast;

            }

        });

    });

});
