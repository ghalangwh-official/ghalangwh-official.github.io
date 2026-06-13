const tags = [
  { label: "Focus", value: "Automation" },
  { label: "Surface", value: "Termux + Web" },
  { label: "Stack", value: "Bash / Python / JS" },
  { label: "Mode", value: "Low bug / production-minded" },
];

const metrics = [
  {
    value: "Open source",
    label: "Shipping public repos with practical utility instead of filler projects.",
  },
  {
    value: "Android-first",
    label: "Built to work well from Termux and a phone-sized workflow.",
  },
  {
    value: "Security-aware",
    label: "Prefer explicit flows, input validation, and safe defaults.",
  },
  {
    value: "GitHub Pages",
    label: "Static, fast, low maintenance, and easy to keep alive.",
  },
];

const projects = [
  {
    name: "Jadwal Sholat",
    status: "Public repo",
    description: "Prayer time scheduler with audio-driven workflow and practical Termux-friendly automation.",
    tags: ["Bash", "jq", "mpv", "Automation"],
    url: "https://github.com/ghalangwh-official/jadwal-sholat",
  },
  {
    name: "Crawler Shell",
    status: "Public repo",
    description: "Security-oriented crawler focused on usable workflows, clear controls, and lower-maintenance scripting.",
    tags: ["Security", "Shell", "Crawling", "Tools"],
    url: "https://github.com/ghalangwh-official/crawler-shell",
  },
  {
    name: "Termux Wallpaper",
    status: "Public repo",
    description: "Android wallpaper tooling built around fast iteration, automation, and simple end-user flow.",
    tags: ["Android", "Automation", "Termux", "UX"],
    url: "https://github.com/ghalangwh-official/termux-wallpaper",
  },
  {
    name: "ACA Civilization OS",
    status: "Public repo",
    description: "A broader systems repo that shows real architecture work, services, and orchestration thinking.",
    tags: ["Systems", "Architecture", "Services", "Platform"],
    url: "https://github.com/ghalangwh-official/aca-civilization-os",
  },
];

const principles = [
  {
    title: "Explicit over clever",
    text: "Prefer predictable flows, obvious naming, and code paths that are easy to trace later.",
  },
  {
    title: "Low bug surfaces",
    text: "Keep interactive UI simple, validate inputs early, and fail gracefully when something is missing.",
  },
  {
    title: "Mobile-first constraints",
    text: "Design for Android and narrow screens first, then scale the layout up to desktop.",
  },
  {
    title: "Maintainable showcase",
    text: "Use static hosting, clean sections, and content that can be updated without a rebuild chain.",
  },
];

const quotes = [
  "If you do it twice, script it.",
  "Automation is only useful if it is boring when it works.",
  "Code should be clear enough to survive your future self.",
  "Useful beats flashy when the goal is shipping.",
];

const commandResponses = {
  help: `Available commands:

help      show this help
about     short bio
projects  list featured repos
stack     show the core stack
contact   show contact links
signal    show current focus
quote     rotate a short quote
clear     clear the console
open <x>  open a repo (jadwal, crawler, wallpaper, academy, profile)`,
  about: `Ghalang

Notaris by day.
Builder by night.
I ship practical tools, mobile-friendly automation, and repos that are meant to stay alive.`,
  projects: `Featured repos:

1. Jadwal Sholat
2. Crawler Shell
3. Termux Wallpaper
4. ACA Civilization OS

Use: open jadwal | open crawler | open wallpaper | open academy | open profile`,
  stack: `Core stack:

Bash
Python
JavaScript
HTML / CSS
Git / GitHub
Termux / Linux`,
  contact: `Contact:

Email: penggaraphandal@gmail.com
GitHub: github.com/ghalangwh-official
Site: ghalangwh-official.github.io`,
  signal: `Current signal:

- keep the repo fast
- keep the UI readable
- keep the surface modern
- keep the behavior predictable`,
  quote: () => quotes[Math.floor(Math.random() * quotes.length)],
};

const repoMap = {
  jadwal: "jadwal-sholat",
  crawler: "crawler-shell",
  wallpaper: "termux-wallpaper",
  academy: "aca-civilization-os",
  profile: "ghalangwh-official",
};

