const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");

if (menuBtn && sidebar) {
  menuBtn.addEventListener("click", () => sidebar.classList.toggle("show"));
}

document.querySelectorAll(".sidebar-main").forEach((btn) => {
  btn.addEventListener("click", () => {
    const group = btn.closest(".sidebar-group");
    group.classList.toggle("collapsed");
  });
});

// Highlight the current navbar and sidebar item automatically.
(() => {
  const current = new URL(window.location.href);
  const normalize = (value) => {
    const u = new URL(value, window.location.href);
    return u.pathname.replace(/\/+$/, "") || "/";
  };

  document.querySelectorAll(".nav-menu a").forEach((a) => {
    if (normalize(a.href) === normalize(current.href)) {
      a.classList.add("active");
    }
  });

  const sidebarLinks = [...document.querySelectorAll(".sidebar-submenu a")];
  sidebarLinks.forEach((a) => {
    if (normalize(a.href) === normalize(current.href)) {
      a.classList.add("active");
      const group = a.closest(".sidebar-group");
      if (group) group.classList.add("active-group");
    }
  });
})();

// Smart local search: searches all 20 learning topics without a server or API key.
const searchData = [
  ["Pengenalan RPL","Dasar RPL","materi/pengenalan-rpl.html","rpl rekayasa perangkat lunak software"],
  ["Dasar-Dasar Pemrograman","Dasar RPL","materi/dasar-pemrograman.html","programming variabel tipe data kondisi perulangan fungsi array"],
  ["Algoritma & Flowchart","Dasar RPL","materi/algoritma.html","algoritma flowchart pseudocode sequence selection iteration"],
  ["C++","Pemrograman","bahasa/cpp.html","cpp c++ syntax variabel input output loop fungsi oop"],
  ["HTML","Web Development","bahasa/html.html","html tag element struktur web"],
  ["CSS","Web Development","bahasa/css.html","css style layout warna responsive"],
  ["JavaScript","Web Development","bahasa/javascript.html","javascript js dom event function web"],
  ["Dart","Pemrograman","bahasa/dart.html","dart flutter variable function class"],
  ["Python","Pemrograman","bahasa/python.html","python variable function list loop"],
  ["Database","Data & Sistem","materi/database.html","database sql table crud primary key foreign key join"],
  ["PBO / OOP","Pemrograman","materi/pbo-oop.html","pbo oop class object inheritance polymorphism encapsulation"],
  ["Analisis & Perancangan Sistem","Dasar RPL","materi/analisis-sistem.html","analisis sistem requirement use case erd activity"],
  ["SDLC & Metodologi","Dasar RPL","materi/sdlc.html","sdlc waterfall agile scrum"],
  ["Web Development","Web Development","materi/web-development.html","frontend backend http https api deployment"],
  ["Git & GitHub","Tools & Praktik","materi/git-github.html","git github repository commit branch merge push pull"],
  ["Tools RPL","Tools & Praktik","materi/tools-rpl.html","vs code devtools terminal git github tools"],
  ["Testing & Debugging","Tools & Praktik","materi/testing-debugging.html","testing debugging error syntax runtime logic"],
  ["UI/UX Dasar","Desain","materi/ui-ux.html","ui ux layout typography usability responsive"],
  ["Keamanan Web","Data & Sistem","materi/keamanan-web.html","security https xss sql injection authentication authorization"],
  ["Dunia Kerja RPL","Dunia Kerja","materi/dunia-kerja-rpl.html","karier kerja programmer developer tester ui ux portofolio"],
];

const search = document.getElementById("searchInput");
const results = document.getElementById("searchResults");

if (search && results) {
  const base = document.body.dataset.base || "";

  const showResults = (query) => {
    const q = query.trim().toLowerCase();
    if (!q) {
      results.innerHTML = "";
      results.classList.remove("show");
      return;
    }

    const matches = searchData
      .map(item => {
        const haystack = (item[0] + " " + item[1] + " " + item[3]).toLowerCase();
        let score = 0;
        if (item[0].toLowerCase().startsWith(q)) score += 5;
        if (item[0].toLowerCase().includes(q)) score += 3;
        if (haystack.includes(q)) score += 1;
        return { item, score };
      })
      .filter(x => x.score > 0)
      .sort((a,b) => b.score - a.score)
      .slice(0, 6);

    if (!matches.length) {
      results.innerHTML = '<div class="search-result"><strong>Materi tidak ditemukan</strong><small>Coba kata kunci lain.</small></div>';
      results.classList.add("show");
      return;
    }

    results.innerHTML = matches.map(({item}) => `
      <a class="search-result" href="${base}${item[2]}">
        <strong>${item[0]}</strong>
        <small>${item[1]}</small>
      </a>
    `).join("");
    results.classList.add("show");
  };

  search.addEventListener("input", () => showResults(search.value));
  search.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const first = results.querySelector("a");
      if (first) window.location.href = first.href;
    }
    if (event.key === "Escape") {
      results.classList.remove("show");
      search.blur();
    }
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-search")) results.classList.remove("show");
  });
}
