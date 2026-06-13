// Matrix Rain Effect
const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#00ff41';
  ctx.font = `${fontSize}px monospace`;
  
  for (let i = 0; i < drops.length; i++) {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);
    
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Clock
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour12: false });
  document.getElementById('clock').textContent = time;
}
updateClock();
setInterval(updateClock, 1000);

// Terminal
const cmd = document.getElementById('cmd');
const output = document.getElementById('output');

const commands = {
  help: `Available commands:
  
  help        → Show this help message
  about       → About me
  projects    → List all projects
  skills      → My tech stack
  contact     → Get in touch
  social      → Social media links
  stats       → GitHub statistics
  repos       → Quick access to repos
  clear       → Clear terminal
  whoami      → System information
  matrix      → Toggle matrix effect
  quote       → Random hacker quote`,
  
  about: `Ghalang | Developer & Notaris
  
  ⚡ Professional notaris by day, passionate developer by night
  🐧 Linux enthusiast, Bash scripter, automation expert
  🛠️ Building production tools on Android Termux
  🎯 Mission: Automate everything, contribute to open source
  📍 Location: Serpong, Indonesia
  
  "Code should be secure, tested, and maintainable — not just working."`,
  
  projects: `Featured Projects:
  
  🕌 Jadwal Sholat        → Islamic prayer scheduler with audio
     Status: PRODUCTION | Tech: Bash, jq, mpv, curl
     https://github.com/ghalangwh-official/jadwal-sholat
  
  🔍 Crawler Shell        → Security-focused web crawler
     Status: PRODUCTION | Tech: Bash, curl, Tor
     https://github.com/ghalangwh-official/crawler-shell
  
  🎨 Termux Wallpaper     → AI-powered wallpaper generator
     Status: PRODUCTION | Tech: Bash, termux-api
     https://github.com/ghalangwh-official/termux-wallpaper
  
  🎵 Music Player         → Spotify-styled yt-dlp player
     Status: PRIVATE | Tech: Python, Flask, yt-dlp`,
  
  skills: `Tech Stack:
  
  Languages:
    • Bash (Expert)        • Python (Advanced)
    • JavaScript (Int)     • HTML/CSS (Advanced)
  
  Tools & Platforms:
    • Termux & Linux       • Git & GitHub
    • Docker & Cloudflare • Telegram Bots
  
  Frameworks:
    • Flask               • DaisyUI
    • Express.js          • Termux:API
  
  Specialties:
    • Automation & scripting
    • Web scraping & crawling
    • CLI tool development
    • Security testing`,
  
  contact: `Contact Information:
  
  📧 Email:   penggaraphandal@gmail.com
  🐱 GitHub:  github.com/ghalangwh-official
  🌐 Website: ghalangwh-official.github.io
  
  Open for:
    • Collaboration on open source projects
    • Automation consulting
    • Code reviews & mentoring`,
  
  social: `Social Media:
  
  🐱 GitHub:    github.com/ghalangwh-official
  🌐 Website:   ghalangwh-official.github.io
  📧 Email:     penggaraphandal@gmail.com
  
  Currently active on GitHub. Check out my repositories!`,
  
  stats: `GitHub Statistics:
  
  📈 Visit: github.com/ghalangwh-official
  
  Recent achievements:
    [2026-06-13] ✅ Security upgrade: crawler-shell (+2315 lines)
    [2026-06-13] ✅ Complete rewrite: termux-wallpaper
    [2026-06-13] ✅ Enhanced error handling: jadwal-sholat
    [2026-06-12] 🎨 Built Spotify-styled music player
    [2026-06-10] 🤖 Deployed Telegram bot`,
  
  repos: `Quick Repository Access:
  
  Type 'open <name>' to visit:
    • jadwal     → Jadwal Sholat (Prayer Scheduler)
    • crawler    → Crawler Shell (Web Security)
    • wallpaper  → Termux Wallpaper (AI Generator)
    • profile    → This profile page
  
  Or visit: github.com/ghalangwh-official`,
  
  whoami: `System Information:
  
  User:        ghalang
  Hostname:    termux-android
  OS:          Android 13 (Termux)
  Shell:       bash 5.2.15
  Location:    Serpong, Indonesia
  Timezone:    Asia/Jakarta (UTC+7)
  Terminal:    256-color, UTF-8
  Status:      🟢 ONLINE`,
  
  matrix: `Matrix rain effect toggled!
  (Refresh page to reset)`,
  
  quote: getRandomQuote()
};

const quotes = [
  '"Talk is cheap. Show me the code." - Linus Torvalds',
  '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
  '"First, solve the problem. Then, write the code." - John Johnson',
  '"The best error message is the one that never shows up." - Thomas Fuchs',
  '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler',
  '"If you do it twice, script it." - Unknown',
  '"Automation isn\'t lazy, it\'s efficient." - Ghalang',
  '"Code should be secure, tested, and maintainable — not just working." - Ghalang'
];

function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// Welcome message
const welcomeMsg = `Welcome to Ghalang's Terminal Interface
${'='.repeat(50)}

Type 'help' to see available commands.
Type 'projects' to view my work.

Initializing system... ✅ READY
`;

output.textContent = welcomeMsg;

function print(text) {
  output.textContent += '\n' + text;
  output.parentElement.scrollTop = output.parentElement.scrollHeight;
}

cmd.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const input = cmd.value.trim().toLowerCase();
    handleCommand(input);
    cmd.value = '';
  }
  
  // Tab completion
  if (e.key === 'Tab') {
    e.preventDefault();
    const partial = cmd.value.trim().toLowerCase();
    const matches = Object.keys(commands).filter(c => c.startsWith(partial));
    if (matches.length === 1) {
      cmd.value = matches[0];
    }
  }
});

function handleCommand(input) {
  print(`\ngod@ghalang:~$ ${input}`);
  
  if (!input) return;
  
  // Handle 'open' commands
  if (input.startsWith('open ')) {
    const repo = input.split(' ')[1];
    const repoMap = {
      'jadwal': 'jadwal-sholat',
      'crawler': 'crawler-shell',
      'wallpaper': 'termux-wallpaper',
      'profile': 'ghalangwh-official'
    };
    
    if (repoMap[repo]) {
      print(`Opening repository: ${repoMap[repo]}...`);
      setTimeout(() => {
        window.open(`https://github.com/ghalangwh-official/${repoMap[repo]}`, '_blank');
      }, 500);
      return;
    } else {
      print(`Repository '${repo}' not found. Type 'repos' for available repos.`);
      return;
    }
  }
  
  // Clear command
  if (input === 'clear') {
    output.textContent = '';
    return;
  }
  
  // Handle regular commands
  if (commands[input]) {
    print(commands[input]);
  } else {
    print(`Command not found: ${input}`);
    print(`Type 'help' for available commands.`);
  }
}

// Easter eggs
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  
  if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
    print('\n🎮 GOD MODE ACTIVATED!');
    print('Achievement unlocked: Konami Code Master');
    document.body.style.animation = 'glow 0.5s ease-in-out 3';
    konamiCode = [];
  }
});

// Update quote periodically
setInterval(() => {
  const quoteEl = document.getElementById('quote');
  if (quoteEl) {
    quoteEl.textContent = getRandomQuote();
  }
}, 30000); // Every 30 seconds
