// Reusable paged carousel + lightbox for .art-gallery / .art-item markup (see art.qmd).
document.addEventListener("DOMContentLoaded", function () {
  initCarousels();
  initLightbox();
});

function getVisibleCount() {
  var w = window.innerWidth;
  if (w <= 500) return 1;
  if (w <= 900) return 2;
  return 4;
}

function initCarousels() {
  document.querySelectorAll(".art-gallery").forEach(function (gallery) {
    var items = Array.prototype.slice.call(
      gallery.querySelectorAll(":scope > .art-item")
    );
    if (!items.length) return;

    var prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "art-gallery-arrow art-gallery-prev";
    prevBtn.setAttribute("aria-label", "Previous image");
    prevBtn.textContent = "‹";

    var nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "art-gallery-arrow art-gallery-next";
    nextBtn.setAttribute("aria-label", "Next image");
    nextBtn.textContent = "›";

    var track = document.createElement("div");
    track.className = "art-gallery-track";

    items.forEach(function (item) {
      var cell = document.createElement("div");
      cell.className = "art-gallery-cell";
      cell.style.width = 100 / items.length + "%";
      cell.appendChild(item);
      track.appendChild(cell);
    });

    var viewport = document.createElement("div");
    viewport.className = "art-gallery-viewport";
    viewport.appendChild(track);

    gallery.innerHTML = "";
    gallery.appendChild(prevBtn);
    gallery.appendChild(viewport);
    gallery.appendChild(nextBtn);

    var currentIndex = 0;

    function maxIndex() {
      return Math.max(0, items.length - getVisibleCount());
    }

    function update() {
      currentIndex = Math.min(currentIndex, maxIndex());
      track.style.width = (items.length / getVisibleCount()) * 100 + "%";
      track.style.transform =
        "translateX(-" + (currentIndex * 100) / items.length + "%)";

      var canPan = maxIndex() > 0;
      prevBtn.style.display = canPan ? "flex" : "none";
      nextBtn.style.display = canPan ? "flex" : "none";
      prevBtn.disabled = currentIndex <= 0;
      nextBtn.disabled = currentIndex >= maxIndex();
    }

    prevBtn.addEventListener("click", function () {
      currentIndex = Math.max(0, currentIndex - 1);
      update();
    });
    nextBtn.addEventListener("click", function () {
      currentIndex = Math.min(maxIndex(), currentIndex + 1);
      update();
    });

    window.addEventListener("resize", update);
    update();
  });
}

function initLightbox() {
  var items = document.querySelectorAll(".art-item");
  if (!items.length) return;

  var lightbox = document.createElement("div");
  lightbox.className = "art-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.innerHTML =
    '<div class="art-lightbox-content">' +
    '<button class="art-lightbox-close" aria-label="Close">&times;</button>' +
    '<div class="art-lightbox-image"><img src="" alt=""></div>' +
    '<div class="art-lightbox-details">' +
    '<p><strong class="art-lightbox-title"></strong></p>' +
    '<p><span class="art-lightbox-medium"></span>, <span class="art-lightbox-year"></span></p>' +
    "</div>" +
    "</div>";
  document.body.appendChild(lightbox);

  var img = lightbox.querySelector(".art-lightbox-image img");
  var titleEl = lightbox.querySelector(".art-lightbox-title");
  var mediumEl = lightbox.querySelector(".art-lightbox-medium");
  var yearEl = lightbox.querySelector(".art-lightbox-year");
  var closeBtn = lightbox.querySelector(".art-lightbox-close");

  function openLightbox(item) {
    var thumb = item.querySelector("img");
    img.src = thumb.src;
    img.alt = thumb.alt || "";
    titleEl.textContent = item.dataset.title || "";
    mediumEl.textContent = item.dataset.medium || "";
    yearEl.textContent = item.dataset.year || "";
    lightbox.classList.add("is-open");
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    img.src = "";
  }

  items.forEach(function (item) {
    item.setAttribute("tabindex", "0");
    item.addEventListener("click", function () {
      openLightbox(item);
    });
    item.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(item);
      }
    });
  });

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  closeBtn.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
}
