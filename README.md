# cofaktor.de – Klickbarer Website-Prototyp

Statischer Click-Dummy für **cofaktor.de** mit drei Marken:

- **co.medical** – Medical Communications
- **co.value** – Market Access
- **co.patient** – Patient Engagement

## Lokal öffnen

1. **Doppelklick** auf `index.html` im Dateibrowser, oder
2. Lokalen Server starten:
   ```bash
   python -m http.server 8000
   ```
   Dann [http://localhost:8000](http://localhost:8000) im Browser öffnen.

## GitHub Pages

1. Repository-Einstellungen → **Pages**
2. Source: Branch `main`, Ordner `/` (root)
3. Speichern – die Seite ist in wenigen Minuten unter `https://<user>.github.io/<repo>/` erreichbar.

## Struktur

```
/
├── index.html                  # Sitemap-Übersicht (Startseite)
├── ueber-uns.html              # Über Uns (Dachseite)
├── assets/
│   ├── styles.css              # Globales CSS mit Brand-Farben
│   └── app.js                  # Vanilla JS (Filter, Kontakt-Routing)
├── market-access/              # co.value
│   ├── index.html
│   ├── gba-beratung.html
│   ├── dossiers-nutzenbewertung.html
│   └── post-submission-support.html
├── medical-communications/     # co.medical
│   ├── index.html
│   ├── medical-marketing.html
│   ├── medical-writing.html
│   ├── medical-education.html
│   ├── medical-affairs.html
│   ├── medical-liaison.html
│   └── medical-graphics.html
├── patient-engagement/         # co.patient
│   ├── index.html
│   ├── medien-fuer-patienten.html
│   ├── patient-journey.html
│   ├── patient-partnering.html
│   └── adhaerenzkonzepte.html
├── wissen/                     # Global
│   ├── index.html
│   ├── blog.html
│   ├── blog-artikel-1.html
│   ├── blog-artikel-2.html
│   ├── webinare.html
│   ├── webinar-1.html
│   ├── whitepaper.html
│   └── whitepaper-1.html
├── referenzen/
│   └── index.html              # Filterbare Referenzen
├── unternehmen/
│   ├── index.html
│   ├── unsere-marken.html
│   ├── team.html
│   └── karriere.html
├── kontakt/
│   ├── index.html              # Routing-Formular
│   └── danke.html
└── README.md
```

## Technologie

- Reines **HTML / CSS / Vanilla JS** – kein Framework, kein Build-Step
- CSS-Variablen für Brand-Farben und Gradients
- Responsives Layout mit Flexbox und CSS Grid
- JS: Referenzen-Filter, Kontakt-Vorauswahl via Query-Parameter (`?topic=covalue`)

## Hinweis

Dies ist ein **klickbarer Prototyp** – alle Inhalte sind Platzhalter. Es findet kein Datenversand statt.
