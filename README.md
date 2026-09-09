# Sito Web Vetrina per Ristorante / Pizzeria (Template Replicabile & Resellable)

Questo progetto è una replica fedele, moderna e reattiva del sito web del ristorante, progettato specificamente per essere **facilmente personalizzabile e rivenduto ad altri ristoranti o pizzerie**.

---

## 🌟 Caratteristiche Principali

1. **Zero Dipendenze / Zero Build**: Realizzato in puro HTML5 semantico, CSS3 moderno (con variabili CSS) e JavaScript ES6. Non serve `npm`, `node_modules` né alcuna compilazione: basta un doppio clic su `index.html` per vederlo funzionare all'istante!
2. **Configurazione Centralizzata in 1 File (`js/config.js`)**: 
   - Nome del ristorante, slogan e anno di fondazione
   - Indirizzo, telefono, orari, coordinate/mappa Google Maps
   - Sezioni "Chi siamo", "Storia", "Filosofia" e "3 Punti di forza"
   - Menu completo suddiviso in categorie (Antipasti, Primi/Secondi, Dolci, Bevande) con prezzi, descrizioni e badge allergeni/diete (Vegano, Senza latticini, ecc.)
   - Foto della galleria
3. **Design Responsive & Mobile-First**: Look & feel scuro elegante (Warm Charcoal / Dark Earth con accenti Rosso Pomodoro e Oro, sezione storia in Verde Oliva scuro), menu hamburger su smartphone, icone social e modulo di prenotazione tavolo interattivo.
4. **Pronto per GitHub & Netlify**: Include già `netlify.toml` per il deploy automatico con certificato HTTPS gratuito e CDN ultra-veloce.

---

## 🚀 Guida: Da Google Drive a GitHub a Netlify

Poiché Google Drive è un archivio cloud e non un sistema di controllo versione (Git), il flusso standard e più affidabile per collegare i file a GitHub e Netlify è il seguente:

### Passo 1: Scaricare i file da Google Drive sul tuo computer
1. Apri la cartella **"Sito ristorante"** creata nel tuo Google Drive.
2. Scarica l'archivio ZIP del progetto (`sito-ristorante.zip`) oppure la cartella stessa.
3. Estrai la cartella sul tuo computer (es. sul Desktop o nella cartella Documenti).

### Passo 2: Creare il Repository su GitHub
Hai due modi semplicissimi:

#### Metodo A: Tramite il sito web di GitHub (Senza terminale)
1. Vai su [GitHub.com](https://github.com) e accedi al tuo account.
2. Clicca su **New Repository** (o il tasto verde con il `+`).
3. Nome repository: `sito-ristorante` (o il nome del ristorante cliente).
4. Impostalo come **Public** o **Private** e clicca su **Create repository**.
5. Nella schermata successiva, clicca su **"uploading an existing file"**.
6. Trascina all'interno tutti i file e le cartelle del progetto (`index.html`, `netlify.toml`, `.gitignore`, la cartella `css/`, la cartella `js/`).
7. Clicca su **Commit changes**.

#### Metodo B: Tramite Git / Terminale o GitHub Desktop
```bash
cd percorso/della/cartella/sito_ristorante
git init
git add .
git commit -m "Primo commit: sito ristorante completo"
git branch -M main
git remote add origin https://github.com/TUO-USERNAME/sito-ristorante.git
git push -u origin main
```

---

### Passo 3: Collegare GitHub a Netlify per il Deploy Automatico
1. Vai su [Netlify.com](https://www.netlify.com) ed effettua il login (consigliato farlo direttamente tramite **Log in with GitHub**).
2. Dalla tua dashboard di Netlify, clicca su **Add new site** > **Import an existing project**.
3. Seleziona **GitHub** e autorizza l'accesso al repository `sito-ristorante`.
4. Netlify rileverà automaticamente il file `netlify.toml`:
   - **Branch to deploy**: `main`
   - **Build command**: *(lascia vuoto)*
   - **Publish directory**: `.` *(cartella corrente)*
5. Clicca su **Deploy site**.
6. In meno di 30 secondi il sito sarà **online in tutto il mondo** con URL sicuro `https://nome-assegnato.netlify.app`.
7. Dalle impostazioni di Netlify (*Site configuration > Domain management*) puoi collegare in qualsiasi momento un dominio personalizzato (es. `www.nomelocale.it`).

Ogni volta che in futuro farai una modifica e farai `git push` su GitHub, **Netlify aggiornerà il sito automaticamente in pochi secondi!**

---

## 🎨 Come Adattare e Rivendere il Sito ad un Altro Ristorante

Per vendere questo sito a un nuovo cliente (ristorante, bistrot, pizzeria o pub):

1. Apri il file **`js/config.js`** con qualsiasi editor di testo (VS Code, Sublime Text, ecc.).
2. Modifica l'oggetto `SITE_CONFIG`:
   - Cambia `brand.name` col nome del nuovo locale.
   - Cambia `contact.address`, `contact.phone` e `contact.hours`.
   - Incolla l'URL della mappa Google Maps del nuovo locale in `contact.mapsEmbedUrl`.
   - Modifica o sostituisci i piatti, i prezzi e le categorie nella sezione `menu`.
   - Aggiorna i testi in `story` e `highlights` con la storia del nuovo cliente.
3. Se vuoi cambiare la combinazione di colori principali (es. da Rosso Pomodoro ad Azzurro Mare o Verde Salvia), apri `css/styles.css` e modifica semplicemente le variabili in alto:
   ```css
   :root {
     --accent-red: #d1382b;   /* Cambia con il colore del nuovo brand */
     --accent-gold: #d6af5d;  /* Colore dettagli/prezzi */
   }
   ```
4. Salva il file: il sito è già pronto per il nuovo ristorante!
