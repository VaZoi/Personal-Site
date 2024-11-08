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
        const navAbout = document.querySelector(".nav-about");
        if (navAbout) navAbout.textContent = data.navigation.about;
  
        const navPortfolio = document.querySelector(".nav-portfolio");
        if (navPortfolio) navPortfolio.textContent = data.navigation.portfolio;
  
        const navContact = document.querySelector(".nav-contact");
        if (navContact) navContact.textContent = data.navigation.contact;
  
        // Update the text content for Hero Section
        const heroTitle = document.querySelector(".hero-title");
        if (heroTitle) heroTitle.textContent = data.hero.title;
  
        const heroSubtitle = document.querySelector(".hero-subtitle");
        if (heroSubtitle) heroSubtitle.textContent = data.hero.subtitle;
  
        const ctaButton = document.querySelector(".cta-button");
        if (ctaButton) ctaButton.textContent = data.hero.cta;
  
        // Update the text content for Social Icons (optional)
        const socialIcons = document.querySelectorAll(".social-icon");
        socialIcons.forEach((icon, index) => {
          if (index === 0) {
            icon.textContent = data.social.linkedin; // LinkedIn
          } else if (index === 1) {
            icon.textContent = data.social.github; // GitHub
          }
        });
  
        // Update the text content for About Section
        const aboutTitle = document.querySelector(".about-title");
        if (aboutTitle) aboutTitle.textContent = data.about.title;
  
        const aboutText = document.querySelector(".about-text");
        if (aboutText) aboutText.textContent = data.about.text;
  
        // Update the text content for Portfolio Section
        const portfolioTitle = document.querySelector(".portfolio-title");
        if (portfolioTitle) portfolioTitle.textContent = data.portfolio.title;
  
        const portfolioDescription = document.querySelector(".portfolio-item p");
        if (portfolioDescription) portfolioDescription.textContent = data.portfolio.description;
  
        // Update the text content for Contact Section
        const contactTitle = document.querySelector(".contact-title");
        if (contactTitle) contactTitle.textContent = data.contact.title;
  
        const nameInput = document.querySelector("input[placeholder='Your Name']");
        if (nameInput) nameInput.setAttribute("placeholder", data.contact.form.name);
  
        const emailInput = document.querySelector("input[placeholder='Your Email']");
        if (emailInput) emailInput.setAttribute("placeholder", data.contact.form.email);
  
        const messageInput = document.querySelector("textarea[placeholder='Your Message']");
        if (messageInput) messageInput.setAttribute("placeholder", data.contact.form.message);
  
        const contactButton = document.querySelector(".contact button");
        if (contactButton) contactButton.textContent = data.contact.form.button;
  
        // Update the Footer content
        const footerCopyright = document.querySelector(".footer p");
        if (footerCopyright) footerCopyright.innerHTML = data.footer.copyright;
      })
      .catch(error => console.error("Error loading language file:", error));
  
    // Fetch the JSON data and render portfolio items based on the selected language
    fetch(`languages/projects/projects_${lang}.json`) // Dynamically load the projects file based on language
      .then(response => response.json())
      .then(projects => {
        const portfolioGrid = document.getElementById('portfolio-grid');
        portfolioGrid.innerHTML = ''; // Clear the existing portfolio grid
  
        projects.forEach(project => {
          // Create a div for each project
          const portfolioItem = document.createElement('div');
          portfolioItem.classList.add('portfolio-item');
  
          // Create the image element
          const img = document.createElement('img');
          img.src = project.image;
          img.alt = project.title;
  
          // Create the overlay div with title and description
          const overlay = document.createElement('div');
          overlay.classList.add('overlay');
  
          const title = document.createElement('h3');
          title.textContent = project.title;
  
          const description = document.createElement('p');
          description.textContent = project.description;
  
          overlay.appendChild(title);
          overlay.appendChild(description);
  
          // Check for the platform and add the appropriate link
          const link = document.createElement('a');
          if (project.platform === 'github') {
            link.href = project.link;
            link.textContent = 'View on GitHub';
            link.classList.add('github-link');
          } else if (project.platform === 'itch') {
            link.href = project.link;
            link.textContent = 'View on Itch.io';
            link.classList.add('itch-link');
          }
  
          // Append the platform-specific link to the overlay
          if (project.link) {
            overlay.appendChild(link);
          }
  
          // Append the image and overlay to the portfolio item
          portfolioItem.appendChild(img);
          portfolioItem.appendChild(overlay);
  
          // Append the portfolio item to the portfolio grid
          portfolioGrid.appendChild(portfolioItem);
        });
      })
      .catch(error => console.error('Error loading projects:', error));
  }
  
  // Check if a language was saved in localStorage
  const savedLanguage = localStorage.getItem("selectedLanguage") || "en";  // Default to English
  loadLanguage(savedLanguage);
  
  // Set the language in the dropdown based on localStorage value
  document.getElementById("language-select").value = savedLanguage;
  
  // Event listener for language selection
  document.getElementById("language-select").addEventListener("change", (event) => {
    const selectedLanguage = event.target.value;
    console.log(`Selected language: ${selectedLanguage}`);  // Log selected language
    localStorage.setItem("selectedLanguage", selectedLanguage);  // Save the language to localStorage
    loadLanguage(selectedLanguage);  // Load the selected language

    window.location.reload();
  });
  