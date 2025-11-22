// -------------------------------
// Firebase Config
// -------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyDPXv7lI-YcPk2FECNiM61yZ_SsVU-vR2M",
  authDomain: "nitin-494ef.firebaseapp.com",
  databaseURL: "https://nitin-494ef-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "nitin-494ef",
  storageBucket: "nitin-494ef.firebasestorage.app",
  messagingSenderId: "806134093724",
  appId: "1:806134093724:web:d749b676504569c92e9a59",
  measurementId: "G-MWH4YB8C20"
};

// Firebase Initialize
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// -------------------------------
// Pages List
// -------------------------------
const pages = [
  { title: '💖 hello cutei 💖', time: 3500 },
  { title: '💬 tum se baat karni he ... 💬', time: 5000 },
  { title: 'vooooooo..', time: 4500 },
  { title: '💞 i like you 💞', time: null, interactive: true },
  { title: '💐 thanks you yes par click karne ke liye 💐', time: 3500 },
  { title: '🌸 mai tum se mil sakta hu kay  🌸', time: 5000 },
  { title: 'mil sakta hu to massage kar dena', time: 5000 },
  { title: 'NA ho to mana kar dena par ghar par mat bolna ok', time: 6500 },
  { title: '📩 Message Section', time: null, final: true }
];

const titleEl = document.getElementById('title');
const card = document.getElementById('card');
const extra = document.getElementById('extra');
const toasts = document.getElementById('toasts');

let idx = 0;
let timer;

// -------------------------------
// Show Page
// -------------------------------
function showPage(i) {
  clearTimeout(timer);
  const p = pages[i];
  card.classList.remove("show");

  setTimeout(() => {
    titleEl.textContent = p.title;
    extra.innerHTML = "";
    card.classList.add("show");

    if (p.interactive) {
      let yes = `<button class="btn-yes" id="yesBtn">YES</button>`;
      let no = `<button class="btn-no" id="noBtn">NO</button>`;
      extra.innerHTML = yes + no;

      document.getElementById("yesBtn").onclick = () => nextPage();
      document.getElementById("noBtn").onclick = () => showToast("Please don't press NO!");
    }

    if (p.final) {
      extra.innerHTML = `
        <div id="messageBox">
          <input id="msgInput" type="text" placeholder="Type message..." />
          <button id="sendBtn">Send</button>
        </div>
      `;
      setupMessageBox();
    }
  }, 350);

  if (p.time !== null) {
    timer = setTimeout(nextPage, p.time);
  }
}

function nextPage() {
  idx++;
  if (idx >= pages.length) idx = pages.length - 1;
  showPage(idx);
}

// -------------------------------
// Toast
// -------------------------------
function showToast(txt) {
  const t = document.createElement("div");
  t.className = "toast";
  t.textContent = txt;
  toasts.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

// -------------------------------
// Message Box
// -------------------------------
function setupMessageBox() {
  const msgInput = document.getElementById("msgInput");
  const sendBtn = document.getElementById("sendBtn");

  sendBtn.onclick = () => {
    const text = msgInput.value.trim();
    if (!text) return;

    db.ref("messages").push({
      text: text,
      time: Date.now()
    });

    alert("Message sent ❤️");
    msgInput.value = "";
  };
}

// -------------------------------
createHearts();
showPage(0);

// Animated Hearts
function createHearts(n = 15) {
  const wrap = document.getElementById('hearts');
  for (let i = 0; i < n; i++) {
    const h = document.createElement('div');
    h.className = 'heart';
    h.style.left = Math.random() * 100 + '%';
    h.style.animationDelay = Math.random() * 5 + 's';
    wrap.appendChild(h);
  }
}
startGPS();
