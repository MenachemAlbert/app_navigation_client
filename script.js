document.getElementById('route-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = {
        id: document.getElementById('id').value,
        origin: document.getElementById('origin').value,
        destination: document.getElementById('destination').value,
        type: document.getElementById('type').value,
    };

    try {
        localStorage.setItem("current_travel", JSON.stringify(formData));
        const response = await fetch('http://127.0.0.1:5000/api/routes/get_the_shortened_route', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const data = await response.json();  
            if (data) {
                const htmlContent = data.map;  
                const travelTime = data.travel_time; 
        
                const htmlContentDiv = document.getElementById('html-content');
                htmlContentDiv.innerHTML = htmlContent;
        
                const displayTimeDiv = document.getElementById('display_time');
                const travelTimeSpan = document.getElementById('travel_time');
                travelTimeSpan.innerText = travelTime;
                displayTimeDiv.style.display = 'block';  

                document.getElementById('start_trip_button').addEventListener('click', () => {
                    alert('The trip has started!');
                    const response =fetch('http://127.0.0.1:5000/api/routes/start_travel_route', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: localStorage.getItem("current_travel"),
                    });
                });

                console.log('Travel time:', travelTime);
            }
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error}`);
        }
    } catch (err) {
        console.error(err);
        alert('An error occurred while fetching the route.');
    }
});
