
const items = [
  {
    title: "Grand Theft Auto V",
    type: "game",
    subtitle: "عالم مفتوح ومغامرات",
    detail: "استكشف مدينة Los Santos وخض مغامرات GTA V على PS3.",
    symbol: "GTA V",
    color: "linear-gradient(135deg,#3c704c,#14271f)",
    size: "PS3",
    url: ""
  },
  {
    title: "Resident Evil 4",
    type: "game",
    subtitle: "رعب وبقاء",
    detail: "مغامرة مليئة بالتشويق والألغاز في عالم Resident Evil.",
    symbol: "RE 4",
    color: "linear-gradient(135deg,#78452f,#211a25)",
    size: "PS3",
    url: ""
  },
  {
    title: "Half-Life",
    type: "game",
    subtitle: "خيال علمي وتصويب",
    detail: "اكتشف أسرار Black Mesa في لعبة التصويب الكلاسيكية.",
    symbol: "λ",
    color: "linear-gradient(135deg,#bd792e,#35231c)",
    size: "حسب النسخة",
    url: ""
  },
  {
    title: "Limbo",
    type: "game",
    subtitle: "مغامرة وألغاز للأندرويد",
    detail: "ادخل عالم LIMBO الغامض واكتشف الألغاز والأسرار. تحقق من توافق الملف ومصدره قبل التثبيت.",
    symbol: "LIMBO",
    color: "linear-gradient(135deg,#4b5868,#151b24)",
    size: "Android • APK",
    url: "https://www.mediafire.com/file/y2zupsfgn4gy3ex/LIMBO+PAID+EDITION+FOR+FREE.apk/file"
  },
  {
    title: "Blue Neon",
    type: "theme",
    subtitle: "ثيم أزرق عصري",
    detail: "تصميم تجريبي بألوان زرقاء لجهاز PS3.",
    symbol: "BLUE",
    color: "linear-gradient(135deg,#1477a8,#141d50)",
    size: ".p3t",
    url: ""
  },
  {
    title: "Midnight Black",
    type: "theme",
    subtitle: "ثيم داكن أنيق",
    detail: "تصميم تجريبي داكن لعشاق البساطة.",
    symbol: "NIGHT",
    color: "linear-gradient(135deg,#414a5a,#090b10)",
    size: ".p3t",
    url: ""
  },
  {
    title: "Cyber Purple",
    type: "theme",
    subtitle: "بنفسجي مستقبلي",
    detail: "تصميم تجريبي مستوحى من ألوان السايبر.",
    symbol: "CYBER",
    color: "linear-gradient(135deg,#7547b7,#171a42)",
    size: ".p3t",
    url: ""
  },
  {
    title: "Classic Play",
    type: "theme",
    subtitle: "ستايل كلاسيكي",
    detail: "ثيم تجريبي مستوحى من أجواء الألعاب الكلاسيكية.",
    symbol: "CLASSIC",
    color: "linear-gradient(135deg,#c54e64,#32223f)",
    size: ".p3t",
    url: ""
  }
];

const cards = document.getElementById("cards");
const search = document.getElementById("search");
const empty = document.getElementById("empty");
let activeFilter = "all";

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[c]));
}

function escapeAttr(s) {
  return escapeHtml(s);
}

function render() {
  const query = search.value.trim().toLowerCase();

  const filtered = items.filter(item => {
    const matchesType =
      activeFilter === "all" || item.type === activeFilter;

    const text =
      `${item.title} ${item.subtitle} ${item.detail}`.toLowerCase();

    return matchesType && text.includes(query);
  });

  cards.innerHTML = filtered.map(item => {
    const isGame = item.type === "game";
    const url =
      item.url && /^https?:\/\//i.test(item.url)
        ? item.url
        : "";

    const action = url
      ? `<a class="card-link" href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer">فتح الرابط ↗</a>`
      : `<span class="card-link" title="لا يوجد رابط حاليًا">قريبًا</span>`;

    return `
      <article class="game-card">
        <div class="cover" style="--cover:${item.color}">
          <span class="type-tag">${isGame ? "لعبة" : "ثيم PS3"}</span>
          <span class="cover-symbol">${escapeHtml(item.symbol)}</span>
        </div>
        <div class="card-body">
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.subtitle)} — ${escapeHtml(item.detail)}</p>
          <div class="card-meta">
            <span>${escapeHtml(item.size)}</span>
            ${action}
          </div>
        </div>
      </article>
    `;
  }).join("");

  empty.hidden = filtered.length !== 0;

  document.getElementById("game-count").textContent =
    items.filter(x => x.type === "game").length;

  document.getElementById("theme-count").textContent =
    items.filter(x => x.type === "theme").length;

  document.querySelector(".library-count").textContent =
    `${String(filtered.length).padStart(2, "0")} عناصر`;
}

search.addEventListener("input", render);

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => {
      b.classList.remove("active");
    });

    button.classList.add("active");
    activeFilter = button.dataset.filter;
    render();
  });
});

document.getElementById("year").textContent =
  new Date().getFullYear();

render();
