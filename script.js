// Wait until the entire page is loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENT REFERENCES ---
    // Get references to the parts of the page we want to interact with
    const moonPhaseNameEl = document.getElementById('moon-phase-name');
    const moonZodiacEl = document.getElementById('moon-zodiac');
    const moonIconEl = document.getElementById('moon-icon');

    // --- LOGIC ---

    // This function will fetch the moon data from the internet
    async function getMoonData() {
        // We will use a free API to get the current moon phase information.
        // Note: It's best practice not to put API keys directly in code for public projects,
        // but for a simple, private project like this, it's okay to start with.
        const apiUrl = 'https://www.icalendar37.net/lunar/api/?lang=en&month=1&year=2025&size=100&lightColor=white&shadeColor=black&texturize=false';
        
        try {
            // Show a loading message while we fetch the data
            moonPhaseNameEl.textContent = 'Summoning moon data...';
            moonZodiacEl.textContent = '';

            const response = await fetch(apiUrl );
            const data = await response.json();

            // Find today's moon data from the response
            const today = new Date().getDate();
            const moonData = data.phase[today];

            if (moonData) {
                // Update the dashboard with the new information
                moonPhaseNameEl.textContent = moonData.phaseName;
                moonZodiacEl.textContent = `in ${moonData.zodiac}`;
                
                // Update the moon icon visually
                // The API gives us an SVG (an image made of code) that we can use directly
                moonIconEl.innerHTML = moonData.svg;
            } else {
                moonPhaseNameEl.textContent = 'Could not retrieve moon phase.';
            }

        } catch (error) {
            console.error("Error fetching moon data:", error);
            moonPhaseNameEl.textContent = 'Failed to connect to the cosmos.';
        }
    }


    // --- INITIALIZATION ---
    // This is the first thing that runs when the app loads.
    // We call our function to get the moon data as soon as the page is ready.
    getMoonData();

});
