(function () {
  "use strict";

  var cartCount = 2;
  var wishlistCount = 3;
  var compareCount = 0;

  function setCount(selector, value) {
    document.querySelectorAll(selector).forEach(function (node) {
      node.textContent = String(value);
    });
  }

  function toast(message) {
    var existing = document.querySelector(".pharmacy1-toast");
    if (existing) existing.remove();

    var notice = document.createElement("div");
    notice.className = "pharmacy1-toast";
    notice.textContent = message;
    notice.setAttribute(
      "style",
      "position:fixed;right:18px;bottom:18px;z-index:99999;background:#071c1f;color:#fff;padding:12px 16px;border-radius:8px;box-shadow:0 12px 32px rgba(0,0,0,.18);font:700 13px Arial,sans-serif;"
    );
    document.body.appendChild(notice);
    window.setTimeout(function () {
      notice.remove();
    }, 1800);
  }

  document.addEventListener("click", function (event) {
    var target = event.target && event.target.closest ? event.target.closest("a, button") : null;
    if (!target) return;

    var title = (target.getAttribute("title") || target.textContent || "").toLowerCase();
    if (title.indexOf("add to cart") !== -1) {
      cartCount += 1;
      setCount(".mini-cart-icon sup, .utilize-btn-icon .fa-shopping-cart + sup", cartCount);
      toast("Added to cart");
    }
    if (title.indexOf("wishlist") !== -1) {
      wishlistCount += 1;
      setCount(".fa-heart + sup", wishlistCount);
      toast("Added to wishlist");
    }
    if (title.indexOf("compare") !== -1) {
      compareCount += 1;
      toast("Added to compare (" + compareCount + ")");
    }
  });

  window.addEventListener("load", function () {
    document.documentElement.style.overflowY = "auto";
    document.body.style.overflowY = "auto";
  });
})();
