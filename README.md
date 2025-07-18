# 💕 Anniversary Parallax Website

A beautiful animated website that tells your love story through 12 months of memories, from the month you met to your 1-year anniversary.

## ✨ Features

- **Night Sky Landing**: Twinkling stars with mouse parallax effect
- **Smooth Transitions**: Camera pans from sky to ground
- **Running Character**: Animated figure with bobbing and leg movement
- **Parallax Backgrounds**: 12 unique gradient backgrounds for each month
- **Month Displays**: Beautiful text overlays for each month
- **Progress Tracking**: Visual progress bar showing journey completion
- **Celebration Finale**: Floating hearts and special message at the end
- **Responsive Design**: Works on both desktop and mobile devices

## 🎮 How to Use

1. **Start**: Open `index.html` in your web browser
2. **Begin Journey**: Click the "Begin Our Journey" button
3. **Watch the Story**: Enjoy the automatic 12-month animation sequence
4. **Restart**: Press 'R' key or double-click anywhere to restart

## 📅 Timeline

The animation follows your relationship timeline:
- **June**: The month you met
- **July - April**: Following months of your first year
- **May**: Your 1-year anniversary celebration

Each month lasts 12 seconds, making the total experience about 2.5 minutes.

## 🎨 Customization Options

### 1. Change Month Names
Edit the `months` array in `script.js`:
```javascript
this.months = [
    'June',      // Your actual start month
    'July',
    // ... customize as needed
];
```

### 2. Adjust Timing
Modify `monthDuration` in `script.js`:
```javascript
this.monthDuration = 12000; // milliseconds (12 seconds)
```

### 3. Update Background Colors
Add new gradient classes in `styles.css`:
```css
.gradient-13 { background: linear-gradient(90deg, #your-color1, #your-color2); }
```

### 4. Customize Character
Modify the character design in `styles.css`:
- Change colors in `.character-body` and `.leg`
- Adjust size by modifying width/height values
- Add accessories by creating new elements

### 5. Replace with Real Backgrounds
Replace the gradient backgrounds with actual photos:
```css
.gradient-1 { 
    background: url('path/to/june-photo.jpg') center/cover no-repeat;
}
```

## 🛠️ Technical Details

### Files Structure
- `index.html` - Main HTML structure
- `styles.css` - All styling and animations
- `script.js` - Animation logic and timing

### Key Classes
- `.landing-page` - Night sky with stars
- `.character` - Running figure animation
- `.background-layer` - Parallax scrolling backgrounds
- `.month-overlay` - Month name displays

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support required
- JavaScript ES6 features used

## 💡 Enhancement Ideas

1. **Add Sound**: Include background music or sound effects
2. **Photo Integration**: Replace gradients with actual photos from each month
3. **Interactive Elements**: Add clickable memories or milestones
4. **Mobile Gestures**: Swipe navigation for mobile devices
5. **Custom Messages**: Personal notes for each month
6. **Different Characters**: Multiple character designs to choose from

## 🎯 Performance Notes

- Optimized for smooth 60fps animations
- Responsive design works on various screen sizes
- Memory efficient with automatic cleanup
- Works offline (no external dependencies)

## 💖 Perfect For

- Anniversary celebrations
- Relationship milestones
- Romantic surprises
- Digital love letters
- Wedding slideshows
- Valentine's Day gifts

---

**Enjoy your beautiful love story website! 💕**

*Press 'R' to restart the animation at any time* 