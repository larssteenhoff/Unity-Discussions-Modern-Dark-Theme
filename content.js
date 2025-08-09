// Unity Discussions Custom Styling Content Script

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCustomStyles);
} else {
  initializeCustomStyles();
}

function initializeCustomStyles() {
  console.log('Unity Discussions Custom Styles: Initializing...');
  
  // Add custom class to body for easier targeting
  document.body.classList.add('unity-custom-styled');
  
  // Create and inject additional dynamic styles
  const dynamicStyles = document.createElement('style');
  dynamicStyles.id = 'unity-dynamic-styles';
  dynamicStyles.textContent = `
    /* Dynamic styles that may need JavaScript injection */
    .unity-custom-styled {
      --custom-animation-duration: 0.3s;
    }
    
    /* Enhanced hover effects */
    .unity-custom-styled .topic-list-item:hover {
      transform: none !important;
    }
    
    /* Custom loading states */
    .unity-custom-styled .loading {
      position: relative;
      overflow: hidden;
    }
    
    .unity-custom-styled .loading::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(33, 150, 243, 0.2), transparent);
      animation: shimmer 1.5s infinite;
    }
    
    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 100%; }
    }
  `;
  
  document.head.appendChild(dynamicStyles);
  
  // Observe for dynamically loaded content
  observeContentChanges();
  
  // Start continuous comma replacement watcher
  // REMOVED - No longer watching for comma replacement
  
  // Add smooth scrolling
  document.documentElement.style.scrollBehavior = 'smooth';
  
  console.log('Unity Discussions Custom Styles: Initialized successfully!');
}

function observeContentChanges() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        // Re-apply styles to newly added elements
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            applyCustomEnhancements(node);
          }
        });
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

function applyCustomEnhancements(element) {
  // Add loading shimmer effect to images while they load
  const images = element.querySelectorAll('img');
  images.forEach(img => {
    if (!img.complete) {
      img.classList.add('loading');
      img.addEventListener('load', () => {
        img.classList.remove('loading');
      });
    }
  });
  
  // Enhance code blocks with copy functionality
  const codeBlocks = element.querySelectorAll('pre code');
  codeBlocks.forEach(addCopyButton);
  
  // REMOVED - No longer replacing commas with dashes
  
  // Fix tag text colors
  fixTagTextColors(element);
  
  // Remove gray background from navigation items
  removeNavGrayBackground(element);
  
  // Run navigation styling continuously to catch state changes
  setTimeout(() => removeNavGrayBackground(document), 500);
  
  // Remove blue selection lines from user menu buttons
  removeBlueSelectionLines(element);
}

