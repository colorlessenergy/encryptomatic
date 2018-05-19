document.querySelector(".form").addEventListener("submit", function (event) {
  event.preventDefault();
  document.querySelector("#output").innerHTML = hamsterMe(document.querySelector("#code").value, document.querySelector("#message").value);
});
