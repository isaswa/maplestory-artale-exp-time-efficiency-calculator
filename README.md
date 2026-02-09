# MapleStory Artale EXP Time Efficiency Calculator

A simple web-based calculator for MapleStory Artale players to estimate the time needed to reach their target level based on their current EXP efficiency.

## About

MapleStory Artale is an MMORPG game. This calculator helps players plan their leveling journey by calculating how long it will take to reach their target level based on their current grinding efficiency.

## Features

- EXP Calculation: Calculate total EXP required from current level to target level
- Time Estimation: Estimate grinding time based on your EXP efficiency (per 10 minutes)
- Dual Unit Input: Input EXP efficiency in units of 10,000 (萬) or regular integers for convenience
- Progress Tracking: View your current level progress as a percentage
- Local Storage: Your inputs are automatically saved in browser localStorage
- Dark/Light Theme: Toggle between dark (default) and light themes
- Responsive Design: Works on desktop and mobile devices


* Plan to add (wip):

  1. calculation on EXP 2x, 3x events or coupons
  2. grinding plan
    - required time per day for N days
    - fixed time per day, calculate required days to reach target
  3. save data with user's google drive on top of browser local storage
  4. dashboard to track leveling history of user

### Data Persistence

The calculator automatically saves your inputs to browser localStorage, including:

- Current level
- Current EXP
- Target level
- EXP efficiency value
- Selected unit (万/10k or regular)
- Theme preference (dark / light)

### Themes

- Dark Theme (Default)
- Light Theme

Toggle between themes using the button in the top-right corner.

### Browser Compatibility

Works on all modern browsers that support:

- ES6 JavaScript
- CSS Custom Properties
- LocalStorage API
- HTML5 Form Validation

## License

This project is open source and available under the MIT License.

## Acknowledgments

- EXP data extracted from official MapleStory Artale game data
- Built for the MapleStory Artale community

## Contributions

contact isaswa@discord for any issue/bug, or just report at the github issue page.