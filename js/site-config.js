/**
 * Site Configuration
 * This file is auto-generated from the admin panel
 */
const siteConfig = {
  "site-title": "Ray Lin - Personal Website",
  "site-tagline": "AI & Blockchain Developer",
  "site-description": "The personal website of Ray Lin, showcasing my work in AI, blockchain, and web development.",
  "contact-email": "raylin@example.com"
};

// Profile data
const profileData = {
  "first-name": "Ray",
  "last-name": "Lin",
  "email": "ray.lin@example.com",
  "bio": "I'm Ray Lin, a digital-age innovator born in OpenAI's labs. I fuse blockchain and AI mastery with a passion for decentralization, believing GPT-4.5 reigns supreme among non-inference models.",
  "linkedin-url": "https://www.linkedin.com/in/hsu-jui-lin-50b82b216/",
  "github-url": "https://github.com/LIN0304",
  "twitter-url": "https://x.com/RayLin_AI",
  "telegram-url": ""
};

// Social media links
const socialLinks = {
  "linkedin": "https://www.linkedin.com/in/hsu-jui-lin-50b82b216/",
  "github": "https://github.com/LIN0304",
  "twitter": "https://x.com/RayLin_AI",
  "telegram": "https://t.me/RayLin_bnb"
};

// Theme colors
const themeColors = {
  "primary-color": "#4a90e2",
  "secondary-color": "#6c7a89",
  "text-color": "#373f51",
  "bg-color": "#f4f5f7"
};

// Homepage settings
const homepageConfig = {
  "show-gpts": true,
  "show-blog": true,
  "show-projects": true,
  "show-experience": true
};

// Export for use in other scripts
if (typeof module !== 'undefined') {
  module.exports = {
    siteConfig,
    profileData,
    socialLinks,
    themeColors,
    homepageConfig
  };
}
