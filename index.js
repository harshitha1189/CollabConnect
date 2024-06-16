document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const results = document.getElementById('results');

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = searchInput.value.trim().toLowerCase();
        if (query) {
            showLoading();
            setTimeout(() => {
                fetchFreelancerData().then(freelancers => {
                    searchFreelancers(query, freelancers);
                }).catch(err => {
                    console.error('Error fetching freelancer data:', err);
                    hideLoading();
                });
            }, 1000); // Simulate a delay for demonstration purposes
        } else {
            alert("Please enter a search term.");
        }
    });

    function showLoading() {
        document.getElementById('loading').style.display = 'block';
    }

    function hideLoading() {
        document.getElementById('loading').style.display = 'none';
    }

    async function fetchFreelancerData() {
        const response = await fetch('freelancers.html');
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        const profileElements = doc.querySelectorAll('.profile');
        
        const freelancers = Array.from(profileElements).map(profile => ({
            name: profile.querySelector('h1').textContent,
            title: profile.querySelector('h2').textContent,
            overview: profile.querySelector('p:nth-of-type(1)').textContent.replace('Overview:', '').trim(),
            skills: profile.querySelector('p:nth-of-type(2)').textContent.replace('Skills:', '').trim(),
            experience: profile.querySelector('p:nth-of-type(3)').textContent.replace('Experience:', '').trim(),
            education: profile.querySelector('p:nth-of-type(4)').textContent.replace('Education:', '').trim(),
            availability: profile.querySelector('p:nth-of-type(5)').textContent.replace('Availability:', '').trim(),
            
            
           
         
    
        }));

            
    
    // Combine both sources
    return freelancers;
    }

    function searchFreelancers(query, freelancers) {
        results.innerHTML = ''; // Clear previous results

        // Convert the query to lower case for case-insensitive matching
        const lowerCaseQuery = query.toLowerCase();

        // Filter freelancers based on the skills, name, or overview that match the query
        const filteredFreelancers = freelancers.filter(freelancer => 
            freelancer.skills.toLowerCase().includes(lowerCaseQuery) ||
            freelancer.name.toLowerCase().includes(lowerCaseQuery) ||
            freelancer.overview.toLowerCase().includes(lowerCaseQuery)
        );

        hideLoading();

        if (filteredFreelancers.length > 0) {
            filteredFreelancers.forEach(freelancer => {
               
                
                
                const div = document.createElement('div');
                div.className = 'freelancer';
                div.innerHTML = `
                    <h3>${freelancer.name}</h3>
                    <p>${freelancer.title}</p>
                    <p>${freelancer.overview}</p>
                    <p>${freelancer.skills}</p>
                    <p>${freelancer.experience}</p>
                    <p>${freelancer.education}</p>
                    <p>${freelancer.availability}</p>
                  <button class="contact-button" onclick="window.location.href='mailto:your.email@example.com';">Contact</button>
                `;
                results.appendChild(div);
            });
        } else {
            results.innerHTML = '<p>No freelancers found.</p>';
        }
    }
});

   


