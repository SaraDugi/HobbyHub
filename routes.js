const url = require('url');          
const path = require('path');        
const { serveStaticFile } = require('./staticController'); 

const funkcionalnostiHTML = `
<!DOCTYPE html>
<html lang="sl">
<head>
  <meta charset="UTF-8">
  <title>Funkcionalnosti odjemalca - HobbyHub</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; background-color: #f8f8f8; }
    header, section { margin-bottom: 30px; padding: 15px; background: #fff; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
    h1, h2, h3, h4, h5 { color: #222; }
    ul { margin-left: 20px; }
    .uml-diagram { max-width: 100%; height: auto; border: 1px solid #ccc; margin: 15px 0; }
    .note { font-size: 0.85em; color: #777; }
    .detail { margin-bottom: 25px; }
    .subsection { margin-left: 25px; margin-bottom: 10px; }
    .example { font-style: italic; color: #333; }
  </style>
</head>
<body>
  <header>
    <h1>Idejna zasnova: Funkcionalnosti odjemalca – HobbyHub</h1>
    <p>
      HobbyHub je aplikacija za organizacijo hobijev in osebnih aktivnosti, ki združuje planer z interaktivno gamifikacijo. Omogoča vnos dnevnih aktivnosti, spremljanje napredka, dodeljevanje nagrad ter personalizacijo vmesnika, kar uporabnikom pomaga pri učinkovitem upravljanju časa in doseganju ciljev.
    </p>
  </header>
  <section id="funkcionalnosti-odjemalca">
    <h2>/funkcionalnosti-odjemalca/</h2>
    
    <!-- 1. Koledarski sistem -->
    <h3>1. Koledarski sistem</h3>
    <div class="detail">
      <p><strong>Namen:</strong> Omogočiti enostaven vnos, urejanje in pregled dnevnih aktivnosti.</p>
      <div class="subsection">
        <h4>Vhodi:</h4>
        <ul>
          <li><strong>Osnovni podatki:</strong> Naziv aktivnosti, datum (DD.MM.LLLL), začetni in končni čas (24-urna oblika).</li>
          <li><strong>Opis aktivnosti:</strong> Kratek opis, ki pojasnjuje dejavnost (npr. "Sestanek s stranko").</li>
          <li><strong>Kategorija:</strong> Tip aktivnosti (npr. delo, študij, šport, hobiji), kar omogoča filtriranje in barvno označevanje.</li>
          <li><strong>Prioriteta:</strong> Določitev nujnosti (nizka, srednja, visoka).</li>
          <li><strong>Dodatne opombe:</strong> Prostor za posebne pripombe, dodatne informacije.</li>
          <li><strong>Validacija:</strong> Preverjanje, da je začetni čas pred končnim in da so vsi podatki ustrezno formatirani.</li>
        </ul>
      </div>
      <div class="subsection">
        <h4>Izhodi:</h4>
        <ul>
          <li><strong>Vizualni prikaz:</strong> Aktivnosti se prikažejo v koledarju kot časovni bloki, barvno kodirani glede na kategorijo in prioriteto.</li>
          <li><strong>Filtriranje in iskanje:</strong> Možnost iskanja aktivnosti po datumu, kategoriji in prioriteti.</li>
          <li><strong>Opozorila:</strong> Pred začetkom aktivnosti se sprožijo opomniki (vizualni in/ali zvočni), ki jih uporabnik lahko prilagodi.</li>
        </ul>
      </div>
      <div class="subsection">
        <h4>Primer uporabe:</h4>
        <ul>
          <li class="example">
            Uporabnik vnese aktivnost "Sestanek s stranko" z datumom "15.03.2025", časom "09:00-10:00", kategorijo "delo" in prioriteto "visoka". Sistem preveri vnos, shrani podatke in prikaže aktivnost kot modri blok v koledarju. Pred sestankom se sproži opozorilo.
          </li>
        </ul>
      </div>
      <div class="subsection">
        <h4>Dodatne tehnične in varnostne podrobnosti:</h4>
        <ul>
          <li>Vsi vnosi se shranjujejo lokalno v JSON datotekah za takojšnji dostop brez uporabe zunanjih povezav.</li>
          <li>Implementirana je osnovna validacija z JavaScript funkcijami, ki preverjajo logiko časovnih intervalov.</li>
          <li>Podatki se obdelujejo lokalno, s čimer se zmanjša tveganje uhajanja osebnih informacij.</li>
        </ul>
      </div>
    </div>
    
    <!-- 2. Sledenje napredka in dosežkov -->
    <h3>2. Sledenje napredka in dosežkov</h3>
    <div class="detail">
      <p><strong>Namen:</strong> Omogočiti uporabnikom spremljanje opravljenih nalog in doseženih ciljev ter zagotavljati statistične povzetke njihovega napredka.</p>
      <div class="subsection">
        <h4>Vhodi:</h4>
        <ul>
          <li><strong>Vnos opravljenih nalog:</strong> Datum, opis, trajanje opravljene naloge in indikator uspešnosti (npr. odstotek dokončanja).</li>
          <li><strong>Merilniki uspešnosti:</strong> Podatki o doseženih ciljih, zaključeni projekti in primerjave med različnimi obdobji.</li>
          <li><strong>Dodatni komentarji:</strong> Uporabniške ocene in povratne informacije, ki omogočajo samooceno napredka.</li>
        </ul>
      </div>
      <div class="subsection">
        <h4>Izhodi:</h4>
        <ul>
          <li><strong>Grafični prikazi:</strong> Črtni grafi, stolpčni diagrami in pie grafikoni, ki vizualno prikazujejo napredek skozi čas.</li>
          <li><strong>Statistični povzetki:</strong> Izračuni, kot so skupno število opravljenih nalog, povprečni čas dokončanja in odstotek doseženih ciljev.</li>
          <li><strong>Povratne informacije:</strong> Priporočila za izboljšave na podlagi analiziranih podatkov.</li>
        </ul>
      </div>
      <div class="subsection">
        <h4>Primer uporabe:</h4>
        <ul>
          <li class="example">
            Uporabnik vnese dnevno poročilo o opravljenih nalogah. Sistem ugotovi, da je opravljenih 85 % načrtovanih nalog v zadnjem tednu ter prikaže črtni graf in podrobno statistiko, s čimer svetuje spremembo urnika za večjo produktivnost.
          </li>
        </ul>
      </div>
      <div class="subsection">
        <h4>Dodatne tehnične in varnostne podrobnosti:</h4>
        <ul>
          <li>Izračuni in pretvorba podatkov se izvajajo lokalno s preprostimi algoritmi.</li>
          <li>Grafični prikazi se ustvarjajo z uporabo HTML5 in CSS animacij brez zunanjih knjižnic.</li>
          <li>Podatki se shranjujejo lokalno, s čimer se zagotavlja zasebnost in zmanjšuje tveganje zlorab.</li>
        </ul>
      </div>
    </div>
    
    <!-- 3. Gamifikacijski mehanizmi -->
    <h3>3. Gamifikacijski mehanizmi</h3>
    <div class="detail">
      <p><strong>Namen:</strong> Spodbujati motivacijo in angažiranost uporabnikov z nagrajevanjem na podlagi doseženih rezultatov in interakcij v aplikaciji.</p>
      <div class="subsection">
        <h4>Vhodi:</h4>
        <ul>
          <li><strong>Opravljenih nalog podatki:</strong> Informacije o uspešno zaključenih nalogah in doseženih ciljih.</li>
          <li><strong>Interakcije uporabnikov:</strong> Komentarji, glasovanje (všečki in negativni glasovi) ter ocene prispevkov.</li>
          <li><strong>Merilniki napredka:</strong> Število zbranih točk, badge-ov in nivojev, ki se primerjajo med uporabniki.</li>
        </ul>
      </div>
      <div class="subsection">
        <h4>Izhodi:</h4>
        <ul>
          <li><strong>Uporabniški profil:</strong> Prikaz točk, badge-ov in nivojev, ki jasno prikazuje napredek uporabnika.</li>
          <li><strong>Lestvice:</strong> Primerjava doseženih rezultatov med uporabniki ali znotraj skupnosti.</li>
          <li><strong>Prilagoditev izzivov:</strong> Sistem predlaga nove naloge glede na trenutno stopnjo napredka.</li>
        </ul>
      </div>
      <div class="subsection">
        <h4>Primer uporabe:</h4>
        <ul>
          <li class="example">
            Po tedenskem izzivu aplikacija samodejno dodeli uporabniku 150 točk in badge "Produktivni začetnik", nato pa prikaže lestvico rezultatov in predlaga nove izzive.
          </li>
        </ul>
      </div>
      <div class="subsection">
        <h4>Dodatne tehnične in varnostne podrobnosti:</h4>
        <ul>
          <li>Algoritmi za dodeljevanje točk so vnaprej določeni in shranjeni lokalno.</li>
          <li>Uporabniški vmesnik se samodejno posodablja ob vsakem vnosu interakcij.</li>
          <li>Podatki o nagradah se obdelujejo lokalno, kar preprečuje manipulacijo s podatki.</li>
        </ul>
      </div>
    </div>
    
    <!-- 4. Personalizacija uporabniškega vmesnika -->
    <h3>4. Personalizacija uporabniškega vmesnika</h3>
    <div class="detail">
      <p><strong>Namen:</strong> Omogočiti, da uporabnik prilagodi videz in funkcionalnosti aplikacije glede na svoje osebne preference, s čimer se izboljša celotna uporabniška izkušnja.</p>
      <div class="subsection">
        <h4>Vhodi:</h4>
        <ul>
          <li><strong>Uporabniške nastavitve:</strong> Izbira barvnih shem, tipografije, postavitve elementov, ozadij in možnosti prikaza določenih modulov.</li>
          <li><strong>Personalizirani moduli:</strong> Možnost vklopa ali izklopa določenih funkcij glede na želje uporabnika.</li>
        </ul>
      </div>
      <div class="subsection">
        <h4>Izhodi:</h4>
        <ul>
          <li><strong>Prilagojen vmesnik:</strong> Neposredna sprememba videza aplikacije ob spremembi nastavitev (barvna shema, tipografija, postavitev).</li>
          <li><strong>Več profilov:</strong> Možnost shranjevanja in preklapljanja med različnimi uporabniškimi profili, vsak z lastnimi nastavitvami.</li>
        </ul>
      </div>
      <div class="subsection">
        <h4>Primer uporabe:</h4>
        <ul>
          <li class="example">
            Uporabnik spremeni barvno shemo in tip pisave v nastavitvah. Aplikacija se takoj osveži in prikaže nov videz. Uporabnik lahko preklopi med profili, npr. "Delo" in "Prosti čas".
          </li>
        </ul>
      </div>
      <div class="subsection">
        <h4>Dodatne tehnične in varnostne podrobnosti:</h4>
        <ul>
          <li>Nastavitve se shranjujejo v lokalne JSON datoteke, ki se naložijo ob zagonu aplikacije.</li>
          <li>Uporabniški vmesnik uporablja CSS animacije za gladke prehode ob spremembah.</li>
          <li>Dostop do nastavitev je omejen na lokalni sistem, kar preprečuje nepooblaščen dostop do osebnih preferenc.</li>
        </ul>
      </div>
    </div>
    
    <!-- 5. Sinhronizacija in varnost podatkov -->
    <h3>5. Sinhronizacija in varnost podatkov</h3>
    <div class="detail">
      <p><strong>Namen:</strong> Zagotoviti varno shranjevanje in periodično sinhronizacijo vseh uporabniških podatkov, da so informacije vedno ažurne in zaščitene.</p>
      <div class="subsection">
        <h4>Vhodi:</h4>
        <ul>
          <li><strong>Podatki za shranjevanje:</strong> Vsi podatki (aktivnosti, dosežki, nastavitve) se shranjujejo v strukturiranih JSON datotekah.</li>
          <li><strong>Varnostni parametri:</strong> Kontrolne vsote, šifrirani podatki in avtorizacijski žetoni, ki se uporabljajo za preverjanje integritete podatkov.</li>
        </ul>
      </div>
      <div class="subsection">
        <h4>Izhodi:</h4>
        <ul>
          <li><strong>Periodična sinhronizacija:</strong> Podatki se ob vzpostavitvi zanesljive internetne povezave samodejno posodobijo na centralnem strežniku.</li>
          <li><strong>Varnostni ukrepi:</strong> Preverjanje integritete podatkov s kontrolnimi vsotami in enkripcijo občutljivih informacij.</li>
          <li><strong>Offline dostop:</strong> Ključne funkcije so na voljo tudi brez internetne povezave, kar omogoča neprekinjeno delo.</li>
        </ul>
      </div>
      <div class="subsection">
        <h4>Primer uporabe:</h4>
        <ul>
          <li class="example">
            Uporabnik vnese novo aktivnost. Podatki se shranijo lokalno. Ko se naprava poveže na internet, se podatki sinhronizirajo s centralnim strežnikom, pri čemer se preveri integriteta s kontrolnimi vsotami in šifrira občutljive informacije.
          </li>
        </ul>
      </div>
      <div class="subsection">
        <h4>Dodatne tehnične in varnostne podrobnosti:</h4>
        <ul>
          <li>Sinhronizacija se izvaja s periodičnim preverjanjem omrežne povezave; lokalni in strežniški podatki se primerjajo z uporabo kontrolnih vsot.</li>
          <li>Občutljivi podatki se šifrirajo s preprostim algoritmom (npr. AES-128, implementiran v JavaScript-u brez zunanjih knjižnic).</li>
          <li>Dostop do lokalno shranjenih datotek je zaščiten z dovoljenji operacijskega sistema, s čimer se prepreči nepooblaščen dostop s strani drugih aplikacij.</li>
        </ul>
      </div>
    </div>
    
    <!-- UML Diagram -->
    <h3>UML Diagram primerov uporabe</h3>
    <div class="detail">
      <p>
        Diagram prikazuje celoten potek uporabe aplikacije HobbyHub, vključno z vnosi, validacijo podatkov, interakcijami med moduli (koledarski sistem, sledenje napredka, gamifikacija, personalizacija, sinhronizacija) in vlogo različnih tipov uporabnikov (navadni uporabnik, administrator).
      </p>
      <img src="/images/uml_diagram.png" alt="UML diagram primerov uporabe" class="uml-diagram">
      <p class="note">
        Opomba: Prepričajte se, da je datoteka <code>uml_diagram.png</code> shranjena v mapi <code>images</code> in ustreza trenutni zasnovi aplikacije.
      </p>
    </div>
  </section>
</body>
</html>
`;

