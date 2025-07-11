🚗 Car Telemetry Dashboard — Setup Instructions
===============================================

This dashboard uses modern JavaScript modules and CORS-protected assets,
so you **cannot run it by opening index.html directly from the file system**.

👉 Instead, you must run it through a local web server.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔧 OPTION 1: Use Node.js (Recommended)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Make sure you have Node.js installed → https://nodejs.org
2. Double-click the file: `start-dashboard.bat`
3. This will open the dashboard at: http://localhost:3000

❗ First-time Run Note (Windows SmartScreen)

When running start-dashboard.bat, Windows may show a “Windows protected your PC” message.
Click “More info” → “Run anyway” to continue. This is safe and expected.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🐍 OPTION 2: Use Python (Alternative)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Open a terminal or command prompt
2. Navigate to the dashboard folder
3. Run:
   python -m http.server 3000
4. Visit in browser:
   http://localhost:3000

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 OPTION 3: Use Live Server in VS Code
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Open the project folder in VS Code
2. Install the "Live Server" extension (if you haven't already)
3. Right-click on `index.html` → "Open with Live Server"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Once loaded, the dashboard will auto-run and simulate telemetry data.

Enjoy the ride! 🏁


Car Telemetry Dashboard
=======================

A modern, responsive, and animated car telemetry dashboard UI — built for demos, dashboards, or inspiration. Ideal for front-end developers, UI/UX designers, or automotive-themed projects.

━━━━━━━━━━━━━━━━━━━━
✨ Features
━━━━━━━━━━━━━━━━━━━━
• Animated Gauges – Smooth bars with glow and motion effects  
• Live Telemetry Simulation – Fake values auto-refresh every 2s  
• Customizable Settings – Toggle units (km/h ↔ mph), theme, animation speed  
• Dark/Light Theme Support – With smooth transition  
• Responsive Design – Mobile, tablet, desktop support  
• Smart Alerts – Engine temp, low fuel, abnormal tire pressure, RPM warnings  
• Live Map – Shows a moving vehicle marker using Leaflet.js  

━━━━━━━━━━━━━━━━━━━━
📁 Folder Structure
━━━━━━━━━━━━━━━━━━━━

car-telemetry-dashboard/
│
├── index.html
├── js/             → JavaScript modules (telemetry, settings, alerts etc.)
├── css/            → Styles & themes
├── assets/         → Fonts, icons, images
├── vendor/         → Leaflet, Chart.js, FontAwesome (optional local)
├── server.js       → Optional Node demo
├── start-dashboard.bat → Run locally (Windows)
├── README.txt

━━━━━━━━━━━━━━━━━━━━
🧠 Technologies Used
━━━━━━━━━━━━━━━━━━━━

• HTML5 + CSS3 + Modern JavaScript (ES6 Modules)  
• Leaflet.js for interactive maps  
• Chart.js (optional, future use)  
• Font Awesome icons  
• Flexbox, CSS Variables, Animations  

━━━━━━━━━━━━━━━━━━━━
💼 License
━━━━━━━━━━━━━━━━━━━━

✓ Free for personal use  
✓ Modify or include in your own projects  
✗ Do not redistribute or resell as-is  

━━━━━━━━━━━━━━━━━━━━
🙌 Credits
━━━━━━━━━━━━━━━━━━━━

Designed & developed by Fourlis Nikolaos Ioannis  
Inspired by BMW iDrive and modern automotive UIs
