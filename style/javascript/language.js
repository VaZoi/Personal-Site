// Function to load language data from JSON
function loadLanguage(lang) {
  console.log(`Loading language: ${lang}`);  // Log the selected language
  
  // Load the language file for general content
  fetch(`languages/${lang}.json`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Language data loaded:", data);  // Log the loaded language data

      // Update the page title based on the selected language
      document.title = `${data.title} - Portfolio`;  // Change title dynamically

      document.querySelector(".language-label").textContent = data.language.label;

      // Update the text content for navigation
      document.querySelector(".nav-about").textContent = data.navigation.about;
      document.querySelector(".nav-portfolio").textContent = data.navigation.portfolio;
      document.querySelector(".nav-contact").textContent = data.navigation.contact;

      // Update the text content for Hero Section
      document.querySelector(".hero-title").textContent = data.hero.title;
      document.querySelector(".hero-subtitle").textContent = data.hero.subtitle;
      document.querySelector(".cta-button").textContent = data.hero.cta;

      // Update the text content for Social Icons
      const socialIcons = document.querySelectorAll(".social-icon");
      socialIcons[0].textContent = data.social.linkedin;
      socialIcons[1].textContent = data.social.github;

      // Update the text content for About Section
      document.querySelector(".about-title").textContent = data.about.title;
      document.querySelector(".about-text").textContent = data.about.text;

      // Update the text content for Portfolio Section
      document.querySelector(".portfolio-title").textContent = data.portfolio.title;

      // Portfolio filters (desktop view)
      document.querySelector(".filter-button[data-filter='all']").textContent = data.portfolio.filters.all;
      document.querySelector(".filter-button[data-filter='web']").textContent = data.portfolio.filters.web;
      document.querySelector(".filter-button[data-filter='game']").textContent = data.portfolio.filters.game;
      document.querySelector(".filter-button[data-filter='gis']").textContent = data.portfolio.filters.gis;

      // Portfolio filter dropdown (mobile view)
      const filterDropdown = document.querySelector(".filter-dropdown");
      filterDropdown.querySelector('option[value="all"]').textContent = data.portfolio.filters.all;
      filterDropdown.querySelector('option[value="web"]').textContent = data.portfolio.filters.web;
      filterDropdown.querySelector('option[value="game"]').textContent = data.portfolio.filters.game;
      filterDropdown.querySelector('option[value="gis"]').textContent = data.portfolio.filters.gis;

      // Update the text content for Contact Section
      document.querySelector(".contact-title").textContent = data.contact.title;
      document.querySelector("input[placeholder='Your Name']").setAttribute("placeholder", data.contact.form.name);
      document.querySelector("input[placeholder='Your Email']").setAttribute("placeholder", data.contact.form.email);
      document.querySelector("textarea[placeholder='Your Message']").setAttribute("placeholder", data.contact.form.message);
      document.querySelector(".contact button").textContent = data.contact.form.button;

      // Update the Footer content
      document.querySelector(".footer p").innerHTML = data.footer.copyright;

      // Update the Spotify playlist based on language
      const spotifyPlayer = document.getElementById("spotify-player");
      spotifyPlayer.src = data.playlist;  // Set playlist URL from JSON
    })
    .catch(error => console.error("Error loading language file:", error));

  // Initial load of projects with the selected language
  loadProjects(lang, 'all');
}

// Function to load and filter portfolio projects
function loadProjects(lang, filter = 'all') {
  fetch(`languages/projects/projects_${lang}.json`)
      .then(response => response.json())
      .then(projects => {
          const portfolioGrid = document.getElementById('portfolio-grid');
          portfolioGrid.innerHTML = ''; // Clear existing items

          projects
              .filter(project => filter === 'all' || project.category === filter)
              .forEach(project => {
                  const portfolioItem = document.createElement('div');
                  portfolioItem.classList.add('portfolio-item');
                  portfolioItem.setAttribute('data-category', project.category);

                  const img = document.createElement('img');
                  img.src = project.image;
                  img.alt = project.title;

                  const overlay = document.createElement('div');
                  overlay.classList.add('overlay');

                  const title = document.createElement('h3');
                  title.textContent = project.title;

                  const description = document.createElement('p');
                  description.textContent = project.description;

                  overlay.appendChild(title);
                  overlay.appendChild(description);

                  const link = document.createElement('a');

                  // Check if there is a link before creating the anchor element
                  if (project.link) {
                      link.href = project.link;

                      // Update the text content and class based on the platform
                      if (project.platform === 'GitHub') {
                          link.textContent = 'View on GitHub';
                          link.classList.add('github-link');
                      } else if (project.platform === 'Itch.io') {
                          link.textContent = 'View on Itch.io';
                          link.classList.add('itch-link');
                      }

                      overlay.appendChild(link);  // Append the link only if it exists
                  } else {
                      // Display an alternative message if no link is available
                      const noLinkText = document.createElement('p');
                      noLinkText.textContent = '';  // Placeholder message
                      noLinkText.classList.add('no-link'); // Style this class in CSS as needed
                      overlay.appendChild(noLinkText);  // Append the placeholder message
                  }


                  overlay.appendChild(link);
                  portfolioItem.appendChild(img);
                  portfolioItem.appendChild(overlay);

                  portfolioGrid.appendChild(portfolioItem);
              });
      })
      .catch(error => console.error('Error loading projects:', error));
}

// Event listener for language selection
document.getElementById("language-select").addEventListener("change", (event) => {
  const selectedLanguage = event.target.value;
  console.log(`Selected language: ${selectedLanguage}`);
  localStorage.setItem("selectedLanguage", selectedLanguage);
  loadLanguage(selectedLanguage);
});

// Event listeners for portfolio filter buttons (desktop view)
document.querySelectorAll('.filter-button').forEach(button => {
  button.addEventListener('click', () => {
      document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const filter = button.getAttribute('data-filter');
      const selectedLanguage = localStorage.getItem("selectedLanguage") || "en"; 
      loadProjects(selectedLanguage, filter);
  });
});

// Event listener for filter dropdown (mobile view)
document.querySelector('.filter-dropdown').addEventListener('change', (event) => {
    const filter = event.target.value;
    const selectedLanguage = localStorage.getItem("selectedLanguage") || "en";
    loadProjects(selectedLanguage, filter);
});

// Initial load of language and projects
const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
document.getElementById("language-select").value = savedLanguage;
loadLanguage(savedLanguage);
