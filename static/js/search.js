(() => {
  const input = document.getElementById("search-input");
  const status = document.getElementById("search-status");
  const results = document.getElementById("search-results");
  const filterToggle = document.getElementById("search-filter-notes");

  if (!input || !status || !results) {
    return;
  }

  const MIN_QUERY = 2;
  const MAX_RESULTS = 50;
  let index = [];
  let loaded = false;

  const normalize = (value) => (value || "").toLowerCase();

  const scorePage = (page, terms) => {
    const title = normalize(page.title);
    const summary = normalize(page.summary);
    const content = normalize(page.content);
    const tags = Array.isArray(page.tags) ? page.tags.map(normalize).join(" ") : "";
    let score = 0;

    for (const term of terms) {
      if (!term) {
        continue;
      }
      if (title.includes(term)) {
        score += 6;
      }
      if (summary.includes(term)) {
        score += 4;
      }
      if (tags.includes(term)) {
        score += 3;
      }
      if (content.includes(term)) {
        score += 1;
      }
    }

    return score;
  };

  const makeSnippet = (page, terms) => {
    if (page.summary) {
      return page.summary;
    }

    const content = page.content || "";
    const lower = content.toLowerCase();
    let indexPos = -1;

    for (const term of terms) {
      const pos = lower.indexOf(term);
      if (pos >= 0) {
        indexPos = pos;
        break;
      }
    }

    if (indexPos === -1) {
      return content.slice(0, 160) + (content.length > 160 ? "..." : "");
    }

    const start = Math.max(0, indexPos - 50);
    const end = Math.min(content.length, indexPos + 110);
    const prefix = start > 0 ? "..." : "";
    const suffix = end < content.length ? "..." : "";

    return prefix + content.slice(start, end) + suffix;
  };

  const renderResults = (items, terms, filterNotes) => {
    results.innerHTML = "";

    if (!items.length) {
      status.textContent = filterNotes
        ? "No results found in Pentest Notes."
        : "No results found.";
      return;
    }

    const context = filterNotes ? " in Pentest Notes" : "";
    status.textContent = `Showing ${items.length} result${items.length === 1 ? "" : "s"}${context}.`;

    for (const item of items) {
      const card = document.createElement("article");
      card.className = "card search-card";

      const body = document.createElement("div");
      body.className = "card-body";

      const eyebrow = document.createElement("p");
      eyebrow.className = "eyebrow";
      eyebrow.textContent = item.section || "Page";

      const title = document.createElement("h3");
      const link = document.createElement("a");
      link.href = item.url;
      link.textContent = item.title;
      title.appendChild(link);

      const summary = document.createElement("p");
      summary.textContent = makeSnippet(item, terms);

      body.appendChild(eyebrow);
      body.appendChild(title);
      body.appendChild(summary);
      card.appendChild(body);
      results.appendChild(card);
    }
  };

  const performSearch = (query) => {
    const terms = normalize(query).split(/\s+/).filter(Boolean);
    if (terms.length < 1) {
      status.textContent = "Type at least 2 characters to start searching.";
      results.innerHTML = "";
      return;
    }

    const filterNotes = filterToggle && filterToggle.checked;
    const dataset = filterNotes
      ? index.filter((page) => page.section === "pentest-notes")
      : index;

    const ranked = dataset
      .map((page) => ({ page, score: scorePage(page, terms) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_RESULTS)
      .map((entry) => entry.page);

    renderResults(ranked, terms, filterNotes);
  };

  const loadIndex = async () => {
    if (loaded) {
      return;
    }

    status.textContent = "Loading search index...";

    try {
      const response = await fetch("/index.json", { cache: "no-store" });
      if (!response.ok) {
        throw new Error("Failed to load index");
      }
      index = await response.json();
      loaded = true;
      status.textContent = "Type at least 2 characters to start searching.";
    } catch (error) {
      status.textContent = "Search index failed to load.";
    }
  };

  let debounceTimer = null;
  input.addEventListener("input", (event) => {
    const value = event.target.value || "";
    if (value.trim().length < MIN_QUERY) {
      status.textContent = "Type at least 2 characters to start searching.";
      results.innerHTML = "";
      return;
    }

    if (!loaded) {
      loadIndex().then(() => performSearch(value));
      return;
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => performSearch(value), 160);
  });

  if (filterToggle) {
    filterToggle.addEventListener("change", () => {
      const value = input.value || "";
      if (value.trim().length < MIN_QUERY) {
        status.textContent = "Type at least 2 characters to start searching.";
        results.innerHTML = "";
        return;
      }
      if (!loaded) {
        loadIndex().then(() => performSearch(value));
        return;
      }
      performSearch(value);
    });
  }

  loadIndex();
})();
