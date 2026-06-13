const tags = [
  { label: "Focus", value: "Production systems" },
  { label: "Surface", value: "Go + Docker + Web" },
  { label: "Stack", value: "Go / Bash / Python / JS" },
  { label: "Mode", value: "Observable / Security-first" },
];

const metrics = [
  {
    value: "Production-ready",
    label: "Shipping observable, well-tested systems with proper error handling and security.",
  },
  {
    value: "Go + Docker",
    label: "Modern backend stack — api-gateway built with Go 1.21, PostgreSQL, Redis, Docker.",
  },
  {
    value: "Security-first",
    label: "Input validation, bcrypt hashing, rate limiting, and comprehensive security testing.",
  },
  {
    value: "Observable",
    label: "Prometheus metrics, Grafana dashboards, structured logs, and health checks.",
  },
];

const projects = [
  {
    name: "API Gateway",
    status: "Production-ready",
    description: "Self-hosted API proxy with rate limiting, quota management, caching, and full observability. Built with Go, PostgreSQL, Redis.",
    tags: ["Go", "PostgreSQL", "Redis", "Docker"],
    url: "https://github.com/ghalangwh-official/api-gateway",
    featured: true
  },
  {
    name: "Jadwal Sholat",
    status: "Public repo",
    description: "Prayer time scheduler with audio-driven workflow, error handling, and trap cleanup for production reliability.",
    tags: ["Bash", "jq", "mpv", "Automation"],
    url: "https://github.com/ghalangwh-official/jadwal-sholat",
  },
  {
    name: "Crawler Shell",
    status: "Security-hardened",
    description: "Web crawler with critical input validation, command injection prevention, and comprehensive security test suite.",
    tags: ["Security", "Bash", "Testing", "Hardening"],
    url: "https://github.com/ghalangwh-official/crawler-shell",
  },
  {
    name: "Termux Wallpaper",
    status: "Refactored",
    description: "AI wallpaper generator with proper error handling, retry logic, automatic cleanup, and history tracking.",
    tags: ["Bash", "API", "Error Handling", "UX"],
    url: "https://github.com/ghalangwh-official/termux-wallpaper",
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

help          show this help
about         short bio
projects      list featured repos
stack         show the core stack
contact       show contact links
signal        show current focus
quote         rotate a short quote
clear         clear the console
open <repo>   open a repo

Examples:
  open api-gateway
  open jadwal
  open crawler
  open wallpaper`,
  about: `Ghalang

Notaris by day.
Builder by night.
I ship practical tools, mobile-friendly automation, and repos that are meant to stay alive.`,
  projects: `Featured repos:

1. API Gateway       → Production-grade API proxy (Go, PostgreSQL, Redis)
2. Jadwal Sholat     → Prayer scheduler with error handling (Bash)
3. Crawler Shell     → Security-hardened web crawler (Bash, Testing)
4. Termux Wallpaper  → AI wallpaper generator (Bash, API)

Type: open <name> to visit (e.g., open api-gateway)`,
  stack: `Core stack:

Go 1.21+         (api-gateway, systems programming)
Bash             (automation, CLI tools)
Python           (scripting, Flask apps)
JavaScript       (web UI, interactive demos)
HTML / CSS       (modern design, GitHub Pages)
PostgreSQL       (transactional data, quotas)
Redis            (rate limiting, caching)
Docker           (containerization, deployment)
Prometheus       (metrics, observability)
Grafana          (dashboards, visualization)
Git / GitHub     (version control, CI/CD)`,
  contact: `Contact:

Email: penggaraphandal@gmail.com
GitHub: github.com/ghalangwh-official
Site: ghalangwh-official.github.io`,
  signal: `Current signal:

- Production-ready code (api-gateway live)
- Security-first approach (input validation, testing)
- Observable systems (Prometheus, Grafana, structured logs)
- Docker-native deployment
- Comprehensive documentation

Recent: 3 repos upgraded (2300+ lines hardened)
Next: Test coverage + Railway deploy`,
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
  if (!tagRow) return;
  tagRow.innerHTML = tags
    .map((tag) => `<span class="tag"><strong>${tag.label}</strong> ${tag.value}</span>`)
    .join("");
}

function renderMetrics() {
  if (!metricGrid) return;
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
  if (!projectGrid) return;
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
  if (!principleList) return;
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
  if (!quote) return;
  quote.textContent = quotes[Math.floor(Math.random() * quotes.length)];
}

function writeLine(text = "") {
  if (!output) return;
  output.textContent += `${text}\n`;
  output.parentElement.scrollTop = output.parentElement.scrollHeight;
}

function setIntro() {
  if (!output) return;
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

if (cmd) {
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
}

document.querySelectorAll("[data-command]").forEach((button) => {
  button.addEventListener("click", () => {
    const command = button.getAttribute("data-command");
    if (!command || !cmd) {
      return;
    }

    cmd.value = command;
    runCommand(command);
    cmd.value = "";
    cmd.focus();
  });
});

if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    if (output) {
      output.textContent = "";
    }
    cmd?.focus();
  });
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    cmd?.blur();
  }
});
