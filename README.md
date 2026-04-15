# Gestione Scarti - PWA

## 📱 Come installare su iPhone

### Opzione 1: Su GitHub Pages (Consigliato)

1. **Crea un repository GitHub** e nomina il file HTML `index.html`
2. **Upload i file:**
   - `index.html`
   - `manifest.json`
   - `sw.js`
3. **Abilita GitHub Pages:** Vai su Settings → Pages → Source: Deploy from branch (main)
4. **Copia il link:** es. `https://tuousername.github.io/scarti-app`

### Opzione 2: Su un server web (Nginx, Apache)
Basta mettere i 3 file in una cartella pubblica del tuo server.

---

## 📲 Installare su iPhone

1. **Apri il link in Safari** (non su Chrome, Edge, etc. - iOS blocca PWA su browser terzi)
2. **Tap sul bottone Condividi** (in basso)
3. **Tap su "Aggiungi a Home"** oppure "Add to Home Screen"
4. **Dai un nome** (es. "Scarti")
5. **Tap su "Aggiungi"**

L'app sarà ora sulla home come una vera app. Non serve internet per usarla (le librerie jsPDF si cacheranno), ma servirà per la prima apertura.

---

## 🖥️ Usare da desktop

Apri il link in Chrome/Edge, vedrai un banner per installare. O usa il link come web app normalmente.

---

## 📝 Come usare l'app

### Form: Aggiungi Pezzo
1. **N° Pezzo** (obbligatorio) - es. 0308-51
2. **Provider** (dropdown) - Trigo, Clavey, Ricom
3. **DMC** (obbligatorio) - es. 38835
4. **Stampo e JD** (obbligatorio) - es. 3.2 057
5. **Difetto** (facoltativo, ma se presente obbliga Zona)
6. **Zona** (facoltativo, ma obbligatorio se Difetto riempito)
7. **Operatore** (facoltativo)
8. **Verificato** (checkbox, facoltativo)
9. **Regole e Tolleranze** (facoltativo)
10. **Foto** - Click/trascina fino a 4 foto

### Genera PDF
- Bottone **"Genera PDF per Provider"** crea 3 PDF separati
- Solo provider con dati generano PDF
- File si scarica automaticamente con nome: `Scarti_Trigo_15-04-2026.pdf` etc.

---

## 🔧 Configurazione

Se vuoi cambiare:
- **Provider**: Modifica `const providers = ['Trigo', 'Clavey', 'Ricom'];` nel file HTML
- **Colori**: Cambia i valori `background: '#3498db'` negli stili
- **Numero foto max**: Cambia il check `if (fotoPreview.length + files.length > 4)`

---

## 💾 Dati

- **Non salvati**: I dati rimangono solo in sessione (reload = perdita dati)
- **Per salvare**: Genera il PDF prima di ricaricare
- **Foto**: Non salvate da nessuna parte, solo temporanee fino al PDF

---

## 📞 Troubleshooting

### "Non riesco ad installare su iPhone"
- Assicurati di usare **Safari** (non Chrome/Edge)
- Il server DEVE essere **HTTPS** (GitHub Pages lo è automaticamente)
- Riprova dopo 5 minuti

### "Le foto non si caricano nel PDF"
- Permetti l'accesso alla fotocamera/galleria quando chiesto
- Usa foto in formato JPG o PNG
- Max 4 foto per pezzo

### "L'app è lenta"
- Normale la prima volta (carica le librerie)
- Successivamente usa la cache
- Su Wi-Fi è più veloce

---

## 🚀 Aggiornamenti

Se modifichi l'app:
1. Modifica i file localmente
2. Push su GitHub (o aggiorna il server)
3. Su iPhone: Elimina l'app e reinstalla, oppure aspetta qualche giorno (iOS cachera per un po')

---

## 📋 File inclusi

- **index.html** - App principale (React + form + PDF)
- **manifest.json** - Configurazione PWA
- **sw.js** - Service Worker (per offline, cache, etc)

Non serve nient'altro. Sono 3 file HTML/JS/JSON puri.

---

## 📖 Note

- App completamente offline-first (dopo primo caricamento)
- Dati NON sincronizzati su cloud (rimangono solo sul telefono)
- PDF generati istantaneamente, pronti per WhatsApp/Email
- Mobile-optimized per iPhone, ma funziona anche su Android
