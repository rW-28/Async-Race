# ASYNC RACE
Async Race is a single-page application (SPA) built with vanilla JavaScript, HTML and CSS. You can race custom cars with realistic animations and unpredictable engine failures.

## FEATURES
- Create Custom Cars - Add cars with custom names and colors.
- Random Car Generator - Auto-generate 10 random cars with different brands and colors.
- Race Mode - Start an all-car race and find out who reaches the finish line first.
- Engine Failures - Cars may break down during the race.
- Smooth Animations - Watch cars race across the screen with calculated durations based on speed and distance.
- Real-time Updates - UI updates dynamically after each action.

## TECH STACK
- Frontend: HTML5, CSS3, Vanilla JavaScript (ES6+ modules).
- Async Patterns: Fetch API, Promise.any(), async/await.
- Architecture: Modular design with separated concerns (API layer, UI layer, main logic).

## PROJECT STRUCTURE
- index.html - Application interface;
- index.js - Main application logic and event handlers;
- api.js - Server communication (Fetch API wrapper);
- ui.js - DOM manipulation and animations;
- styles.css - Application styling;

## Setup Requirements
Requires Backend Server - This app connects to a local backend at http://localhost:3000 with endpoints.