function replaceTagCommas(element) {
  // Method 1: Find and replace text nodes with commas
  const walker = document.createTreeWalker(
    element,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  
  const textNodes = [];
  let node;
  while (node = walker.nextNode()) {
    if (node.textContent.includes(',')) {
      textNodes.push(node);
    }
  }
  
  textNodes.forEach(textNode => {
    // Replace commas with dashes in text nodes
    if (textNode.textContent.trim() === ',' || textNode.textContent.includes(',')) {
      textNode.textContent = textNode.textContent.replace(/,/g, ' -');
    }
  });
  
  // Method 2: Target specific comma elements and spans
  const commaSelectors = [
    '.comma',
    'span.comma',
    '.discourse-tags .comma',
    '.list-tags .comma',
    '.topic-list .comma'
  ];
  
  commaSelectors.forEach(selector => {
    const commas = element.querySelectorAll(selector);
    commas.forEach(comma => {
      if (comma.textContent.trim() === ',') {
        comma.textContent = ' -';
      }
    });
  });
  
  // Method 3: More aggressive - find all elements containing just commas
  const allElements = element.querySelectorAll('*');
  allElements.forEach(el => {
    if (el.textContent.trim() === ',' && el.children.length === 0) {
      el.textContent = ' -';
    }
  });
  
  // Method 4: Direct innerHTML replacement for tag containers
  const tagContainers = element.querySelectorAll('.discourse-tags, .list-tags, .topic-meta-data');
  tagContainers.forEach(container => {
    if (container.innerHTML.includes(',')) {
      container.innerHTML = container.innerHTML.replace(/,(\s*)/g, ' -$1');
    }
  });
}

// Run comma replacement continuously for dynamic content
function startCommaReplacementWatcher() {
  setInterval(() => {
    replaceTagCommas(document.body);
  }, 1000); // Check every second
}

function addCopyButton(codeBlock) {
  const pre = codeBlock.parentElement;
  if (pre.querySelector('.copy-button')) return; // Already has copy button
  
  const copyButton = document.createElement('button');
  copyButton.className = 'copy-button';
  copyButton.innerHTML = '📋 Copy';
  copyButton.style.cssText = `
    position: absolute;
    top: 8px;
    right: 8px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 4px 8px;
    font-size: 12px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 10;
  `;
  
  pre.style.position = 'relative';
  pre.appendChild(copyButton);
  
  pre.addEventListener('mouseenter', () => {
    copyButton.style.opacity = '1';
  });
  
  pre.addEventListener('mouseleave', () => {
    copyButton.style.opacity = '0';
  });
  
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(codeBlock.textContent);
      copyButton.innerHTML = '✅ Copied!';
      setTimeout(() => {
        copyButton.innerHTML = '📋 Copy';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
      copyButton.innerHTML = '❌ Failed';
      setTimeout(() => {
        copyButton.innerHTML = '📋 Copy';
      }, 2000);
    }
  });
}

