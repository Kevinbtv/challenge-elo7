// #Ínicio Código JavaScript
import "regenerator-runtime/runtime";
// Seletores
const openMenu = document.getElementById("open");
const closeMenu = document.getElementById("close");
const navMobile = document.querySelector(".navMobile");
const vagasDev = document.querySelector(".sec_dev");
let listas = document.querySelectorAll(".li_mob");

// Função para fechar o Menu Mobile
const closeAll = () => {
  navMobile.style.top = "-185%";
  openMenu.style.display = "block";
  closeMenu.style.display = "none";
};

// Abrir o Menu
openMenu.addEventListener("click", () => {
  navMobile.style.top = "69px";
  closeMenu.style.display = "block";
  openMenu.style.display = "none";
});

// Fechar o Menu
closeMenu.addEventListener("click", () => {
  closeAll();
});

// Fechar o Menu ao clicar em cada opção
listas.forEach(listas => {
  listas.addEventListener("click", () => {
    closeAll();
  });
});

// Consumo da API para extração dos dados da Vaga
const get = async () => {
  const url = await fetch("https://www.mocky.io/v2/5d6fb6b1310000f89166087b");
  const data = await url.json();
  const vagas = data.vagas;

  vagas.map(dados => {
    const { cargo, link, ativa, localizacao } = dados;
    const { bairro, cidade, pais } = localizacao || {};

    // Condicional para aparecer apenas as vagas ativas
    if (ativa) {
      // Seletores das informações
      const check = localizacao
        ? `<p>${bairro} - ${cidade}, ${pais}</p> `
        : "<p>Remoto</p>"; //Caso não haja localização, retornar Remoto

      const html = `
        <div class="vagas">
          <p><a href="${link}" target="_blank">${cargo}</a></p>
          ${check}
        </div>
    `;
      // Adicionar o código no HTML
      vagasDev.insertAdjacentHTML("beforeend", html);
    }
  });
};

get();
