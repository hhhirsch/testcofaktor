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
  var serviceLabels = {
    'covalue_beratung_gba': 'Beratung beim G-BA',
    'covalue_dossiers_nutzenbewertung': 'Dossiers und Nutzenbewertung',
    'covalue_post_submission_support': 'Post Submission Support',
    'comedical_medical_marketing': 'Medical Marketing',
    'comedical_medical_writing': 'Medical Writing',
    'comedical_medical_education': 'Medical Education',
    'comedical_medical_affairs': 'Medical Affairs',
    'comedical_medical_liaison': 'Medical Liaison',
    'comedical_medical_graphics': 'Medical Graphics',
    'copatient_medien_fuer_patienten': 'Medien für Patienten',
    'copatient_patient_journey': 'Patient Journey',
    'copatient_patient_partnering': 'Patient Partnering',
    'copatient_adhaerenzkonzepte': 'Adhärenzkonzepte'
  };

  var refData = [
    { title: 'AMNOG-Dossier Onkologie', desc: 'Erstellung eines Nutzendossiers für ein Onkologikum gemäß §35a SGB V.', brand: 'covalue', indikation: 'Onkologie', format: 'Dossier-Modul', services: ['covalue_dossiers_nutzenbewertung'] },
    { title: 'Slide Deck Kardiologie', desc: 'Wissenschaftliches Slide Deck für einen kardiologischen Kongress.', brand: 'comedical', indikation: 'Kardiologie', format: 'Slide Deck', services: ['comedical_medical_marketing', 'comedical_medical_affairs'] },
    { title: 'Patientenbroschüre Immunologie', desc: 'Patientengerechte Broschüre zu einem Immuntherapeutikum.', brand: 'copatient', indikation: 'Immunologie', format: 'Patient-Broschüre', services: ['copatient_medien_fuer_patienten', 'copatient_patient_partnering'] },
    { title: 'G-BA Beratungsvorbereitung', desc: 'Strategische Vorbereitung einer G-BA-Beratung im Bereich seltene Erkrankungen.', brand: 'covalue', indikation: 'Seltene Erkrankungen', format: 'Beratungspaket', services: ['covalue_beratung_gba'] },
    { title: 'Medical Writing Review-Artikel', desc: 'Erstellung eines Review-Artikels für ein Peer-Reviewed Journal in der Neurologie.', brand: 'comedical', indikation: 'Neurologie', format: 'Publikation', services: ['comedical_medical_writing', 'comedical_medical_liaison'] },
    { title: 'Patient Journey Mapping Onkologie', desc: 'Entwicklung einer Patient Journey Map für ein onkologisches Therapiegebiet.', brand: 'copatient', indikation: 'Onkologie', format: 'Patient Journey Map', services: ['copatient_patient_journey'] },
    { title: 'Nutzenbewertung Diabetes', desc: 'Unterstützung bei der frühen Nutzenbewertung eines neuen Antidiabetikums.', brand: 'covalue', indikation: 'Diabetologie', format: 'Dossier-Modul', services: ['covalue_dossiers_nutzenbewertung'] },
    { title: 'Medical Education Webinar', desc: 'Konzeption und Durchführung einer CME-zertifizierten Fortbildung.', brand: 'comedical', indikation: 'Kardiologie', format: 'Webinar', services: ['comedical_medical_education'] },
    { title: 'Adhärenzprogramm Immunologie', desc: 'Entwicklung eines digitalen Adhärenzprogramms für Patienten mit chronischer Immunerkrankung.', brand: 'copatient', indikation: 'Immunologie', format: 'Adhärenzprogramm', services: ['copatient_adhaerenzkonzepte'] },
    { title: 'Medical Graphics Infografik', desc: 'Erstellung einer wissenschaftlichen Infografik zu einem Wirkmechanismus.', brand: 'comedical', indikation: 'Onkologie', format: 'Infografik', services: ['comedical_medical_graphics'] },
    { title: 'Post Submission Support', desc: 'Begleitung des Post-Submission-Prozesses nach Dossiereinreichung.', brand: 'covalue', indikation: 'Neurologie', format: 'Beratungspaket', services: ['covalue_post_submission_support'] },
    { title: 'Patientenmedien Diabetologie', desc: 'Erstellung von Patientenmedien (Video & Print) für Diabetes-Patienten.', brand: 'copatient', indikation: 'Diabetologie', format: 'Patient-Broschüre', services: ['copatient_medien_fuer_patienten'] }
  ];

  var refGrid = document.getElementById('ref-grid');
  var filterBrand = document.getElementById('filter-brand');
  var filterIndikation = document.getElementById('filter-indikation');
  var filterFormat = document.getElementById('filter-format');
  var refFilterInfo = document.getElementById('ref-filter-info');

  if (refGrid && filterBrand && filterIndikation && filterFormat) {
    // Read URL params and prefill filters
    var urlParams = new URLSearchParams(window.location.search);
    var urlBrand = urlParams.get('brand');
    var urlService = urlParams.get('service');

    if (urlBrand) {
      var brandOptions = filterBrand.options;
      for (var i = 0; i < brandOptions.length; i++) {
        if (brandOptions[i].value === urlBrand) {
          filterBrand.selectedIndex = i;
          break;
        }
      }
    }

    if (urlService && refFilterInfo) {
      var serviceLabel = serviceLabels[urlService] || '';
      var infoP = document.createElement('p');
      infoP.style.cssText = 'margin-bottom:1rem;padding:0.6rem 1rem;background:#f0f0f0;border-left:4px solid #888;border-radius:4px;';
      var strong = document.createElement('strong');
      strong.textContent = 'Gefiltert nach Leistung: ';
      infoP.appendChild(strong);
      infoP.appendChild(document.createTextNode(serviceLabel || urlService));
      refFilterInfo.appendChild(infoP);
    }

    function renderRefs() {
      var brand = filterBrand.value;
      var indikation = filterIndikation.value;
      var format = filterFormat.value;
      var filtered = refData.filter(function (item) {
        if (brand && item.brand !== brand) return false;
        if (indikation && item.indikation !== indikation) return false;
        if (format && item.format !== format) return false;
        if (urlService && (!item.services || item.services.indexOf(urlService) === -1)) return false;
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