// Theme toggle functionality (for future enhancement)
function createThemeToggle() {
  const toggleButton = document.createElement('button');
  toggleButton.id = 'unity-theme-toggle';
  toggleButton.innerHTML = '🌙';
  toggleButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-color);
    color: white;
    border: none;
    font-size: 20px;
    cursor: pointer;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
  `;
  
  toggleButton.addEventListener('click', () => {
    // Toggle between light and dark themes (placeholder for future implementation)
    console.log('Theme toggle clicked - feature coming soon!');
  });
  
  document.body.appendChild(toggleButton);
}

// Initialize theme toggle
// createThemeToggle(); // Uncomment when ready to use

function fixTagTextColors(element) {
  // Find all possible tag elements and force black text
  const tagSelectors = [
    '.discourse-tag',
    'a.discourse-tag',
    '.discourse-tag.simple',
    '[class*="discourse-tag"]',
    '.tag',
    '[data-tag-name]',
    '.breadcrumb .discourse-tag',
    '.breadcrumbs .discourse-tag'
  ];
  
  tagSelectors.forEach(selector => {
    const tags = element.querySelectorAll(selector);
    tags.forEach(tag => {
      // Skip if this tag is in the sidebar
      if (tag.closest('#sidebar-section-content-tags') || tag.closest('.sidebar-section')) {
        return; // Keep sidebar tags with their original color (white)
      }
      
      // Force black text on the tag itself
      tag.style.color = 'black';
      
      // Force black text on all children
      const children = tag.querySelectorAll('*');
      children.forEach(child => {
        child.style.color = 'black';
      });
      
      // Also check for text nodes and spans specifically
      const spans = tag.querySelectorAll('span');
      spans.forEach(span => {
        span.style.color = 'black';
      });
    });
  });
}

function removeNavGrayBackground(element) {
  const navSelectors = [
    '.viewing-self section nav ul li',
    '.container.viewing-self nav ul li',
    '.viewing-self nav ul li.active',
    '.viewing-self nav ul li[class*="active"]',
    '.container.viewing-self nav ul li.active',
    '.container.viewing-self nav ul li[class*="active"]'
  ];
  
  navSelectors.forEach(selector => {
    const navItems = element.querySelectorAll(selector);
    navItems.forEach(item => {
      // Force remove gray background via inline styles (highest specificity)
      item.style.background = 'none';
      item.style.backgroundColor = 'transparent';
      item.style.backgroundImage = 'none';
      item.style.boxShadow = 'none';
      
      // Remove click/hold effects
      item.style.outline = 'none';
      item.style.border = 'none';
      
      // Also apply to any child elements
      const children = item.querySelectorAll('*');
      children.forEach(child => {
        child.style.background = 'none';
        child.style.backgroundColor = 'transparent';
        child.style.backgroundImage = 'none';
        child.style.outline = 'none';
        child.style.border = 'none';
        child.style.boxShadow = 'none';
      });
      
      // Check if this item is active (simplified and reliable detection)
      const isActive = item.classList.contains('active') || 
                      item.classList.contains('current') ||
                      item.getAttribute('aria-current') === 'page' ||
                      item.querySelector('[aria-current="page"]') ||
                      // Check link's aria-current
                      (item.querySelector('a') && item.querySelector('a').getAttribute('aria-current') === 'page');
      
      const link = item.querySelector('a');
      if (link) {
        // Remove all borders first
        link.style.border = 'none';
        link.style.borderTop = 'none';
        link.style.borderLeft = 'none';
        link.style.borderRight = 'none';
        link.style.outline = 'none';
        link.style.boxShadow = 'none';
        
        if (isActive) {
          // Add blue underline only for active items
          link.style.borderBottom = '2px solid #0091ff';
        } else {
          link.style.borderBottom = 'none';
        }
        
        link.style.background = 'none';
        link.style.backgroundColor = 'transparent';
        
        // Prevent click/hold effects with simplified active detection
        const checkActiveAndApplyStyles = (element) => {
          const parentItem = element.closest('li');
          const currentlyActive = parentItem && (
            parentItem.classList.contains('active') || 
            parentItem.classList.contains('current') ||
            parentItem.getAttribute('aria-current') === 'page' ||
            parentItem.querySelector('[aria-current="page"]') ||
            element.getAttribute('aria-current') === 'page'
          );
          
          element.style.outline = 'none';
          element.style.boxShadow = 'none';
          element.style.border = 'none';
          element.style.borderTop = 'none';
          element.style.borderLeft = 'none';
          element.style.borderRight = 'none';
          
          if (currentlyActive) {
            element.style.borderBottom = '2px solid #0091ff';
          } else {
            element.style.borderBottom = 'none';
          }
        };
        
        link.addEventListener('mousedown', function(e) {
          checkActiveAndApplyStyles(this);
        });
        
        link.addEventListener('mouseup', function(e) {
          checkActiveAndApplyStyles(this);
        });
        
        link.addEventListener('focus', function(e) {
          checkActiveAndApplyStyles(this);
        });
      }
    });
  });
}

function removeBlueSelectionLines(element) {
  // Find all user menu buttons and force remove selection styling
  const buttonSelectors = [
    '#user-menu-button-likes',
    '#user-menu-button-all-notifications',
    '#user-menu-button-replies',
    '#user-menu-button-mentions',
    '[id^="user-menu-button-"]',
    '.menu-panel button',
    '.menu-panel .btn',
    '.user-menu button',
    '.user-menu .btn'
  ];
  
  buttonSelectors.forEach(selector => {
    const buttons = element.querySelectorAll(selector);
    buttons.forEach(button => {
      // Remove all border and box-shadow styling
      button.style.borderBottom = 'none';
      button.style.boxShadow = 'none';
      button.style.border = 'none';
      button.style.outline = 'none';
      
      // Remove any classes that might add selection styling
      button.classList.remove('selected', 'active', 'current');
      
      // Add event listeners to prevent selection styling
      button.addEventListener('click', function() {
        this.style.borderBottom = 'none';
        this.style.boxShadow = 'none';
        this.style.border = 'none';
      });
      
      button.addEventListener('focus', function() {
        this.style.borderBottom = 'none';
        this.style.boxShadow = 'none';
        this.style.border = 'none';
        this.style.outline = 'none';
      });
    });
  });
}

// Apply enhancements to existing content
document.addEventListener('DOMContentLoaded', () => {
  applyCustomEnhancements(document);
});