const tagRow = document.getElementById("tag-row");
const metricGrid = document.getElementById("metric-grid");
const projectGrid = document.getElementById("project-grid");
const principleList = document.getElementById("principle-list");
const output = document.getElementById("output");
const cmd = document.getElementById("cmd");
const quote = document.getElementById("quote");
const clearBtn = document.getElementById("clear-btn");

function renderTags() {
  tagRow.innerHTML = tags
    .map((tag) => `<span class="tag"><strong>${tag.label}</strong> ${tag.value}</span>`)
    .join("");
}

function renderMetrics() {
  metricGrid.innerHTML = metrics
    .map(
      (metric) => `
        <article class="metric">
          <p class="metric-value">${metric.value}</p>
          <p class="metric-label">${metric.label}</p>
        </article>
      `
    )
    .join("");
}

function renderProjects() {
  projectGrid.innerHTML = projects
    .map(
      (project) => `
        <article class="panel-card project-card">
          <div class="project-top">
            <div>
              <p class="kicker">Selected repo</p>
              <h3 class="project-name">${project.name}</h3>
              <p class="project-desc">${project.description}</p>
            </div>
            <span class="project-badge">${project.status}</span>
          </div>
          <div class="project-meta">
            ${project.tags.map((tag) => `<span class="project-tag">${tag}</span>`).join("")}
          </div>
          <div class="project-actions">
            <span class="mono-muted">${project.url.replace("https://", "")}</span>
            <a class="project-link" href="${project.url}" target="_blank" rel="noreferrer">Open repo</a>
          </div>
        </article>
      `
    )
    .join("");
}

function renderPrinciples() {
  principleList.innerHTML = principles
    .map(
      (principle) => `
        <div class="principle-item">
          <h3>${principle.title}</h3>
          <p>${principle.text}</p>
        </div>
      `
    )
    .join("");
}

function setQuote() {
  quote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
}

function writeLine(text = "") {
  output.textContent += `${text}\n`;
  output.parentElement.scrollTop = output.parentElement.scrollHeight;
}

function setIntro() {
  output.textContent = [
    "Ghalang / modern builder / GitHub Pages",
    "--------------------------------------",
    "Type `help` for commands.",
    "Type `projects` to list selected repos.",
    "Type `open <repo>` to jump to a repo.",
    "",
    "Status: ready",
  ].join("\n");
}

function normalizeCommand(raw) {
  return raw.trim().toLowerCase();
}

function runCommand(rawInput) {
  const input = normalizeCommand(rawInput);

  if (!input) {
    return;
  }

  writeLine(`> ${input}`);

  if (input === "clear") {
    output.textContent = "";
    return;
  }

  if (input.startsWith("open ")) {
    const target = input.split(/\s+/)[1];
    const repo = repoMap[target];

    if (!repo) {
      writeLine(`Unknown target: ${target}`);
      writeLine("Try: open jadwal | open crawler | open wallpaper | open academy | open profile");
      return;
    }

    const url = target === "profile"
      ? "https://github.com/ghalangwh-official"
      : `https://github.com/ghalangwh-official/${repo}`;

    writeLine(`Opening ${url}`);
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }

  const response = commandResponses[input];
  if (typeof response === "function") {
    writeLine(response());
    return;
  }

  if (response) {
    writeLine(response);
    return;
  }

  writeLine("Unknown command. Type `help` for the command list.");
}

function updateClock() {
  const now = new Date();
  document.title = `Ghalang | ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}

renderTags();
renderMetrics();
renderProjects();
renderPrinciples();
setIntro();
setQuote();
updateClock();

setInterval(updateClock, 1000);
setInterval(setQuote, 20000);

cmd.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    runCommand(cmd.value);
    cmd.value = "";
  }

  if (event.key === "Tab") {
    event.preventDefault();
    const partial = normalizeCommand(cmd.value);
    const matches = Object.keys(commandResponses).filter((command) => command.startsWith(partial));

    if (matches.length === 1) {
      cmd.value = matches[0];
    }
  }
});

document.querySelectorAll("[data-command]").forEach((button) => {
  button.addEventListener("click", () => {
    const command = button.getAttribute("data-command");
    if (!command) {
      return;
    }

    cmd.value = command;
    runCommand(command);
    cmd.value = "";
    cmd.focus();
  });
});

clearBtn.addEventListener("click", () => {
  output.textContent = "";
  cmd.focus();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    cmd.blur();
  }
});
