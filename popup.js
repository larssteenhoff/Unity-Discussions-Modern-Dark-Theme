// Unity Discussions Styler Popup Script

document.addEventListener('DOMContentLoaded', function() {
    // Load saved settings
    loadSettings();
    
    // Set up event listeners
    setupEventListeners();
});

function loadSettings() {
    chrome.storage.sync.get([
        'primaryColor',
        'backgroundColor', 
        'textColor',
        'animationSpeed',
        'animationsEnabled'
    ], function(result) {
        // Set color inputs
        if (result.primaryColor) {
            document.getElementById('primaryColor').value = result.primaryColor;
            document.getElementById('primaryColorValue').textContent = result.primaryColor;
        }
        
        if (result.backgroundColor) {
            document.getElementById('backgroundColor').value = result.backgroundColor;
            document.getElementById('backgroundColorValue').textContent = result.backgroundColor;
        }
        
        if (result.textColor) {
            document.getElementById('textColor').value = result.textColor;
            document.getElementById('textColorValue').textContent = result.textColor;
        }
        
        // Set animation speed
        if (result.animationSpeed) {
            document.getElementById('animationSpeed').value = result.animationSpeed;
            document.getElementById('animationSpeedValue').textContent = result.animationSpeed + 's';
        }
        
        // Set animations toggle
        const animationsToggle = document.getElementById('animationsToggle');
        if (result.animationsEnabled !== undefined) {
            animationsToggle.classList.toggle('active', result.animationsEnabled);
        }
    });
}

function setupEventListeners() {
    // Color input listeners
    const colorInputs = ['primaryColor', 'backgroundColor', 'textColor'];
    colorInputs.forEach(inputId => {
        const input = document.getElementById(inputId);
        const valueSpan = document.getElementById(inputId + 'Value');
        
        input.addEventListener('input', function() {
            valueSpan.textContent = this.value;
            saveAndApplySettings();
        });
    });
    
    // Animation speed listener
    const animationSpeed = document.getElementById('animationSpeed');
    const animationSpeedValue = document.getElementById('animationSpeedValue');
    
    animationSpeed.addEventListener('input', function() {
        animationSpeedValue.textContent = this.value + 's';
        saveAndApplySettings();
    });
    
    // Animations toggle listener
    const animationsToggle = document.getElementById('animationsToggle');
    animationsToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        saveAndApplySettings();
    });
    
    // Preset button listeners
    const presetButtons = document.querySelectorAll('.preset-btn');
    presetButtons.forEach(button => {
        button.addEventListener('click', function() {
            applyPreset(this.dataset.preset);
        });
    });
}

function saveAndApplySettings() {
    const settings = {
        primaryColor: document.getElementById('primaryColor').value,
        backgroundColor: document.getElementById('backgroundColor').value,
        textColor: document.getElementById('textColor').value,
        animationSpeed: parseFloat(document.getElementById('animationSpeed').value),
        animationsEnabled: document.getElementById('animationsToggle').classList.contains('active')
    };
    
    // Save to storage
    chrome.storage.sync.set(settings);
    
    // Apply to active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs[0] && tabs[0].url.includes('discussions.unity.com')) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: 'updateStyles',
                settings: settings
            });
        }
    });
}

function applyPreset(presetName) {
    const presets = {
        dark: {
            primaryColor: '#2196F3',
            backgroundColor: '#1a1a1a',
            textColor: '#ffffff'
        },
        purple: {
            primaryColor: '#9C27B0',
            backgroundColor: '#1a0d1a',
            textColor: '#ffffff'
        },
        green: {
            primaryColor: '#4CAF50',
            backgroundColor: '#0d1a0d',
            textColor: '#ffffff'
        },
        orange: {
            primaryColor: '#FF9800',
            backgroundColor: '#1a1a0d',
            textColor: '#ffffff'
        }
    };
    
    const preset = presets[presetName];
    if (!preset) return;
    
    // Update UI
    document.getElementById('primaryColor').value = preset.primaryColor;
    document.getElementById('primaryColorValue').textContent = preset.primaryColor;
    
    document.getElementById('backgroundColor').value = preset.backgroundColor;
    document.getElementById('backgroundColorValue').textContent = preset.backgroundColor;
    
    document.getElementById('textColor').value = preset.textColor;
    document.getElementById('textColorValue').textContent = preset.textColor;
    
    // Save and apply
    saveAndApplySettings();
    
    // Visual feedback
    const button = document.querySelector(`[data-preset="${presetName}"]`);
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'translateY(-1px)';
    }, 150);
}
