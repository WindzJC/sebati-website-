'use strict';
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
if (menuButton && navigation) {
  document.documentElement.classList.add('js');
  menuButton.hidden = false;
  const closeMenu = (restoreFocus = false) => {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('is-open');
    if (restoreFocus) menuButton.focus();
  };
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('is-open', open);
  });
  navigation.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (!link) return;
    closeMenu();
    const target = document.getElementById(link.hash.slice(1));
    if (target) target.focus({ preventScroll: true });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') closeMenu(true);
  });
}
const familyControls = document.querySelector('.family-controls');
const familySpread = document.querySelector('.family-spread');
const familyPanels = [...document.querySelectorAll('[data-family-panel]')];
const familyStatus = document.getElementById('family-status');
if (familyControls && familySpread && familyPanels.length === 2) {
  familyControls.hidden = false;
  familyControls.addEventListener('click', event => {
    const button = event.target.closest('button[data-family]');
    if (!button || !familyControls.contains(button)) return;
    const selected = button.dataset.family;
    if (!['both', 'mcdaniels', 'price'].includes(selected)) return;
    familySpread.dataset.view = selected;
    familyControls.querySelectorAll('button').forEach(control => {
      control.setAttribute('aria-pressed', String(control === button));
    });
    familyPanels.forEach(panel => {
      panel.hidden = selected !== 'both' && panel.dataset.familyPanel !== selected;
    });
    document.querySelectorAll('[data-thread]').forEach(thread => {
      thread.classList.toggle('is-muted', selected !== 'both' && thread.dataset.thread !== selected);
    });
    if (familyStatus) familyStatus.textContent = selected === 'both'
      ? 'Showing the McDaniels and Price families together.'
      : `Showing the ${selected === 'price' ? 'Price' : 'McDaniels'} brothers.`;
  });
}
