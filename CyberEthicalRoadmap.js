(() => {
"use strict";

const W=[
{t:"Networking basics",g:"Explain what happens when you open a website",c:["Watch Professor Messer free Network+ videos: OSI model, TCP/IP, DNS, HTTP, ports","Do TryHackMe Pre-Security path: Networking rooms","Install Wireshark and capture your own browsing traffic","Practice subnetting (free on subnetting.net or Cisco Networking Academy)","Write a one-page note: what happens when I open google.com"]},
{t:"Linux fundamentals",g:"Work comfortably in a terminal",c:["Do TryHackMe Linux Fundamentals parts 1-3","Play OverTheWire Bandit levels 0-10","Read Linux Journey free lessons: files, permissions, users, processes","Make your own cheat sheet of 30 commands (ls, cd, grep, chmod, ps...)"]},
{t:"Home lab, Windows and security basics",g:"Working lab and clear on the CIA triad",c:["Install VirtualBox, then a Kali Linux VM (free image from kali.org)","Add a Windows 10/11 evaluation VM (free from Microsoft)","Do TryHackMe Windows Fundamentals 1-3","Do TryHackMe Intro to Cyber Security","Start ISC2 Certified in Cybersecurity (CC) free self-paced course: Domain 1","Create a GitHub account and a repo for your notes"]},
{t:"Scripting with Python",g:"2 small scripts on GitHub",c:["Learn Python basics: freeCodeCamp Python course (YouTube) or Automate the Boring Stuff (free online)","Write a simple port scanner using sockets","Write a log parser that counts failed logins","Push both scripts to GitHub with a README"]},
{t:"Web security",g:"Solve 10 labs",c:["Do TryHackMe OWASP Top 10 room","Read PortSwigger Web Security Academy: SQL injection","Solve 5 SQL injection labs on PortSwigger","Solve 5 XSS labs on PortSwigger"]},
{t:"Crypto, authentication and defenses",g:"Understand how defenses work",c:["Watch Professor Messer Security+ videos: cryptography and identity","Do TryHackMe Cryptography and Hashing rooms","Do TryHackMe Firewalls and IDS/IPS intro rooms","Continue ISC2 CC free course: Domains 2-3"]},
{t:"Red team taste",g:"Hack 3 beginner machines",c:["Do TryHackMe Nmap room and scan your own lab VMs","Do TryHackMe Metasploit intro room","Complete 3 easy rooms or machines (TryHackMe or picoCTF)","Write up 1 machine in your own words"]},
{t:"Blue team taste and review",g:"Investigate 2 sample incidents and note your strengths",c:["Do TryHackMe SOC Level 1 intro rooms","Install Wazuh (free) or use Splunk free training, and view logs","Analyze 2 phishing emails (headers, links) using free tools","Review weeks 1-8: redo one old lab without hints. Weeks 9-12 cover both Blue and Red"]},
{t:"Specialize 1",g:"Build core skills on both sides",b:["Learn MITRE ATT&CK basics (attack.mitre.org, free)","TryHackMe Threat Intelligence rooms","Map 3 real attacks to ATT&CK techniques","Write 1 Sigma detection rule"],r:["TryHackMe Linux Privilege Escalation room","TryHackMe Windows Privilege Escalation room","Study enumeration methodology (HackTricks, free)","Root 2 machines using privilege escalation"]},
{t:"Specialize 2",g:"Hands-on with core tools",b:["TryHackMe Incident Response rooms","Analyze a sample in ANY.RUN and VirusTotal (free tiers)","Practice on CyberDefenders or Blue Team Labs Online free challenges","Write 1 incident report"],r:["Learn Burp Suite (PortSwigger free Community edition)","10 more PortSwigger labs with Burp","TryHackMe Active Directory basics rooms","Hack The Box Academy free modules"]},
{t:"Build a portfolio project",g:"One real project with a write-up",b:["Build a home SIEM lab (Wazuh) and ingest logs","Simulate 3 attacks from Kali and create detections","Document with screenshots","Publish write-up on GitHub or a blog"],r:["Complete 4-5 machines on Hack The Box or TryHackMe","Write a walkthrough for each","Publish all walkthroughs on GitHub or a blog","Try a beginner CTF event (CTFtime.org)"]},
{t:"Job prep and certification",g:"Resume ready, applications sent, Security+ plan set",c:["Write your resume with your labs, projects, and write-ups","Update LinkedIn and connect with 10 people in security","Apply to 10 entry roles (SOC Analyst L1 / Help desk / Junior Pentester)","Start Security+ study using Professor Messer free videos"]}
];
const C=[
{n:"ISC2 Certified in Cybersecurity (CC)",s:"Weeks 3-8",d:"Best first cert. ISC2 has offered free training and exam through its one million certified campaign; check isc2.org for current availability.",p:"Free (check)"},
{n:"Google Cybersecurity Certificate",s:"Optional, alongside",d:"Beginner course on Coursera. Audit for free or apply for financial aid.",p:"Free to audit"},
{n:"CompTIA Security+",s:"Months 3-5",d:"The most requested entry-level cert. Study free with Professor Messer, then pay for the exam.",p:"Paid exam"},
{n:"Blue: CompTIA CySA+ or BTL1 (Security Blue Team)",s:"Months 6-9",d:"SOC analyst and incident response focus. BTL1 is practical and hands-on.",p:"Paid"},
{n:"Red: eJPT (INE), then PNPT (TCM Security)",s:"Months 6-12",d:"Practical pentesting exams, ideal after Security+ and lab practice.",p:"Paid"},
{n:"Later: Splunk Core Certified User, CCNA, OSCP, CISSP (needs experience)",s:"Year 2 and beyond",d:"Choose based on the job you hold or want.",p:"Mostly paid"}
];
const R=[["Networking","Professor Messer (YouTube), Cisco Networking Academy, TryHackMe Pre-Security"],["Linux","OverTheWire Bandit, Linux Journey, TryHackMe Linux Fundamentals"],["Hands-on labs","TryHackMe (free rooms), Hack The Box Academy (free tier), picoCTF, PortSwigger Web Security Academy"],["Blue team practice","CyberDefenders, Blue Team Labs Online (free tier), LetsDefend free tier, Splunk free training, Wazuh"],["Programming","freeCodeCamp, Automate the Boring Stuff with Python"],["Cert study","Professor Messer Security+ and Network+ videos, ISC2 CC free course"],["Reference","MITRE ATT&CK, OWASP, HackTricks, CTFtime.org"],["Community","Reddit r/cybersecurity and r/blueteamsec, TryHackMe and HTB Discord servers"]];

const STORAGE_KEY = "cyber_roadmap_v1";
const state = loadState();
const planElement = document.getElementById("plan");
const resourcesElement = document.getElementById("res");
const certificationsElement = document.getElementById("cert");
const progressBar = document.getElementById("pb");
const progressText = document.getElementById("pt");

function loadState() {
  try {
    const savedState = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    if (!savedState || typeof savedState !== "object" || Array.isArray(savedState)) {
      return { x: {}, t: "blue" };
    }

    return {
      x: savedState.x && typeof savedState.x === "object" && !Array.isArray(savedState.x)
        ? savedState.x
        : {},
      t: typeof savedState.t === "string" ? savedState.t : "blue"
    };
  } catch (error) {
    console.warn("Could not read saved roadmap progress; starting with an empty plan.", error);
    return { x: {}, t: "blue" };
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Could not save roadmap progress in this browser.", error);
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, function (character) {
    return {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[character];
  });
}

function createTaskCheckbox(id, text) {
  const completed = Boolean(state.x[id]);
  return '<label class="' + (completed ? "d" : "") + '">' +
    '<input type="checkbox" data-id="' + id + '"' + (completed ? " checked" : "") + '>' +
    "<span>" + escapeHtml(text) + "</span></label>";
}

function getWeekTaskIds(week, weekIndex) {
  if (week.c) {
    return week.c.map(function (_, taskIndex) {
      return "w" + weekIndex + "c" + taskIndex;
    });
  }

  return week.b.map(function (_, taskIndex) {
    return "w" + weekIndex + "b" + taskIndex;
  }).concat(week.r.map(function (_, taskIndex) {
    return "w" + weekIndex + "r" + taskIndex;
  }));
}

function renderPlan() {
  planElement.innerHTML = W.map(function (week, weekIndex) {
    let markup = '<div class="card"><div class="wk"><h2>Week ' +
      (weekIndex + 1) + ": " + escapeHtml(week.t) +
      '</h2><small id="wc' + weekIndex + '"></small></div><div class="g">Goal: ' +
      escapeHtml(week.g) + "</div>";

    if (week.c) {
      markup += week.c.map(function (task, taskIndex) {
        return createTaskCheckbox("w" + weekIndex + "c" + taskIndex, task);
      }).join("");
    } else {
      markup += '<div class="tag b">Blue team (defense)</div>';
      markup += week.b.map(function (task, taskIndex) {
        return createTaskCheckbox("w" + weekIndex + "b" + taskIndex, task);
      }).join("");
      markup += '<div class="tag r">Red team (ethical hacking)</div>';
      markup += week.r.map(function (task, taskIndex) {
        return createTaskCheckbox("w" + weekIndex + "r" + taskIndex, task);
      }).join("");
    }

    return markup + "</div>";
  }).join("");
}

function renderResources() {
  const resourceRows = R.map(function (resource) {
    return "<tr><td><b>" + escapeHtml(resource[0]) + "</b></td><td>" +
      escapeHtml(resource[1]) + "</td></tr>";
  }).join("");

  resourcesElement.innerHTML =
    '<div class="card sc"><table><tr><th>Topic</th><th>Free sources</th></tr>' +
    resourceRows +
    "</table></div>" +
    '<div class="card"><b>Daily routine (4-6 hours; 5 hours shown)</b>' +
    "<ul><li>1.5 h theory (videos, reading the notes)</li>" +
    "<li>2.5-3 h hands-on labs</li><li>30 min notes or write-up</li>" +
    "<li>30 min revision (flashcards, redo an old lab)</li></ul>" +
    "Take a 10-minute break each hour and 1 rest day each week. On 4-hour days, " +
    "shorten theory; on 6-hour days, add one more lab or CTF.</div>";
}

function renderCertifications() {
  const certificationCards = C.map(function (certification, index) {
    return '<div class="card">' + createTaskCheckbox("c" + index, certification.n) +
      '<div class="g cert-details">' + escapeHtml(certification.s) + " · " +
      escapeHtml(certification.p) + "<br>" + escapeHtml(certification.d) + "</div></div>";
  }).join("");

  certificationsElement.innerHTML =
    '<div class="card">Tick each cert when you pass it. Study order matters: ' +
    "start free, then move to paid exams.</div>" + certificationCards;
}

function updateProgress() {
  let totalTasks = 0;
  let completedTasks = 0;

  W.forEach(function (week, weekIndex) {
    const taskIds = getWeekTaskIds(week, weekIndex);
    const completed = taskIds.filter(function (id) {
      return state.x[id];
    }).length;

    totalTasks += taskIds.length;
    completedTasks += completed;
    document.getElementById("wc" + weekIndex).textContent =
      completed + "/" + taskIds.length;
  });

  C.forEach(function (_, index) {
    totalTasks += 1;
    if (state.x["c" + index]) {
      completedTasks += 1;
    }
  });

  const percentage = totalTasks
    ? Math.round(completedTasks / totalTasks * 100)
    : 0;
  progressBar.style.width = percentage + "%";
  progressText.textContent = percentage + "% complete (" + completedTasks +
    " of " + totalTasks + " tasks)";
}

function renderRoadmap() {
  renderPlan();
  renderResources();
  renderCertifications();
  updateProgress();
}

document.addEventListener("change", function (event) {
  const checkbox = event.target;
  if (!(checkbox instanceof HTMLInputElement) || !checkbox.dataset.id) {
    return;
  }

  if (checkbox.checked) {
    state.x[checkbox.dataset.id] = 1;
  } else {
    delete state.x[checkbox.dataset.id];
  }

  checkbox.closest("label").classList.toggle("d", checkbox.checked);
  saveState();
  updateProgress();
});

document.querySelector(".tabs").addEventListener("click", function (event) {
  const button = event.target.closest("button[data-v]");
  if (!button) {
    return;
  }

  document.querySelectorAll(".tabs button").forEach(function (tab) {
    tab.classList.toggle("on", tab === button);
  });
  ["plan", "res", "cert"].forEach(function (sectionId) {
    document.getElementById(sectionId).classList.toggle("hide", sectionId !== button.dataset.v);
  });
});

document.getElementById("rs").addEventListener("click", function () {
  if (!window.confirm("Clear all ticks?")) {
    return;
  }

  state.x = {};
  saveState();
  renderRoadmap();
});

renderRoadmap();
})();
