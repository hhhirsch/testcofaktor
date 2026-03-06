/* === cofaktor.de – Vanilla JS === */

document.addEventListener('DOMContentLoaded', function () {

  // === Compute root path from logo href ===
  var logoEl = document.querySelector('a.logo');
  var logoHref = logoEl ? logoEl.getAttribute('href') : 'index.html';
  // logoHref is e.g. "index.html" (root) or "../index.html" (one level deep)
  var root = logoHref.replace(/index\.html$/, '').replace(/\/$/, '') || '.';

  // === Nav Configuration ===
  var NAV_CONFIG = [
    { label: 'Über Uns', href: '/ueber-uns.html' },
    {
      label: 'Market Access',
      href: '/market-access/index.html',
      brandClass: 'nav-value',
      children: [
        { label: 'Überblick', href: '/market-access/index.html' },
        { label: 'Beratung beim G-BA', href: '/market-access/gba-beratung.html' },
        { label: 'Dossiers & Nutzenbewertung', href: '/market-access/dossiers-und-nutzenbewertung.html' },
        { label: 'Post Submission Support', href: '/market-access/post-submission-support.html' }
      ]
    },
    {
      label: 'Medical Communications',
      href: '/medical-communications/index.html',
      brandClass: 'nav-medical',
      children: [
        { label: 'Überblick', href: '/medical-communications/index.html' },
        { label: 'Medical Marketing', href: '/medical-communications/medical-marketing.html' },
        { label: 'Medical Writing', href: '/medical-communications/medical-writing.html' },
        { label: 'Medical Education', href: '/medical-communications/medical-education.html' },
        { label: 'Medical Affairs', href: '/medical-communications/medical-affairs.html' },
        { label: 'Medical Liaison', href: '/medical-communications/medical-liaison.html' },
        { label: 'Medical Graphics', href: '/medical-communications/medical-graphics.html' }
      ]
    },
    {
      label: 'Patient Engagement',
      href: '/patient-engagement/index.html',
      brandClass: 'nav-patient',
      children: [
        { label: 'Überblick', href: '/patient-engagement/index.html' },
        { label: 'Medien für Patienten', href: '/patient-engagement/medien-fuer-patienten.html' },
        { label: 'Patient Journey', href: '/patient-engagement/patient-journey.html' },
        { label: 'Patient Partnering', href: '/patient-engagement/patient-partnering.html' },
        { label: 'Adhärenzkonzepte', href: '/patient-engagement/adhaerenzkonzepte.html' }
      ]
    },
    { label: 'Wissen', href: '/wissen/index.html' },
    { label: 'Referenzen', href: '/referenzen/index.html' },
    { label: 'Unternehmen', href: '/unternehmen/index.html' },
    { label: 'Kontakt', href: '/kontakt/index.html' }
  ];

  // Check if a given absolute path segment is active in the current URL
  function isActivePath(hrefSegment) {
    var seg = hrefSegment.replace(/^\//, '').replace(/index\.html$/, '').replace(/\.html$/, '').replace(/\/$/, '');
    if (!seg) return false;
    var currentPath = window.location.pathname;
    return currentPath.indexOf('/' + seg + '.') > -1 ||
           currentPath.indexOf('/' + seg + '/') > -1 ||
           currentPath.endsWith('/' + seg);
  }

  // === Build and inject Nav ===
  var nav = document.querySelector('.main-nav');
  if (nav) {
    var navHtml = '';
    NAV_CONFIG.forEach(function (item) {
      var href = root + item.href;
      if (item.children) {
        var isActive = item.children.some(function (child) {
          return isActivePath(child.href);
        });
        var submenuHtml = item.children.map(function (child) {
          var childHref = root + child.href;
          var childActive = isActivePath(child.href);
          return '<li><a href="' + childHref + '"' + (childActive ? ' class="is-active"' : '') + '>' + child.label + '</a></li>';
        }).join('');
        navHtml += '<div class="nav-dropdown' +
          (item.brandClass ? ' ' + item.brandClass : '') +
          (isActive ? ' is-active' : '') + '">' +
          '<a href="' + href + '" class="nav-parent">' + item.label + '</a>' +
          '<ul class="nav-sub">' + submenuHtml + '</ul>' +
          '</div>';
      } else {
        var simpleActive = isActivePath(item.href);
        navHtml += '<a href="' + href + '"' + (simpleActive ? ' class="is-active"' : '') + '>' + item.label + '</a>';
      }
    });
    nav.innerHTML = navHtml;

    // Dropdown toggle for mobile
    var dropdowns = nav.querySelectorAll('.nav-dropdown');
    dropdowns.forEach(function (dd) {
      var parentLink = dd.querySelector('.nav-parent');
      if (parentLink) {
        parentLink.addEventListener('click', function (e) {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            dd.classList.toggle('open');
          }
        });
      }
    });
  }

  // --- Mobile Nav Toggle ---
  var toggle = document.querySelector('.nav-toggle');
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
      var basePath = contactForm.getAttribute('data-base') || '';
      window.location.href = basePath + 'kontakt/danke.html';
    });
  }

  // --- Referenzen Filter ---

  // Service registry: id → { label, brand, url }
  var serviceRegistry = {
    'covalue_beratung_gba':            { label: 'Beratung beim G-BA',           brand: 'covalue',   url: 'market-access/gba-beratung.html' },
    'covalue_dossiers_nutzenbewertung': { label: 'Dossiers und Nutzenbewertung', brand: 'covalue',   url: 'market-access/dossiers-und-nutzenbewertung.html' },
    'covalue_post_submission_support':  { label: 'Post Submission Support',      brand: 'covalue',   url: 'market-access/post-submission-support.html' },
    'comedical_medical_marketing':      { label: 'Medical Marketing',            brand: 'comedical', url: 'medical-communications/medical-marketing.html' },
    'comedical_medical_writing':        { label: 'Medical Writing',              brand: 'comedical', url: 'medical-communications/medical-writing.html' },
    'comedical_medical_education':      { label: 'Medical Education',            brand: 'comedical', url: 'medical-communications/medical-education.html' },
    'comedical_medical_affairs':        { label: 'Medical Affairs',              brand: 'comedical', url: 'medical-communications/medical-affairs.html' },
    'comedical_medical_liaison':        { label: 'Medical Liaison',              brand: 'comedical', url: 'medical-communications/medical-liaison.html' },
    'comedical_medical_graphics':       { label: 'Medical Graphics',             brand: 'comedical', url: 'medical-communications/medical-graphics.html' },
    'copatient_medien_fuer_patienten':  { label: 'Medien für Patienten',         brand: 'copatient', url: 'patient-engagement/medien-fuer-patienten.html' },
    'copatient_patient_journey':        { label: 'Patient Journey',              brand: 'copatient', url: 'patient-engagement/patient-journey.html' },
    'copatient_patient_partnering':     { label: 'Patient Partnering',           brand: 'copatient', url: 'patient-engagement/patient-partnering.html' },
    'copatient_adhaerenzkonzepte':      { label: 'Adhärenzkonzepte',             brand: 'copatient', url: 'patient-engagement/adhaerenzkonzepte.html' }
  };

  // Services grouped by brand (for dropdown)
  var brandServices = {
    'covalue':   ['covalue_beratung_gba', 'covalue_dossiers_nutzenbewertung', 'covalue_post_submission_support'],
    'comedical': ['comedical_medical_marketing', 'comedical_medical_writing', 'comedical_medical_education', 'comedical_medical_affairs', 'comedical_medical_liaison', 'comedical_medical_graphics'],
    'copatient': ['copatient_medien_fuer_patienten', 'copatient_patient_journey', 'copatient_patient_partnering', 'copatient_adhaerenzkonzepte']
  };

  var brandLabels = { 'covalue': 'co.value', 'comedical': 'co.medical', 'copatient': 'co.patient' };

  var refData = [
    { title: 'AMNOG-Dossier Onkologie',       desc: 'Erstellung eines Nutzendossiers für ein Onkologikum gemäß §35a SGB V.',                                   brand: 'covalue',   indikation: 'Onkologie',          format: 'Dossier-Modul',      services: ['covalue_dossiers_nutzenbewertung'] },
    { title: 'Slide Deck Kardiologie',         desc: 'Wissenschaftliches Slide Deck für einen kardiologischen Kongress.',                                        brand: 'comedical', indikation: 'Kardiologie',         format: 'Slide Deck',         services: ['comedical_medical_marketing', 'comedical_medical_affairs'] },
    { title: 'Patientenbroschüre Immunologie', desc: 'Patientengerechte Broschüre zu einem Immuntherapeutikum.',                                                 brand: 'copatient', indikation: 'Immunologie',         format: 'Patient-Broschüre',  services: ['copatient_medien_fuer_patienten', 'copatient_patient_partnering'] },
    { title: 'G-BA Beratungsvorbereitung',     desc: 'Strategische Vorbereitung einer G-BA-Beratung im Bereich seltene Erkrankungen.',                          brand: 'covalue',   indikation: 'Seltene Erkrankungen', format: 'Beratungspaket',     services: ['covalue_beratung_gba'] },
    { title: 'Medical Writing Review-Artikel', desc: 'Erstellung eines Review-Artikels für ein Peer-Reviewed Journal in der Neurologie.',                       brand: 'comedical', indikation: 'Neurologie',          format: 'Publikation',        services: ['comedical_medical_writing', 'comedical_medical_liaison'] },
    { title: 'Patient Journey Mapping Onkologie', desc: 'Entwicklung einer Patient Journey Map für ein onkologisches Therapiegebiet.',                          brand: 'copatient', indikation: 'Onkologie',           format: 'Patient Journey Map', services: ['copatient_patient_journey'] },
    { title: 'Nutzenbewertung Diabetes',       desc: 'Unterstützung bei der frühen Nutzenbewertung eines neuen Antidiabetikums.',                               brand: 'covalue',   indikation: 'Diabetologie',        format: 'Dossier-Modul',      services: ['covalue_dossiers_nutzenbewertung'] },
    { title: 'Medical Education Webinar',      desc: 'Konzeption und Durchführung einer CME-zertifizierten Fortbildung.',                                        brand: 'comedical', indikation: 'Kardiologie',         format: 'Webinar',            services: ['comedical_medical_education'] },
    { title: 'Adhärenzprogramm Immunologie',   desc: 'Entwicklung eines digitalen Adhärenzprogramms für Patienten mit chronischer Immunerkrankung.',            brand: 'copatient', indikation: 'Immunologie',         format: 'Adhärenzprogramm',   services: ['copatient_adhaerenzkonzepte'] },
    { title: 'Medical Graphics Infografik',    desc: 'Erstellung einer wissenschaftlichen Infografik zu einem Wirkmechanismus.',                                 brand: 'comedical', indikation: 'Onkologie',           format: 'Infografik',         services: ['comedical_medical_graphics'] },
    { title: 'Post Submission Support',        desc: 'Begleitung des Post-Submission-Prozesses nach Dossiereinreichung.',                                        brand: 'covalue',   indikation: 'Neurologie',          format: 'Beratungspaket',     services: ['covalue_post_submission_support'] },
    { title: 'Patientenmedien Diabetologie',   desc: 'Erstellung von Patientenmedien (Video & Print) für Diabetes-Patienten.',                              brand: 'copatient', indikation: 'Diabetologie',        format: 'Patient-Broschüre',  services: ['copatient_medien_fuer_patienten'] }
  ];

  var refGrid = document.getElementById('ref-grid');
  var filterBrand = document.getElementById('filter-brand');
  var filterService = document.getElementById('filter-service');
  var filterIndikation = document.getElementById('filter-indikation');
  var filterFormat = document.getElementById('filter-format');
  var filterChipsEl = document.getElementById('filter-chips');

  if (refGrid && filterBrand && filterIndikation && filterFormat) {
    // Read URL params
    var urlParams = new URLSearchParams(window.location.search);
    var urlBrand = urlParams.get('brand');
    var urlService = urlParams.get('service');

    // Set brand from URL
    if (urlBrand) {
      for (var bi = 0; bi < filterBrand.options.length; bi++) {
        if (filterBrand.options[bi].value === urlBrand) {
          filterBrand.selectedIndex = bi;
          break;
        }
      }
    }

    // Populate service dropdown based on current brand selection
    function updateServiceOptions() {
      if (!filterService) return;
      var brand = filterBrand.value;
      filterService.innerHTML = '<option value="">Alle Leistungen</option>';
      if (brand && brandServices[brand]) {
        brandServices[brand].forEach(function (svcId) {
          var opt = document.createElement('option');
          opt.value = svcId;
          opt.textContent = serviceRegistry[svcId].label;
          filterService.appendChild(opt);
        });
      }
    }

    updateServiceOptions();

    // Set service from URL (after populating options)
    if (urlService && filterService) {
      for (var si = 0; si < filterService.options.length; si++) {
        if (filterService.options[si].value === urlService) {
          filterService.selectedIndex = si;
          break;
        }
      }
    }

    // Render active filter chips
    function renderChips() {
      if (!filterChipsEl) return;
      var chips = [];
      var brand = filterBrand.value;
      var svc = filterService ? filterService.value : '';
      var ind = filterIndikation.value;
      var fmt = filterFormat.value;
      if (brand) chips.push('Brand: ' + (brandLabels[brand] || brand));
      if (svc && serviceRegistry[svc]) chips.push('Leistung: ' + serviceRegistry[svc].label);
      if (ind) chips.push('Indikation: ' + ind);
      if (fmt) chips.push('Format: ' + fmt);
      var html = chips.map(function (c) {
        return '<span class="filter-chip">' + c + '</span>';
      }).join('');
      if (chips.length > 0) {
        html += '<button class="btn-reset" id="reset-filters">Filter zurücksetzen</button>';
      }
      filterChipsEl.innerHTML = html;
      var resetBtn = document.getElementById('reset-filters');
      if (resetBtn) {
        resetBtn.addEventListener('click', function () {
          filterBrand.selectedIndex = 0;
          if (filterService) {
            updateServiceOptions();
          }
          filterIndikation.selectedIndex = 0;
          filterFormat.selectedIndex = 0;
          history.replaceState(null, '', window.location.pathname);
          renderChips();
          renderRefs();
        });
      }
    }

    function renderRefs() {
      var brand = filterBrand.value;
      var svc = filterService ? filterService.value : '';
      var indikation = filterIndikation.value;
      var format = filterFormat.value;
      var filtered = refData.filter(function (item) {
        if (brand && item.brand !== brand) return false;
        if (indikation && item.indikation !== indikation) return false;
        if (format && item.format !== format) return false;
        if (svc && (!item.services || item.services.indexOf(svc) === -1)) return false;
        return true;
      });
      refGrid.innerHTML = '';
      if (filtered.length === 0) {
        refGrid.innerHTML = '<p>Keine Referenzen für diese Filterauswahl gefunden.</p>';
        return;
      }
      filtered.forEach(function (item) {
        var tagClass = 'tag-' + (item.brand === 'covalue' ? 'value' : item.brand === 'comedical' ? 'medical' : 'patient');
        var bLabel = brandLabels[item.brand] || item.brand;
        // Build service links for card
        var serviceLinks = '';
        if (item.services && item.services.length > 0) {
          serviceLinks = item.services.map(function (svcId) {
            var svcInfo = serviceRegistry[svcId];
            if (!svcInfo) return '';
            return '<a href="' + root + '/' + svcInfo.url + '" class="ref-service-link">→ ' + svcInfo.label + '</a>';
          }).filter(Boolean).join('');
        }
        var card = document.createElement('div');
        card.className = 'ref-card';
        card.innerHTML =
          '<h3>' + item.title + '</h3>' +
          '<p>' + item.desc + '</p>' +
          '<div class="ref-tags">' +
            '<span class="ref-tag ' + tagClass + '">' + bLabel + '</span>' +
            '<span class="ref-tag" style="background:#666">' + item.indikation + '</span>' +
            '<span class="ref-tag" style="background:#999">' + item.format + '</span>' +
          '</div>' +
          (serviceLinks ? '<div class="ref-service-links">' + serviceLinks + '</div>' : '');
        refGrid.appendChild(card);
      });
    }

    filterBrand.addEventListener('change', function () {
      updateServiceOptions();
      renderChips();
      renderRefs();
    });
    if (filterService) {
      filterService.addEventListener('change', function () {
        renderChips();
        renderRefs();
      });
    }
    filterIndikation.addEventListener('change', function () { renderChips(); renderRefs(); });
    filterFormat.addEventListener('change', function () { renderChips(); renderRefs(); });

    renderChips();
    renderRefs();
  }
});
