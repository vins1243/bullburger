/**
 * CONFIGURAZIONE DEL SITO RISTORANTE - Bullburger
 * Menu reale completo aggiornato con 9 categorie e 66 portate.
 */
const SITE_CONFIG = {
  // Dati Generali del Ristorante
  brand: {
    name: "Bullburger",
    tagline: "Burger House & Smash Burgers",
    logoHero: "foto/logo.png",
    logoNav: "foto/logo-2.png",
    description: "Benvenuti da Bullburger: la vera burger house a Villapiana Lido. Hamburger gourmet, smash burger con carni 100% selezionate, bun artigianali, salse esclusive e birre artigianali."
  },

  // Contatti e Recapiti
  // Integrazione Google Sheets per Prenotazioni in Tempo Reale
  googleSheetUrl: "https://docs.google.com/spreadsheets/d/1u5aKXWIb00V_u038qUka_eje1f8DpvLuG0wznZmRpcI/edit",
  googleSheetEndpoint: "https://script.google.com/macros/s/AKfycbywuk8Mgl7oeB8vrXjmsftYINLiRTpuRNToJYdur0TDXJTXAvJXA_9GfmGeuQuwT80h/exec", // Incolla qui l'URL della Web App di Google Apps Script

  contact: {
    phone: "3293122388",
    phoneDisplay: "329 312 2388",
    email: "info@bullburger.it",
    address: "Via Nazionale, S.da Statale 106 Jonica",
    cap: "87076",
    city: "Villapiana Lido",
    province: "CS",
    country: "Italia",
    hours: "Tutti i giorni: 20:00 - 00:00",
    mapsPlaceUrl: "https://www.google.com/maps/place/Bull+Burger/@39.8053935,16.3968208,13z/data=!4m21!1m14!4m13!1m4!2m2!1d16.3879341!2d39.8195049!4e1!1m6!1m2!1s0x133f5fc4a03ec043:0x80ad513960d73089!2sBull+Burger,+Via+Nazionale,+S.da+Statale+106+Jonica,+87076+Villapiana+Lido+CS!2m2!1d16.4871083!2d39.8060219!3e0!3m5!1s0x133f5fc4a03ec043:0x80ad513960d73089!8m2!3d39.8060219!4d16.4871083!16s%2Fg%2F11gjj9by7s?entry=ttu",
    mapsEmbedUrl: "https://maps.google.com/maps?q=Bull+Burger,+Via+Nazionale,+S.da+Statale+106+Jonica,+87076+Villapiana+Lido+CS&t=&z=16&ie=UTF8&iwloc=&output=embed"
  },

  // Social Media
  socials: {
    facebook: "https://www.facebook.com/bullburger/?locale=it_IT",
    instagram: "https://www.instagram.com/bullburger/"
  },

  // Sezione "Il Ristorante" (I 3 Punti di Forza)
  highlights: [
    {
      number: "01",
      title: "MACELLERIA & CARNI PREGIATE",
      text: "Grazie a oltre 35 anni di esperienza del nostro mastro macellaio, proponiamo l'eccellenza delle carni podoliche calabresi e dei più prestigiosi tagli internazionali (Tomahawk, T-Bone, Cowboy e selezioni Angus)."
    },
    {
      number: "02",
      title: "SMASH BURGER & CARNI SELEZIONATE",
      text: "Carne 100% italiana selezionata e macinata fresca ogni giorno. La tecnica originale dello smash burger su piastra rovente crea una crosticina croccante che sigilla tutti i succhi del manzo."
    },
    {
      number: "03",
      title: "FILOSOFIA SLOW FOOD & CONVIVIALITÀ",
      text: "Questo non è un fast food, ma un luogo in cui condividere il piacere della buona tavola. Ogni piatto è preparato rigorosamente al momento, rispettando i tempi naturali di cottura e la massima freschezza degli ingredienti."
    }
  ],

  // Sezione Storia
  story: {
    title: "LA NOSTRA STORIA & FILOSOFIA",
    paragraphs: [
      "Da noi troverete prodotti freschi e genuini, preparati con rispetto per la materia prima, rigorosamente al momento. Abbracciamo la filosofia dello slow food, del godersi il pasto come un'esperienza culinaria e conviviale.",
      "Questo non è un fast food, ma un luogo in cui condividere il piacere di piatti preparati con cura e passione. Ricerca, amore per il territorio e dedizione ci portano a selezionare solo il meglio: grazie all'esperienza di oltre 35 anni del nostro macellaio, possiamo proporvi l'eccellenza delle carni podoliche e dei tagli pregiati internazionali.",
      "Dagli smash burger croccanti e succosi ai burger gourmet cotti a regola d'arte con morbidi bun brioche e salse fatte in casa, fino alle birre artigianali e ai drink rinfrescanti come il nostro celebre Ananzù all'anice selvatico della Sila, potrete assaporare i sapori autentici della nostra terra."
    ]
  },

  // Sezione Filosofia / Lievitazione
  philosophy: {
    title: "LA PERFEZIONE RICHIEDE TEMPO",
    text: "La perfezione richiede tempo perché ogni dettaglio, dalla selezione delle carni migliori alla cottura millimetrica sulla piastra, ogni nostro burger è pensato per regalare un'esplosione di gusto al primo morso. Perché per noi di Bullburger servire un vero hamburger è una vera arte. Perché per noi di Bullburger la fretta può sfamare, ma solo la dedizione sa regalare vere emozioni."
  },

  // Galleria Immagini
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
      caption: "I Nostri Tagli Pregiati alla Brace"
    },
    {
      url: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80",
      caption: "Double Smash Burger con Patatine Rustiche"
    },
    {
      url: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
      caption: "I Nostri Burger Gourmet con Pane Fatto in Casa"
    },
    {
      url: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80",
      caption: "Bacon Cheeseburger con Salsa Segreta Bullburger"
    }
  ],

  // MENU COMPLETO REALE Bullburger
  menu: {
  "categories": [
    {
      "id": "hamburger",
      "name": "HAMBURGER",
      "subtitle": "I nostri hamburger preparati al momento con carni selezionate. Disponibili nei formati da 120g e 200g.",
      "items": [
        {
          "name": "CLASSICO",
          "price": "120g € 5,00 | 200g € 8,00",
          "description": "Hamburger, insalata, pomodoro, maionese",
          "tags": [
            "Latte e derivati"
          ]
        },
        {
          "name": "CHEESEBURGER",
          "price": "120g € 5,50 | 200g € 8,50",
          "description": "Hamburger, cheddar, insalata, pomodoro, cipolla, maionese",
          "tags": [
            "Latte e derivati"
          ]
        },
        {
          "name": "TEXANO",
          "price": "120g € 7,50 | 200g € 9,50",
          "description": "Hamburger, cheddar, insalata, salsa barbecue, cipolla agrodolce",
          "tags": [
            "Latte e derivati",
            "Senape"
          ]
        },
        {
          "name": "ARIZONA",
          "price": "120g € 7,50 | 200g € 9,50",
          "description": "Hamburger, rucola, pomodoro, salsa della casa, caciocavallo, cipolla",
          "tags": [
            "Latte e derivati",
            "Senape",
            "Uova e derivati"
          ]
        },
        {
          "name": "COLORADO",
          "price": "240g € 10,50 | 400g € 15,00",
          "description": "Doppio hamburger (120+120g o 200+200g), doppio caciocavallo, insalata, uovo sodo, cipolla agrodolce, salsa della casa",
          "tags": [
            "Doppio Burger",
            "Latte e derivati",
            "Senape",
            "Uova e derivati"
          ]
        },
        {
          "name": "MONTANA",
          "price": "240g € 10,00 | 400g € 15,00",
          "description": "Doppio hamburger (120+120g o 200+200g), doppio cheddar, doppio bacon, insalata, uovo all'occhio di bue, salsa della casa",
          "tags": [
            "Doppio Burger",
            "Latte e derivati"
          ]
        },
        {
          "name": "LITTLE ITALY",
          "price": "120g € 8,00 | 200g € 10,00",
          "description": "Hamburger, funghi, rucola, cacio, scaglie di grana, maionese",
          "tags": [
            "Latte e derivati"
          ]
        },
        {
          "name": "4 CHEESE",
          "price": "120g € 6,50 | 200g € 8,50",
          "description": "Hamburger, cheddar, caciocavallo, grana, gorgonzola",
          "tags": [
            "Latte e derivati"
          ]
        },
        {
          "name": "TRIPLE BURGER",
          "price": "360g € 13,50 | 600g € 18,50",
          "description": "Triplo hamburger (3x120g o 3x200g), triplo cheddar, triplo bacon, salsa barbecue",
          "tags": [
            "Triplo Burger",
            "Latte e derivati"
          ]
        },
        {
          "name": "HAMBURGER RIPIENO",
          "price": "200g € 10,00",
          "description": "Hamburger ripieno di formaggio e bacon, servito con contorno di patatine fritte",
          "tags": [
            "Con Patatine",
            "Latte e derivati"
          ]
        },
        {
          "name": "CALABRESE",
          "price": "120g € 8,00 | 200g € 10,50",
          "description": "Hamburger, rucola, 'nduja, pomodori secchi, scaglie di grana, cipolla, maionese",
          "tags": [
            "Piccante",
            "Latte e derivati"
          ]
        },
        {
          "name": "ITALIANO",
          "price": "120g € 9,00 | 200g € 11,50",
          "description": "Hamburger, caciocavallo, mortadella, granella di pistacchio, maionese, insalata",
          "tags": [
            "Frutta a guscio",
            "Latte e derivati"
          ]
        },
        {
          "name": "ORTOLANO",
          "price": "120g € 8,00 | 200g € 10,00",
          "description": "Hamburger, salsa boscaiola, insalata, melanzane grigliate, cacio",
          "tags": [
            "Frutta a guscio",
            "Latte e derivati"
          ]
        },
        {
          "name": "NEW JERSEY",
          "price": "120g € 9,00 | 200g € 12,50",
          "description": "Hamburger, salsa cheddar, anelli di cipolla, bacon",
          "tags": [
            "Frutta a guscio",
            "Latte e derivati"
          ]
        },
        {
          "name": "SWEETY",
          "price": "120g € 9,00 | 200g € 12,00",
          "description": "Hamburger, rucola, speck, noci, miele",
          "tags": [
            "Frutta a guscio",
            "Latte e derivati"
          ]
        },
        {
          "name": "OREGON",
          "price": "120g € 7,00 | 200g € 9,00",
          "description": "Hamburger, caciocavallo, gorgonzola, melanzane a funghetto, maionese, funghi",
          "tags": [
            "Latte e derivati"
          ]
        },
        {
          "name": "NEVADA",
          "price": "120g € 7,00 | 200g € 9,00",
          "description": "Hamburger, speck, brie, rucola, maionese",
          "tags": [
            "Latte e derivati"
          ]
        },
        {
          "name": "KANSAS",
          "price": "120g € 6,50 | 200g € 8,50",
          "description": "Hamburger, cheddar, cetrioli, cipolla, senape, insalata, maionese",
          "tags": [
            "Latte e derivati",
            "Senape"
          ]
        },
        {
          "name": "MISSOURI",
          "price": "120g € 8,00 | 200g € 10,50",
          "description": "Hamburger, doppio cheddar, cipolla tostata, bacon, ketchup, maionese",
          "tags": [
            "Latte e derivati"
          ]
        },
        {
          "name": "FISH BURGER",
          "price": "€ 8,00",
          "description": "Filetto di pesce dorato, pomodoro, insalata, maionese",
          "tags": [
            "Pesce"
          ]
        },
        {
          "name": "CHICKEN BURGER",
          "price": "200g € 8,50",
          "description": "Pollo con impanatura croccante ai corn flakes, insalata, pomodoro, maionese",
          "tags": [
            "Glutine",
            "Pollo Croccante"
          ]
        }
      ]
    },
    {
      "id": "toast",
      "name": "TOAST",
      "subtitle": "Toast fragranti e farciti preparati al momento.",
      "items": [
        {
          "name": "SEMPLICE",
          "price": "€ 5,00",
          "description": "Speck, sottiletta filante",
          "tags": [
            "Latte e derivati"
          ]
        },
        {
          "name": "SFIZIOSO",
          "price": "€ 4,50",
          "description": "Sottiletta, pomodoro, insalata, maionese",
          "tags": [
            "Latte e derivati"
          ]
        },
        {
          "name": "AMERICAN TOAST",
          "price": "€ 7,00",
          "description": "Bacon croccante, cheddar, uova strapazzate, maionese",
          "tags": [
            "Latte e derivati",
            "Uova e derivati"
          ]
        },
        {
          "name": "CLUB TOAST",
          "price": "€ 9,50",
          "description": "Doppio toast, doppio bacon, doppio cheddar, pomodori, uova strapazzate, insalata, maionese, ketchup",
          "tags": [
            "Doppio Toast",
            "Latte e derivati",
            "Uova e derivati"
          ]
        },
        {
          "name": "LEGGERO",
          "price": "€ 6,00",
          "description": "Tonno, pomodoro, maionese",
          "tags": [
            "Pesce"
          ]
        },
        {
          "name": "CHICKEN TOAST",
          "price": "€ 7,50",
          "description": "Straccetti di pollo, insalata, maionese",
          "tags": [
            "Pollo"
          ]
        }
      ]
    },
    {
      "id": "hot-dog",
      "name": "HOT DOG",
      "subtitle": "I classici hot dog con salse e abbinamenti sfiziosi.",
      "items": [
        {
          "name": "HOT DOG CLASSICO",
          "price": "€ 4,00",
          "description": "Würstel, ketchup, maionese",
          "tags": [
            "Classico"
          ]
        },
        {
          "name": "HOT DOG CON PATATINE",
          "price": "€ 4,50",
          "description": "Würstel, patatine fritte, maionese",
          "tags": [
            "Con Patatine"
          ]
        },
        {
          "name": "HOT DOG CHEDDAR & CIP. TOSTATA",
          "price": "€ 5,50",
          "description": "Würstel, cheddar, cipolla tostata, maionese",
          "tags": [
            "Latte e derivati"
          ]
        },
        {
          "name": "HOT DOG BACON & CHEDDAR",
          "price": "€ 5,00",
          "description": "Würstel, bacon, cheddar, salsa barbecue",
          "tags": [
            "Latte e derivati"
          ]
        },
        {
          "name": "HOT DOG CETRIOLINI & SENAPE",
          "price": "€ 5,00",
          "description": "Würstel, cetriolini, senape, maionese",
          "tags": [
            "Latte e derivati",
            "Senape"
          ]
        }
      ]
    },
    {
      "id": "base-panino",
      "name": "BASE PANINO & EXTRA",
      "subtitle": "Scegli la base del panino e aggiungi i tuoi ingredienti preferiti.",
      "items": [
        {
          "name": "BASE PANINO 120 g",
          "price": "€ 5,00",
          "description": "Pane artigianale con hamburger base da 120g",
          "tags": [
            "Glutine"
          ]
        },
        {
          "name": "BASE PANINO 200 g",
          "price": "€ 7,00",
          "description": "Pane artigianale con hamburger base da 200g",
          "tags": [
            "Glutine"
          ]
        },
        {
          "name": "SEMI DI SESAMO",
          "price": "+ € 1,00",
          "description": "Pane artigianale ricoperto con semi di sesamo",
          "tags": [
            "Sesamo",
            "Glutine"
          ]
        },
        {
          "name": "AMERICANO GLASSATURA VEGETALE",
          "price": "+ € 1,00",
          "description": "Bun americano con glassatura vegetale",
          "tags": [
            "Glutine"
          ]
        },
        {
          "name": "CASERECCIO",
          "price": "+ € 1,00",
          "description": "Pane tradizionale casereccio",
          "tags": [
            "Glutine"
          ]
        },
        {
          "name": "AGGIUNTA INGREDIENTI",
          "price": "+ € 1,50 cad.",
          "description": "Patatine, melanzane, zucchine grigliate, formaggi, pomodoro, cipolla, cetrioli, bacon, funghi, gorgonzola, cipolla agrodolce, cipolla tostata, speck, brie",
          "tags": [
            "Extra"
          ]
        },
        {
          "name": "AGGIUNTA SALSE",
          "price": "+ € 0,75",
          "description": "Salse artigianali aggiuntive a scelta",
          "tags": [
            "Salse"
          ]
        },
        {
          "name": "SERVIZIO AL TAVOLO",
          "price": "€ 1,50",
          "description": "Coperto e servizio al tavolo",
          "tags": [
            "Servizio"
          ]
        }
      ]
    },
    {
      "id": "fritti-contorni",
      "name": "FRITTI & CONTORNI",
      "subtitle": "Patatine calde dorate, sfiziosità fritte e contorni.",
      "items": [
        {
          "name": "PATATINE FRITTE",
          "price": "€ 3,50",
          "description": "Patatine fritte tradizionali croccanti",
          "tags": [
            "Fritti"
          ]
        },
        {
          "name": "PATATE SPEZIATE",
          "price": "€ 4,00",
          "description": "Patate fritte aromatizzate con mix di spezie",
          "tags": [
            "Speziate"
          ]
        },
        {
          "name": "PATATE STEAKHOUSE",
          "price": "€ 3,50",
          "description": "Patate fritte taglio spesso steakhouse",
          "tags": [
            "Steakhouse"
          ]
        },
        {
          "name": "ANELLI DI CIPOLLA (7 PZ)",
          "price": "€ 3,00",
          "description": "Anelli di cipolla dorati e croccanti",
          "tags": [
            "Fritti"
          ]
        },
        {
          "name": "NUGGETS (6 PZ)",
          "price": "€ 5,00",
          "description": "Bocconcini di pollo impanati e fritti",
          "tags": [
            "Pollo"
          ]
        },
        {
          "name": "INSALATA VERDE",
          "price": "€ 3,50",
          "description": "Insalata verde fresca di stagione",
          "tags": [
            "Contorno"
          ]
        },
        {
          "name": "VERDURE GRIGLIATE",
          "price": "€ 5,00",
          "description": "Melanzane, zucchine e verdure di stagione grigliate",
          "tags": [
            "Vegetariano"
          ]
        }
      ]
    },
    {
      "id": "insalate",
      "name": "INSALATE",
      "subtitle": "Insalate fresche, ricche e bilanciate.",
      "items": [
        {
          "name": "CESAR SALAD",
          "price": "€ 9,00",
          "description": "Insalata iceberg, straccetti di petto di pollo, pomodoro, scaglie di grana, salsa",
          "tags": [
            "Latte e derivati"
          ]
        },
        {
          "name": "GREEK SALAD",
          "price": "€ 7,50",
          "description": "Insalata iceberg, cubetti di formaggio, olive nere, pomodoro, cetrioli, cipolla",
          "tags": [
            "Latte e derivati"
          ]
        },
        {
          "name": "MEDITERRANEAN SALAD",
          "price": "€ 7,50",
          "description": "Insalata iceberg, tonno, pomodoro, mais",
          "tags": [
            "Pesce"
          ]
        },
        {
          "name": "INSALATA DELLA CASA",
          "price": "€ 12,50",
          "description": "Insalata iceberg, rucola, mini hamburger, bacon, uovo a occhio di bue, scaglie di grana",
          "tags": [
            "Glutine",
            "Uova e derivati",
            "Latte e derivati"
          ]
        }
      ]
    },
    {
      "id": "birre-bevande",
      "name": "BIRRE & BIBITE",
      "subtitle": "Birre alla spina rinfrescanti e bibite.",
      "items": [
        {
          "name": "BIRRA ROSSA (0,20 cl)",
          "price": "€ 2,50",
          "description": "Birra rossa alla spina",
          "tags": [
            "Alla Spina"
          ]
        },
        {
          "name": "BIRRA ROSSA (0,40 cl)",
          "price": "€ 4,50",
          "description": "Birra rossa alla spina media",
          "tags": [
            "Alla Spina"
          ]
        },
        {
          "name": "BIRRA BIONDA (0,20 cl)",
          "price": "€ 2,50",
          "description": "Birra bionda alla spina",
          "tags": [
            "Alla Spina"
          ]
        },
        {
          "name": "BIRRA BIONDA (0,40 cl)",
          "price": "€ 4,50",
          "description": "Birra bionda alla spina media",
          "tags": [
            "Alla Spina"
          ]
        },
        {
          "name": "ACQUA 1 L",
          "price": "€ 2,00",
          "description": "Acqua naturale o frizzante in bottiglia da 1 litro",
          "tags": [
            "Bevande"
          ]
        },
        {
          "name": "ACQUA 0,50 L",
          "price": "€ 1,00",
          "description": "Acqua naturale o frizzante da mezzo litro",
          "tags": [
            "Bevande"
          ]
        },
        {
          "name": "COCA COLA 33 CL",
          "price": "€ 2,50",
          "description": "Coca Cola classica",
          "tags": [
            "Bevande"
          ]
        },
        {
          "name": "COCA COLA ZERO 33 CL",
          "price": "€ 2,50",
          "description": "Coca Cola Zero zuccheri",
          "tags": [
            "Bevande"
          ]
        },
        {
          "name": "FANTA 33 CL",
          "price": "€ 2,50",
          "description": "Fanta all'arancia",
          "tags": [
            "Bevande"
          ]
        },
        {
          "name": "SPRITE 33 CL",
          "price": "€ 2,50",
          "description": "Sprite al limone",
          "tags": [
            "Bevande"
          ]
        },
        {
          "name": "ESTATHÈ 33 CL",
          "price": "€ 2,50",
          "description": "Thè freddo al limone o alla pesca",
          "tags": [
            "Bevande"
          ]
        }
      ]
    },
    {
      "id": "dessert-caffe",
      "name": "DESSERT & CAFFETTERIA",
      "subtitle": "Dolci artigianali, caffè espresso e amari.",
      "items": [
        {
          "name": "DOLCE DEL GIORNO",
          "price": "€ 4,50",
          "description": "Dolce fresco del giorno preparato dalla casa",
          "tags": [
            "Dessert"
          ]
        },
        {
          "name": "CAFFÈ",
          "price": "€ 0,80",
          "description": "Caffè espresso",
          "tags": [
            "Caffetteria"
          ]
        },
        {
          "name": "AMARI",
          "price": "€ 2,00",
          "description": "Selezione di amari tradizionali",
          "tags": [
            "Digestivo"
          ]
        },
        {
          "name": "GRAPPA",
          "price": "€ 3,00",
          "description": "Grappa morbida o barricata",
          "tags": [
            "Distillato"
          ]
        }
      ]
    }
  ]
}
};
