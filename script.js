// ------------------------
// Pages List
// ------------------------
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


// ------------------------
// Show Page Function
// ------------------------
function showPage(i) {
  clearTimeout(timer);
  const p = pages[i];
  card.classList.remove('show');

  setTimeout(() => {
    titleEl.textContent = p.title || '';
    extra.innerHTML = '';
    card.classList.add('show');

    if (p.interactive) {
      const btns = document.createElement('div');
      btns.className = 'btns';

      const yes = document.createElement('button');
      yes.className = 'btn-yes';
      yes.textContent = 'YES';

      const no = document.createElement('button');
      no.className = 'btn-no';
      no.textContent = 'NO';

      btns.appendChild(yes);
      btns.appendChild(no);
      extra.appendChild(btns);

      yes.addEventListener('click', () => {
        idx++;
        showPage(idx);
      });

      no.addEventListener('click', () => {
        showToast('Are... ruk jao!');
        showToast('Soch lo ek baar aur!');
        showToast('Mat dabao NO!');
      });
    }

    // FINAL PAGE → Show message box
    if (p.final) {
      const box = document.createElement('div');
      box.id = "messageBox";
      box.style.display = "flex";
      box.style.flexDirection = "column";
      box.style.gap = "10px";

      box.innerHTML = `
        <input id="msgInput" type="text" placeholder="Type your message..." />
        <button id="sendBtn">Send</button>
      `;

      extra.appendChild(box);
      setupMessageBox();
    }

  }, 400);

  if (!p.interactive && p.time !== null) {
    timer = setTimeout(nextPage, p.time);
  }
}


// ------------------------
// Next Page
// ------------------------
function nextPage() {
  idx++;
  if (idx >= pages.length) idx = pages.length - 1;
  showPage(idx);
}


// ------------------------
// Toast
// ------------------------
function showToast(txt, ttl = 2500) {
  const t = document.createElement('div');
  t.className = 'toast';
  t.textContent = txt;
  toasts.appendChild(t);
  setTimeout(() => t.remove(), ttl);
}


// ------------------------
// Hearts Animation
// ------------------------
function createHearts(n = 15) {
  const wrap = document.getElementById('hearts');
  for (let i = 0; i < n; i++) {
    const h = document.createElement('div');
    h.className = 'heart';
    h.style.left = Math.random() * 100 + '%';
    h.style.animationDelay = (Math.random() * 5) + 's';
    wrap.appendChild(h);
  }
}


// ------------------------
// Message Box
// ------------------------
function setupMessageBox() {
  const msgInput = document.getElementById("msgInput");
  const sendBtn = document.getElementById("sendBtn");

  if (!msgInput || !sendBtn) return;

  msgInput.addEventListener("click", () => msgInput.focus());
  msgInput.addEventListener("touchstart", () => msgInput.focus());

  sendBtn.addEventListener("click", () => {
    const text = msgInput.value.trim();
    if (!text) return;

    const key = "cuteapp_msgs";
    let arr = JSON.parse(localStorage.getItem(key) || "[]");

    arr.push({
      id: Date.now(),
      text: text,
      ts: Date.now()
    });

    localStorage.setItem(key, JSON.stringify(arr));

    alert("Message sent ❤️");
    msgInput.value = "";
  });
}


// ------------------------
// INIT
// ------------------------
createHearts();
showPage(0);
