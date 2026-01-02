(() => {
  const trees = document.querySelectorAll(".pentest-tree");
  if (!trees.length) {
    return;
  }

  trees.forEach((tree) => {
    const expandBtn = tree.querySelector("[data-tree-action='expand']");
    const collapseBtn = tree.querySelector("[data-tree-action='collapse']");
    const details = tree.querySelectorAll("details");

    if (expandBtn) {
      expandBtn.addEventListener("click", () => {
        details.forEach((item) => {
          item.open = true;
        });
      });
    }

    if (collapseBtn) {
      collapseBtn.addEventListener("click", () => {
        details.forEach((item) => {
          item.open = false;
        });
      });
    }
  });
})();
