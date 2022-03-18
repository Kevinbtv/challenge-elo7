const openMenu = document.querySelector(".open");
const closeMenu = document.querySelector(".close");
const navMobile = document.querySelector(".navMobile");
const vagasDev = document.querySelector(".sec_dev");

openMenu.addEventListener("click", () => {
  navMobile.style.top = "69px";
  closeMenu.style.display = "block";
  openMenu.style.display = "none";
});

closeMenu.addEventListener("click", () => {
  navMobile.style.top = "-162%";
  openMenu.style.display = "block";
  closeMenu.style.display = "none";
});

(async () => {
  const url = await fetch("http://www.mocky.io/v2/5d6fb6b1310000f89166087b");
  const data = await url.json();
  const vagas = data.vagas;

  vagas.map(dados => {
    if (dados.ativa) {
      const cargo = dados.cargo;
      const link = dados.link;
      const bairro = dados.localizacao?.bairro ?? "Remoto";
      const cidade = dados.localizacao?.cidade ?? "Remoto";
      const pais = dados.localizacao?.pais ?? "Remoto";

      const html = `
        <div class="vagas">
          <p><a href="${link}" target="_blank">${cargo}</a></p>
          <p>${bairro} - ${cidade}, ${pais}</p>
        </div>
    `;

      vagasDev.insertAdjacentHTML("beforeend", html);
    }
  });
})();
