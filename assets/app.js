/* === cofaktor.de – Vanilla JS === */

document.addEventListener('DOMContentLoaded', function () {
  // --- Mobile Nav Toggle ---
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // --- Kontakt: Query-Param Vorauswahl ---
  var topicSelect = document.getElementById('topic-select');
  if (topicSelect) {
    var params = new URLSearchParams(window.location.search);
    var topic = params.get('topic');
    if (topic) {
      var options = topicSelect.options;
      for (var i = 0; i < options.length; i++) {
        if (options[i].value === topic) {
          topicSelect.selectedIndex = i;
          break;
        }
      }
    }
  }

  // --- Kontakt: Form Submit ---
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      // Redirect to danke page
      var basePath = contactForm.getAttribute('data-base') || '';
      window.location.href = basePath + 'kontakt/danke.html';
    });
  }

  // --- Referenzen Filter ---
  var refData = [
    { title: 'AMNOG-Dossier Onkologie', desc: 'Erstellung eines Nutzendossiers für ein Onkologikum gemäß §35a SGB V.', brand: 'covalue', indikation: 'Onkologie', format: 'Dossier-Modul' },
    { title: 'Slide Deck Kardiologie', desc: 'Wissenschaftliches Slide Deck für einen kardiologischen Kongress.', brand: 'comedical', indikation: 'Kardiologie', format: 'Slide Deck' },
    { title: 'Patientenbroschüre Immunologie', desc: 'Patientengerechte Broschüre zu einem Immuntherapeutikum.', brand: 'copatient', indikation: 'Immunologie', format: 'Patient-Broschüre' },
    { title: 'G-BA Beratungsvorbereitung', desc: 'Strategische Vorbereitung einer G-BA-Beratung im Bereich seltene Erkrankungen.', brand: 'covalue', indikation: 'Seltene Erkrankungen', format: 'Beratungspaket' },
    { title: 'Medical Writing Review-Artikel', desc: 'Erstellung eines Review-Artikels für ein Peer-Reviewed Journal in der Neurologie.', brand: 'comedical', indikation: 'Neurologie', format: 'Publikation' },
    { title: 'Patient Journey Mapping Onkologie', desc: 'Entwicklung einer Patient Journey Map für ein onkologisches Therapiegebiet.', brand: 'copatient', indikation: 'Onkologie', format: 'Patient Journey Map' },
    { title: 'Nutzenbewertung Diabetes', desc: 'Unterstützung bei der frühen Nutzenbewertung eines neuen Antidiabetikums.', brand: 'covalue', indikation: 'Diabetologie', format: 'Dossier-Modul' },
    { title: 'Medical Education Webinar', desc: 'Konzeption und Durchführung einer CME-zertifizierten Fortbildung.', brand: 'comedical', indikation: 'Kardiologie', format: 'Webinar' },
    { title: 'Adhärenzprogramm Immunologie', desc: 'Entwicklung eines digitalen Adhärenzprogramms für Patienten mit chronischer Immunerkrankung.', brand: 'copatient', indikation: 'Immunologie', format: 'Adhärenzprogramm' },
    { title: 'Medical Graphics Infografik', desc: 'Erstellung einer wissenschaftlichen Infografik zu einem Wirkmechanismus.', brand: 'comedical', indikation: 'Onkologie', format: 'Infografik' },
    { title: 'Post Submission Support', desc: 'Begleitung des Post-Submission-Prozesses nach Dossiereinreichung.', brand: 'covalue', indikation: 'Neurologie', format: 'Beratungspaket' },
    { title: 'Patientenmedien Diabetologie', desc: 'Erstellung von Patientenmedien (Video & Print) für Diabetes-Patienten.', brand: 'copatient', indikation: 'Diabetologie', format: 'Patient-Broschüre' }
  ];

  var refGrid = document.getElementById('ref-grid');
  var filterBrand = document.getElementById('filter-brand');
  var filterIndikation = document.getElementById('filter-indikation');
  var filterFormat = document.getElementById('filter-format');

  if (refGrid && filterBrand && filterIndikation && filterFormat) {
    function renderRefs() {
      var brand = filterBrand.value;
      var indikation = filterIndikation.value;
      var format = filterFormat.value;
      var filtered = refData.filter(function (item) {
        if (brand && item.brand !== brand) return false;
        if (indikation && item.indikation !== indikation) return false;
        if (format && item.format !== format) return false;
        return true;
      });
      refGrid.innerHTML = '';
      if (filtered.length === 0) {
        refGrid.innerHTML = '<p>Keine Referenzen für diese Filterauswahl gefunden.</p>';
        return;
      }
      filtered.forEach(function (item) {
        var tagClass = 'tag-' + (item.brand === 'covalue' ? 'value' : item.brand === 'comedical' ? 'medical' : 'patient');
        var brandLabel = item.brand === 'covalue' ? 'co.value' : item.brand === 'comedical' ? 'co.medical' : 'co.patient';
        var card = document.createElement('div');
        card.className = 'ref-card';
        card.innerHTML =
          '<h3>' + item.title + '</h3>' +
          '<p>' + item.desc + '</p>' +
          '<div class="ref-tags">' +
            '<span class="ref-tag ' + tagClass + '">' + brandLabel + '</span>' +
            '<span class="ref-tag" style="background:#666">' + item.indikation + '</span>' +
            '<span class="ref-tag" style="background:#999">' + item.format + '</span>' +
          '</div>';
        refGrid.appendChild(card);
      });
    }
    filterBrand.addEventListener('change', renderRefs);
    filterIndikation.addEventListener('change', renderRefs);
    filterFormat.addEventListener('change', renderRefs);
    renderRefs();
  }

  // --- Active Nav Highlight ---
  var path = window.location.pathname;
  var navLinks = document.querySelectorAll('.main-nav a');
  navLinks.forEach(function (link) {
    var href = link.getAttribute('href');
    if (href && path.indexOf(href.replace('index.html', '').replace('./', '')) > -1 && href !== '#') {
      // Simple heuristic: if path contains the link's folder name
      var folder = href.split('/')[0] || href.split('/')[1];
      if (folder && path.indexOf(folder) > -1) {
        link.classList.add('active');
      }
    }
  });
});
