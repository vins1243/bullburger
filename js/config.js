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
    hours: "Tutti i giorni: 19:00 - 23:30",
    mapsEmbedUrl: "https://maps.google.com/maps?q=Via+Nazionale+S.da+Statale+106+Jonica+87076+Villapiana+Lido+CS&t=&z=15&ie=UTF8&iwloc=&output=embed"
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
      "id": "smash-burger",
      "name": "SMASH BURGERS ORIGINALI",
      "subtitle": "Patty pressate su piastra rovente, crosta dorata e croccante, cuore succoso, in soffice bun artigianale",
      "items": [
        {
          "name": "Double Bacon Smash",
          "price": "13,50 €",
          "description": "Due patty da 110g smashate su piastra, doppio formaggio cheddar fuso, crispy bacon affumicato, cipolla caramellata e salsa Bullburger segreta",
          "tags": [
            "Bestseller",
            "Doppia Carne"
          ],
          "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Classic Cheese Smash",
          "price": "11,50 €",
          "description": "Due patty smashate da 110g, formaggio cheddar fuso, cetriolini sottaceto artigianali, cipolla fresca a dadini, ketchup e senape dolce",
          "tags": [
            "Classico Americano"
          ],
          "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Truffle & Mayo Smash",
          "price": "14,50 €",
          "description": "Due patty smashate, provola dolce fusa, salsa tartufata pregiata, maionese artigianale al pepe nero e rucola selvatica",
          "tags": [
            "Gourmet",
            "Tartufo"
          ],
          "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Spicy Jalapeño Smash",
          "price": "13,00 €",
          "description": "Due patty smashate, cheddar filante, jalapeños piccanti a rondelle, salsa piccante calabrese alla nduja e maionese affumicata",
          "tags": [
            "Piccante",
            "Calabrese"
          ],
          "image": "https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=400&q=80"
        }
      ]
    },
    {
      "id": "panini",
      "name": "HAMBURGER GOURMET",
      "subtitle": "Maxi burger da 250g di manzo selezionato e ingredienti di prima scelta",
      "items": [
        {
          "name": "King Bullburger",
          "price": "18,00 €",
          "description": "Doppio hamburger 250g (500g tot), bacon croccante, uovo all'occhio di bue, cheddar fuso, pomodoro, salsa segreta Bullburger, lattuga",
          "tags": [
            "Maxi Burger",
            "500g Carne"
          ],
          "image": "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Hamburger Classico",
          "price": "12,00 €",
          "description": "Hamburger 250g di manzo selezionato, pomodoro, formaggio cheddar, salsa burger artigianale, lattuga croccante",
          "tags": [
            "Classico"
          ],
          "image": "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Lacrima Facile",
          "price": "12,00 €",
          "description": "Salsiccia artigianale fatta in casa, provola affumicata silana, patate tradizionali, 'nduja di Spilinga, lattuga croccante",
          "tags": [
            "Piccante",
            "Salsiccia Fresca"
          ],
          "image": "https://images.unsplash.com/photo-1521305916504-4a1121188589?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Scostumato",
          "price": "12,00 €",
          "description": "Salsiccia fatta in casa, patate tradizionali 'm'pacchiuse', peperoni saltati, funghi misti trifolati, provola fusa",
          "tags": [
            "Gustoso"
          ],
          "image": "https://images.unsplash.com/photo-1549611016-3a70d82b5040?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Dello Chef",
          "price": "13,00 €",
          "description": "Porchetta selezionata fatta in casa, pomodori secchi, crema ai funghi porcini, provola silana, lattuga croccante",
          "tags": [
            "Porchetta"
          ],
          "image": "https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Succulento",
          "price": "10,00 €",
          "description": "Straccetti teneri di bovino alla piastra, rucola fresca di campo, scaglie di grana DOP, pomodoro",
          "tags": [
            "Straccetti"
          ],
          "image": "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Croccante",
          "price": "10,00 €",
          "description": "Cotoletta di pollo dorata e super croccante, pomodoro, formaggio filante, lattuga croccante",
          "tags": [
            "Pollo Croccante"
          ],
          "image": "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=400&q=80"
        }
      ]
    },
    {
      "id": "fritti-antipasti",
      "name": "FRITTI & ANTIPASTI SFIZIOSI",
      "subtitle": "Dorati, croccanti e ideali da condividere al centro della tavola",
      "items": [
        {
          "name": "Parmigiana di Melanzane",
          "price": "8,00 €",
          "description": "La vera parmigiana alla calabrese con melanzane dorate, sugo ristretto di pomodoro e provola filante",
          "tags": [
            "Fatto in casa"
          ],
          "image": "https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Frittura di Calamari",
          "price": "12,00 €",
          "description": "Calamari teneri passati in semola e fritti al momento, serviti caldi con spicchi di limone BIO",
          "tags": [
            "Pesce Fresco"
          ],
          "image": "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Dippers Patatine Gorgonzola & Speck",
          "price": "6,50 €",
          "description": "Patatine a barchetta croccanti con fonduta calda di gorgonzola DOP e speck tirolese croccante",
          "tags": [
            "Sfizioso"
          ],
          "image": "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Polpettine Fritte di Carne (6 pz)",
          "price": "3,50 €",
          "description": "Morbide polpettine artigianali di manzo e maiale con impasto alle erbe aromatiche",
          "tags": [
            "Fatto a mano"
          ],
          "image": "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Patatine Classiche Stick",
          "price": "Piccola 3,50 € / Media 6,50 €",
          "description": "Patatine dorate e croccanti servite calde con sale iodato",
          "tags": [
            "Vegetariano"
          ],
          "image": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Anelli di Cipolla Dorati",
          "price": "5,00 €",
          "description": "Anelli di cipolla dolce pastellati alla birra e fritti",
          "tags": [
            "Vegetariano"
          ],
          "image": "https://images.unsplash.com/photo-1639024471285-0afc274b711a?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Stick di Pollo (Nuggets)",
          "price": "5,00 €",
          "description": "Bocconcini di filetto di pollo panati e croccanti",
          "tags": [
            "Pollo"
          ],
          "image": "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Supplì Artigianale al Pomodoro",
          "price": "2,50 € al pezzo",
          "description": "Riso al sugo mantecato con cuore filante di mozzarella fior di latte",
          "tags": [
            "Al pezzo"
          ],
          "image": "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Crocchè di Patate Napoletano",
          "price": "2,50 € al pezzo",
          "description": "Purè di patate fresche, prezzemolo, pepe e cuore di formaggio filante",
          "tags": [
            "Al pezzo"
          ],
          "image": "https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Crocchè di Riso Tradizionale",
          "price": "5,00 €",
          "description": "Porzione di crocchè dorati di riso speziato della tradizione",
          "tags": [
            "Porzione"
          ],
          "image": "https://images.unsplash.com/photo-1541529086526-db283c563270?auto=format&fit=crop&w=400&q=80"
        }
      ]
    },
    {
      "id": "contorni",
      "name": "CONTORNI FRESCHI & AL FORNO",
      "subtitle": "Accompagnamenti saporiti con verdure locali e patate della Sila IGP",
      "items": [
        {
          "name": "Patate al Forno IGP Silane",
          "price": "4,50 €",
          "description": "Patate della Sila IGP tagliate a spicchi con buccia, cotte al forno con aglio in camicia, rosmarino e olio EVO",
          "tags": [
            "Patata Silana IGP",
            "Vegano"
          ],
          "image": "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Verdure di Stagione Grigliate",
          "price": "4,50 €",
          "description": "Zucchine, melanzane e peperoni grigliati alla piastra con foglie di menta fresca e olio EVO",
          "tags": [
            "Vegano",
            "Leggero"
          ],
          "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Insalata Verde da Campo",
          "price": "3,00 €",
          "description": "Lattuga e rucola fresca condite con olio EVO frantoiano, succo di limone BIO e sale marino",
          "tags": [
            "Vegano",
            "Bio"
          ],
          "image": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80"
        }
      ]
    },
    {
      "id": "birre-bevande",
      "name": "BIRRE ALLA SPINA & BEVANDE",
      "subtitle": "Grandi birre tedesche ed europee alla spina, bibite fresche in vetro e acque minerali",
      "items": [
        {
          "name": "Spaten Chiara Classica (5.2% vol)",
          "price": "0,25L €3,00 | 0,50L €6,00 | 1L €12,00",
          "description": "Storica birra bavarese dorata, equilibrata e piacevolmente maltata",
          "tags": [
            "Alla Spina",
            "Lager"
          ],
          "image": "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Leffe Rossa d'Abbazia (6.6% vol)",
          "price": "0,30L €4,50 | 0,50L €8,00 | 1L €15,00",
          "description": "Birra rossa belga ad alta fermentazione, sapore dolce, speziato e corposo",
          "tags": [
            "Alla Spina",
            "Rossa"
          ],
          "image": "https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "König Ludwig Weissbier (5.5% vol)",
          "price": "0,30L €4,50 | 0,50L €8,00 | 1L €15,00",
          "description": "Birra di frumento bavarese non filtrata, torbida naturale, rinfrescante con note fruttate",
          "tags": [
            "Alla Spina",
            "Weissbier"
          ],
          "image": "https://images.unsplash.com/photo-1608270191795-0be1f5c6e8e2?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Acqua Minerale (1 Litro)",
          "price": "2,50 €",
          "description": "Disponibile naturale o frizzante in bottiglia di vetro",
          "tags": [
            "Acqua"
          ],
          "image": "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Coca Cola / Coca Cola Zero (in vetro)",
          "price": "3,00 €",
          "description": "Servita fredda con ghiaccio e fetta di limone",
          "tags": [
            "Bibite"
          ],
          "image": "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Fanta / Sprite / Lemon Soda (in vetro)",
          "price": "3,00 €",
          "description": "Bibite rinfrescanti gassate in bottiglia",
          "tags": [
            "Bibite"
          ],
          "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Estathé Limone o Pesca",
          "price": "3,50 €",
          "description": "Il classico tè freddo italiano infuso",
          "tags": [
            "Tè freddo"
          ],
          "image": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Acqua Tonica Premium",
          "price": "3,50 €",
          "description": "Tonica amara con chinino naturale",
          "tags": [
            "Tonica"
          ],
          "image": "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80"
        }
      ]
    },
    {
      "id": "cocktail-digestivi",
      "name": "COCKTAIL GASTRONOMICI & DIGESTIVI",
      "subtitle": "Miscelazione d'eccellenza, aperitivi e amari silani per concludere al meglio la serata",
      "items": [
        {
          "name": "Ananzù Signature Drink",
          "price": "10,00 €",
          "description": "Long drink rinfrescante a base di liquore all'anice selvatico della Sila (ananzù), ideale come digestivo aromatico (quantità limitata)",
          "tags": [
            "Signature Bullburger",
            "Raro Silano"
          ],
          "image": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Aperol Spritz",
          "price": "5,00 €",
          "description": "Aperol, Prosecco DOC, spruzzo di soda, fetta d'arancia e oliva",
          "tags": [
            "Aperitivo"
          ],
          "image": "https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Gin Tonic Premium (Elephant Gin)",
          "price": "7,00 € – 8,00 €",
          "description": "Distillato premium con botaniche selezionate e acqua tonica artigianale",
          "tags": [
            "Cocktail"
          ],
          "image": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Negroni Classico",
          "price": "8,00 €",
          "description": "Campari, vermouth rosso di Torino, London dry gin, scorza d'arancia",
          "tags": [
            "Cocktail Classico"
          ],
          "image": "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=400&q=80"
        },
        {
          "name": "Americano / Campari & Soda",
          "price": "5,00 €",
          "description": "Bitter Campari, vermouth rosso, soda e fetta d'arancia fresca",
          "tags": [
            "Aperitivo"
          ],
          "image": "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=400&q=80"
        }
      ]
    }
  ]
}
};