const posebnostiTekst = `
/posebnosti/

**************************************************
Tehnične zahteve in posebnosti implementacije
**************************************************

1. Uporabljene tehnologije:
   • **Node.js:** Uporabljeni so samo privzeti moduli (http, url, fs, path), kar zagotavlja enostavno in neodvisno delovanje.
   • **Progressive Web App (PWA):** Omogoča delo v offline načinu, periodično sinhronizacijo podatkov in integracijo push obvestil.
   • **Lokalno shranjevanje:** Vsi uporabniški podatki se hranijo v strukturiranih JSON datotekah na lokalnem sistemu, kar omogoča hiter dostop in varnost.

--------------------------------------------------
2. Implementacija posameznih funkcionalnosti:
--------------------------------------------------

   a) **Koledarski sistem:**
      - **Vnos/urejanje:** Uporabnik vnese podatke preko obrazca (datum, čas, kategorija, opis, prioriteta).
      - **Validacija:** Preverjanje pravilnosti vnosa (npr. začetni čas < končni čas, pravilen format datuma).
      - **Shranjevanje:** Podatki se shranjujejo lokalno v JSON datotekah in se periodično sinhronizirajo s strežnikom.
      - **Varnost:** Lokalna obdelava podatkov brez nešifriranega prenosa.

   b) **Sledenje napredka in dosežkov:**
      - **Beleženje:** Sistem beleži opravljenosti nalog in dosežene cilje ter izračunava statistične podatke.
      - **Prikaz:** Generira grafične prikaze (črtni grafi, stolpci, pie grafikoni) za vizualizacijo napredka.
      - **Povratne informacije:** Na podlagi analiziranih podatkov se uporabniku prikažejo priporočila za izboljšave.
      - **Varnost:** Podatki se obdelujejo lokalno, kar zagotavlja zasebnost.

   c) **Gamifikacijski mehanizmi:**
      - **Nagrajevanje:** Dodeljevanje točk, badge-ov in dosežkov na osnovi vnaprej določenih pravil.
      - **Interakcije:** Omogočajo se komentarji, glasovanje in ocenjevanje prispevkov med uporabniki.
      - **Prilagoditev:** Sistem dinamično prilagaja nove izzive glede na dosežke.
      - **Varnost:** Vsi izračuni in obdelava interakcij potekajo lokalno.

   d) **Personalizacija uporabniškega vmesnika:**
      - **Nastavitve:** Uporabnik lahko prilagodi barvno shemo, tipografijo, postavitev in druge vizualne elemente.
      - **Shranjevanje:** Nastavitve se shranjujejo lokalno v JSON datotekah in se takoj uporabijo.
      - **Profiliranje:** Podpira se shranjevanje in preklapljanje med več uporabniškimi profili.
      - **Varnost:** Dostop do nastavitev je omejen in zaščiten na lokalnem nivoju.

   e) **Sinhronizacija in varnost podatkov:**
      - **Sinhronizacija:** Podatki se periodično posodobijo na centralnem strežniku, ko je na voljo zanesljiva internetna povezava.
      - **Integriteta:** Preverjanje integritete podatkov s kontrolnimi vsotami.
      - **Enkripcija:** Občutljivi podatki se šifrirajo (npr. z uporabo AES algoritma, implementiranega v JavaScript-u).
      - **Varnostni ukrepi:** Avtorizacija in omejevanje dostopa do lokalnih datotek preko operacijskih dovoljenj.

--------------------------------------------------
3. Posebnosti sistema:
--------------------------------------------------

   • **Lokalna servirnost:** Vse vsebine (HTML, slike, podatki) so shranjene in servirane lokalno preko Node.js brez uporabe zunanjih povezav.
   • **Optimizacija:** Aplikacija je zasnovana za hitro obdelavo podatkov in odziven prikaz, tudi na napravah z omejenimi zmogljivostmi.
   • **Offline način:** Ključne funkcionalnosti so na voljo tudi brez internetne povezave, kar omogoča neprekinjeno uporabo.
   • **Modularna arhitektura:** Omogoča enostavno nadgradnjo in dodajanje novih funkcionalnosti brez večjih sprememb v osnovni strukturi.
   • **Varnost podatkov:** Vsi uporabniški podatki so zaščiteni s varnostnimi ukrepi, ki preprečujejo nepooblaščen dostop in manipulacijo.
`;

module.exports = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
  
    if (pathname === '/funkcionalnosti-odjemalca/') {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(funkcionalnostiHTML);
    } else if (pathname === '/posebnosti/') {
      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(posebnostiTekst);
    } else if (pathname.startsWith('/images/')) {
      const filePath = path.join(__dirname, 'public', pathname);
      const ext = path.extname(filePath).toLowerCase();
      let contentType = 'application/octet-stream';
      if (ext === '.png') contentType = 'image/png';
      else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
      else if (ext === '.gif') contentType = 'image/gif';
      serveStaticFile(filePath, contentType, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 - Vsebina ni najdena.');
    }
  };