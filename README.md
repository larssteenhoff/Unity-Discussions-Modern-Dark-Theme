# Unity Discussions Custom Styler

A browser extension that applies beautiful custom styling overrides to the Unity Discussions website (https://discussions.unity.com).

## Features

🎨 **Custom Dark Theme** - Modern dark theme with customizable colors  
✨ **Smooth Animations** - Elegant transitions and hover effects  
🎯 **Enhanced UI Elements** - Improved buttons, forms, and navigation  
📋 **Code Block Enhancements** - Copy buttons for code snippets  
🎛️ **Customizable Settings** - Adjust colors and preferences via popup  
📱 **Responsive Design** - Works great on all screen sizes  
🚀 **Performance Optimized** - Lightweight and fast loading

## Installation

### Chrome/Edge/Brave (Chromium-based browsers)

1. **Download the Extension**
   - Clone or download this repository to your computer
   - Extract the files to a folder (e.g., `Unity Website`)

2. **Enable Developer Mode**
   - Open Chrome and go to `chrome://extensions/`
   - Toggle "Developer mode" in the top-right corner

3. **Load the Extension**
   - Click "Load unpacked"
   - Select the folder containing the extension files
   - The extension should now appear in your extensions list

4. **Pin the Extension** (Optional)
   - Click the puzzle piece icon in the toolbar
   - Find "Unity Discussions Custom Styles" and pin it

### Firefox

1. **Download the Extension**
   - Clone or download this repository

2. **Load Temporarily**
   - Go to `about:debugging#/runtime/this-firefox`
   - Click "Load Temporary Add-on"
   - Select the `manifest.json` file

*Note: For permanent installation in Firefox, the extension would need to be signed by Mozilla.*

## Usage

1. **Navigate to Unity Discussions**
   - Go to https://discussions.unity.com
   - The custom styles will automatically apply

2. **Customize Your Experience**
   - Click the extension icon in your browser toolbar
   - Adjust colors, animation speed, and other preferences
   - Changes apply instantly to the website

3. **Use Preset Themes**
   - Choose from built-in color presets:
     - Dark Blue (default)
     - Purple theme
     - Green theme  
     - Orange theme

## Customization Options

### Available Settings

- **Primary Color**: Main accent color for links and buttons
- **Background Color**: Main background color of the site
- **Text Color**: Primary text color
- **Animation Speed**: Speed of transitions and animations
- **Enable/Disable Animations**: Toggle all animations on/off

### CSS Variables

The extension uses CSS custom properties that you can modify in `styles.css`:

```css
:root {
  --primary-color: #2196F3;      /* Main accent color */
  --secondary-color: #FFC107;    /* Secondary accent */
  --background-color: #1a1a1a;   /* Main background */
  --surface-color: #2d2d2d;      /* Card/surface backgrounds */
  --text-color: #ffffff;         /* Primary text */
  --text-secondary: #b0b0b0;     /* Secondary text */
  --border-color: #404040;       /* Borders and dividers */
  --hover-color: #3d3d3d;        /* Hover states */
  --accent-color: #00bcd4;       /* Tags and highlights */
}
```

## File Structure

```
Unity Website/
├── manifest.json          # Extension configuration
├── styles.css            # Main CSS overrides
├── content.js            # Content script for dynamic features
├── popup.html            # Settings popup interface
├── popup.js              # Popup functionality
└── README.md             # This file
```

## Features in Detail

### Dark Theme
- Complete dark theme transformation
- High contrast for better readability
- Consistent color scheme throughout

### Enhanced Navigation
- Improved header styling with better contrast
- Smooth hover transitions on menu items
- Modern button designs with subtle shadows

### Better Content Display
- Enhanced topic list with hover effects
- Improved post readability with better spacing
- Syntax highlighting for code blocks
- Copy buttons on code snippets

### Responsive Design
- Mobile-friendly adjustments
- Proper scaling on all screen sizes
- Touch-friendly interface elements

### Performance Features
- Lightweight CSS with minimal impact
- Efficient JavaScript with mutation observers
- Smooth animations without performance hits

## Browser Compatibility

- ✅ Chrome 88+
- ✅ Edge 88+
- ✅ Brave
- ✅ Firefox 85+ (temporary installation)
- ✅ Opera 74+

## Troubleshooting

### Extension Not Working
1. Refresh the Unity Discussions page
2. Check if the extension is enabled in your browser
3. Verify you're on https://discussions.unity.com

### Styles Not Applying
1. Check browser console for errors
2. Ensure the extension has permission for the site
3. Try disabling and re-enabling the extension

### Popup Not Opening
1. Make sure you clicked the correct extension icon
2. Check if the extension is properly loaded
3. Try reloading the extension

## Development

### Making Changes
1. Edit the CSS in `styles.css` for styling changes
2. Modify `content.js` for JavaScript functionality
3. Update `popup.html` and `popup.js` for settings interface

### Testing Changes
1. Make your changes to the files
2. Go to `chrome://extensions/`
3. Click the refresh button on the extension card
4. Refresh the Unity Discussions page

## Contributing

Feel free to submit issues and enhancement requests! If you'd like to contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Disclaimer

This extension is not officially affiliated with Unity Technologies. It's a community-created tool to enhance the user experience of the Unity Discussions website.

---

**Enjoy your enhanced Unity Discussions experience!** 🎉

If you find this useful, consider sharing it with other Unity developers who might benefit from a better browsing experience.
