// Espera o DOM estar completamente carregado
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger-menu");
  const sidebar = document.querySelector(".sidebar");
  const menuItems = document.querySelectorAll(".menu-item");

  // Mostra/oculta o menu lateral ao clicar no ícone hambúrguer
  hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("active"); // Alterna a classe 'active' para mostrar/ocultar o menu
  });

  // Fecha o menu lateral e faz scroll suave até a seção
  menuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      // Impede o comportamento padrão de navegação (não recarrega a página)
      e.preventDefault();

      // Fecha o menu hambúrguer ao clicar em um item
      sidebar.classList.remove("active");

      // Obtém o id do link clicado (sem o '#')
      const targetId = item.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId); // Obtém a seção correspondente

      if (targetSection) {
        // Rola suavemente até a seção
        targetSection.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // Função para verificar qual seção está visível
  function onScroll() {
    const menuItems = document.querySelectorAll(".menu-item");
    const sections = document.querySelectorAll("section[id]");

    let currentSectionId = "";

    // Posição de scroll atual
    const scrollY = window.scrollY + window.innerHeight / 2;

    // Verifica qual seção está visível
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      // Verifica se o meio da tela está dentro da seção
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    // Atualiza a classe 'active' nos itens do menu
    menuItems.forEach((item) => {
      const href = item.getAttribute("href").substring(1); // Remove o "#"
      if (href === currentSectionId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  // Adiciona o evento de scroll
  window.addEventListener("scroll", onScroll);
});
