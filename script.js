fetch("header.html")
  .then(function (response) {
    return response.text();
  })
  .then(function (html) {
    document.getElementById("header-placeholder").innerHTML = html;
  });

fetch("footer.html")
  .then(function (response) {
    return response.text();
  })
  .then(function (html) {
    document.getElementById("footer-placeholder").innerHTML = html;

    const yearSpan = document.getElementById("year");
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;

    const backToTopButton = document.getElementById("backToTop");

    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        backToTopButton.classList.add("show");
      } else {
        backToTopButton.classList.remove("show");
      }
    });

    backToTopButton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

const thumbnails = document.querySelectorAll(".wallpaper-thumb");

thumbnails.forEach(function (thumb) {
  if (thumb.complete && thumb.naturalWidth > 0) {
    thumb.classList.add("loaded");
  } else {
    thumb.addEventListener("load", function () {
      thumb.classList.add("loaded");
    });
    thumb.addEventListener("error", function () {
      thumb.classList.add("loaded");
    });
  }
});

const lightbox = document.getElementById("lightbox");

if (lightbox) {
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxClose = document.getElementById("lightboxClose");

  function openLightbox(imageSource, imageAlt) {
    lightboxImg.src = imageSource;
    lightboxImg.alt = imageAlt;
    lightbox.classList.add("active");
  }

  thumbnails.forEach(function (thumb) {
    thumb.addEventListener("click", function () {
      openLightbox(thumb.src, thumb.alt);
    });
  });

  lightboxClose.addEventListener("click", function () {
    lightbox.classList.remove("active");
  });

  lightbox.addEventListener("click", function () {
    lightbox.classList.remove("active");
  });

  lightboxImg.addEventListener("click", function (event) {
    event.stopPropagation();
  });
}

document.addEventListener("keydown", function (event) {
  if (lightbox && event.key === "Escape") {
    lightbox.classList.remove("active");
  }
});