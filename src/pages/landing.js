const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

mobileMenu.querySelectorAll('a, button').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const inscriptionModal = document.getElementById('inscriptionModal');
document.querySelectorAll('.js-open-inscription').forEach((button) => {
  button.addEventListener('click', () => {
    inscriptionModal.classList.add('open');
  });
});

document.getElementById('modalCloseBtn').addEventListener('click', () => {
  inscriptionModal.classList.remove('open');
});

inscriptionModal.addEventListener('click', (event) => {
  if (event.target.id === 'inscriptionModal') {
    inscriptionModal.classList.remove('open');
  }
});

document.getElementById('inscriptionForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const elevePrenom = document.getElementById('elevePrenom').value.trim();
  const eleveNom = document.getElementById('eleveNom').value.trim();
  const eleveNiveau = document.getElementById('eleveNiveau').value;
  const parentTel = document.getElementById('parentTel').value.trim();
  document.getElementById('inscriptionForm').style.display = 'none';
  document.querySelector('.modal-sub').style.display = 'none';
  document.getElementById('inscriptionSuccessText').textContent =
    "Merci ! Nous avons bien reçu la demande d'inscription de " + elevePrenom + ' ' + eleveNom +
    ' en ' + eleveNiveau + '. Notre équipe vous recontactera au ' + parentTel + ' sous 48h.';
  document.getElementById('inscriptionSuccess').style.display = 'block';
});
