# MapleStory Artale EXP Time Efficiency Calculator

A simple web-based calculator for MapleStory Artale players to estimate the time needed to reach their target level based on their current EXP efficiency.

## About

MapleStory Artale is an MMORPG game. This calculator helps players plan their leveling journey by calculating how long it will take to reach their target level based on their current grinding efficiency.

## Features

- Simple & Advanced Modes: Choose between simple calculation or advanced planning with buffs and events
- EXP Calculation: Calculate total EXP required from current level to target level
- Time Estimation: Estimate grinding time based on your EXP efficiency (per 10 minutes)
- Dual Unit Input: Input EXP efficiency in units of 10,000 (萬) or regular integers for convenience
- Progress Tracking: View your current level progress as a percentage
- Regular Buffs: Factor in Holy Symbol (10%/15%/20%) and Taunt (+10%) buffs
- Event Support: Calculate grinding time with EXP coupons (2x/3x), weather events (2x/3x), and custom events
- Event Time Breakdown: See detailed phase-by-phase breakdown of how long each event combination lasts
- Grinding Schedule: Two planning modes for flexible scheduling
  - Daily Time Mode: Set daily grinding hours to calculate days needed
  - Target Days Mode: Set target days to calculate required daily grinding time
- Level History Tracking: Record and visualize your leveling progress over time
  - Visual line chart showing level progression
  - Smart daily aggregation for long-term history
  - Export/Import records as text files for backup or sharing
  - Clear history when starting fresh
- Local Storage: Your inputs and history are automatically saved in browser localStorage
- Dark/Light Theme: Toggle between dark (default) and light themes
- Responsive Design: Works seamlessly on desktop and mobile devices


* Plan to add (wip):

  1. save data with user's google drive on top of browser local storage

### Data Persistence

The calculator automatically saves your inputs to browser localStorage. No personal data is passed on the internet.

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