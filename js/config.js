/**
 * CONFIGURAZIONE DEL SITO RISTORANTE - OL3 Ristorante Pizzeria
 */
const SITE_CONFIG = {
  // Dati Generali del Ristorante
  brand: {
    name: "OL3 Ristorante Pizzeria",
    tagline: "Ristorante Pizzeria",
    logoHero: "foto/logo.png",
    logoNav: "foto/logo-2.png",
    description: "Ristorante Pizzeria con impasti d'eccellenza, ingredienti selezionati e atmosfera accogliente a Villapiana Lido."
  },

  // Contatti e Recapiti
  contact: {
    phone: "3520389996",
    phoneDisplay: "352 038 9996",
    email: "info@ol3ristorante.it",
    address: "Piazza Enrico Berlinguer",
    cap: "87076",
    city: "Villapiana Lido",
    province: "CS",
    country: "Italia",
    hours: "Tutti i giorni: 19:00 - 23:30",
    mapsEmbedUrl: "https://maps.google.com/maps?q=Piazza+Enrico+Berlinguer+87076+Villapiana+Lido+CS&t=&z=15&ie=UTF8&iwloc=&output=embed"
  },

  // Social Media
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com"
  },

  // Sezione "Il Ristorante" (I 3 Punti di Forza)
  highlights: [
    {
      number: "01",
      title: "RISTORANTE TRADIZIONALE, TOCCO MODERNO",
      text: "Un ristorante pizzeria dove la tradizione incontra l'innovazione, con ricette autentiche rivisitate in chiave moderna, ingredienti selezionati con cura e un'atmosfera che unisce calore e design contemporaneo. Qui il passato e il presente si fondono per offrire un'esperienza culinaria unica, dove ogni dettaglio racconta passione e qualità."
    },
    {
      number: "02",
      title: "SERVIAMO PIETANZE PREGIATE",
      text: "Serviamo pietanze pregiate perché crediamo che ogni piatto debba essere un'esperienza unica, frutto di ingredienti eccellenti, lavorazioni attente e presentazioni curate. Selezioniamo materie prime di alta qualità, dalle farine pregiate per le nostre pizze agli ingredienti freschi e genuini che compongono i nostri piatti, garantendo sapori autentici ed equilibrati."
    },
    {
      number: "03",
      title: "TI SERVIREMO COME MERITI",
      text: "Ti serviremo come meriti perché crediamo che ogni ospite debba sentirsi accolto con calore, attenzione e professionalità. Dal momento in cui varchi la nostra porta, ci prendiamo cura di te con un servizio attento e discreto, pronto a soddisfare ogni tua esigenza."
    }
  ],

  // Sezione Storia
  story: {
    title: "LA NOSTRA STORIA",
    paragraphs: [
      "La storia del nostro ristorante pizzeria è un racconto di passione, tradizione e dedizione, nato dal sogno di una famiglia che ha sempre creduto che il buon cibo fosse molto più di un semplice pasto: un'esperienza capace di unire le persone e creare ricordi indimenticabili. Le nostre radici affondano nella cucina di casa, nei profumi dell'infanzia, nei gesti tramandati di generazione in generazione, affinati nel tempo con un solo obiettivo: regalare agli ospiti il piacere autentico della tavola.",
      "Ogni ricetta porta con sé un pezzo della nostra storia, un equilibrio perfetto tra il rispetto della tradizione e la continua ricerca dell'eccellenza. Abbiamo selezionato con cura le migliori farine, i pomodori più dolci, i formaggi più pregiati, perché crediamo che la qualità sia il primo segreto per esaltare il gusto. Ogni impasto è lavorato con pazienza, ogni piatto è pensato per soddisfare e sorprendere, perché nulla è lasciato al caso: ogni cliente che varca la nostra porta deve sentirsi accolto come in famiglia, coccolato dall'atmosfera, dai sapori e dall'attenzione ai dettagli.",
      "Col tempo, il nostro locale è diventato un punto di riferimento per chi cerca un'esperienza gastronomica sincera, fatta di ospitalità e amore per la cucina. Ogni sorriso che vediamo, ogni complimento ricevuto è la conferma che la nostra missione continua: offrire momenti di pura soddisfazione, dove il cibo non è solo nutrimento, ma un viaggio nei sapori e nelle emozioni. Perché per noi, la vera felicità sta nel vedere i nostri ospiti lasciare il locale con il cuore pieno e la voglia di tornare."
    ]
  },

  // Sezione Filosofia / Lievitazione
  philosophy: {
    title: "LA PERFEZIONE RICHIEDE TEMPO",
    text: "La perfezione richiede tempo perché ogni dettaglio, dalla selezione degli ingredienti alla preparazione dei piatti, è frutto di cura, passione e dedizione. In un ristorante pizzeria, questo principio si traduce nella scelta delle migliori farine per l'impasto, nella lunga e paziente lievitazione che dona leggerezza e fragranza, nella preparazione attenta delle salse e nella ricerca dei prodotti più freschi e genuini. Non si tratta solo di cucinare, ma di rispettare i tempi naturali delle cose, di lasciare che i sapori si sviluppino armoniosamente, che ogni ingrediente trovi il suo equilibrio, che ogni pizza esca dal forno al momento giusto, con il cornicione perfettamente dorato e la mozzarella fusa alla perfezione. La velocità può riempire un piatto, ma solo il tempo può esaltarne l'anima. È nella pazienza del pizzaiolo che lavora l'impasto, nella cura dello chef che rifinisce ogni portata, nell'attenzione con cui il personale accoglie e serve ogni ospite, che si riconosce la vera qualità. Ogni esperienza culinaria che lascia un ricordo indelebile è il risultato di un percorso in cui nulla è lasciato al caso, perché la fretta può sfamare, ma solo la dedizione sa emozionare."
  },

  // Galleria Immagini
  gallery: [
    {
      url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
      caption: "Pizza Margherita Artigianale"
    },
    {
      url: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
      caption: "La Nostra Pizza Gourmet Speciale"
    },
    {
      url: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80",
      caption: "Pizza Rustica con Pomodorini e Burrata"
    },
    {
      url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
      caption: "Atmosfera e Dettagli del Nostro Locale"
    }
  ],

  // MENU CENA
  menu: {
    categories: [
      {
        id: "antipasti",
        name: "ANTIPASTI",
        subtitle: "I piatti proposti sono perfetti per essere condivisi",
        items: [
          {
            name: "Pane e salsine",
            price: "4,50 €",
            description: "Pane a lievitazione naturale accompagnato da hummus, barbabietola e feta montata",
            tags: ["Vegetariano"],
            image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&w=300&q=80"
          },
          {
            name: "Insalata verde",
            price: "Piccola 3,50 € / Media 5,50 €",
            description: "Insalata fresca appena raccolta con verdure di stagione e mandorle tostate",
            tags: ["Senza latticini", "Non piccante"],
            image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80"
          },
          {
            name: "Sashimi di tonno",
            price: "4,50 €",
            description: "Tonno fresco scottato, erbe fresche e un tocco di peperoncino",
            tags: ["Pesce"],
            image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=300&q=80"
          }
        ]
      },
      {
        id: "portate-principali",
        name: "PORTATE PRINCIPALI",
        subtitle: "Una scelta diversificata di piatti saporiti, tutti di provenienza locale e freschi di giornata",
        items: [
          {
            name: "Ravioli fatti a mano",
            price: "6,50 €",
            description: "Ravioli artigianali fatti a mano, ripieni di un mix di formaggi, in una salsa a pesto di basilico",
            tags: ["Fatto in casa"],
            image: "https://images.unsplash.com/photo-1587740908075-9e245070dfaa?auto=format&fit=crop&w=300&q=80"
          },
          {
            name: "Bistecca in crosta di arachidi",
            price: "8,00 €",
            description: "Bistecca succosa e tenera cucinata in base ai tuoi gusti, servita con verdure al vapore",
            tags: ["Arachidi"],
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80"
          },
          {
            name: "Pescato del giorno",
            price: "8,00 €",
            description: "Pescato fresco del giorno abbinato ad asparagi e crema di patate dolci",
            tags: ["Pesce", "Molluschi"],
            image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=300&q=80"
          },
          {
            name: "Spiedini di tofu",
            price: "7,50 €",
            description: "Spiedini di tofu alla griglia, marinati in un mix di soia e sesamo con verdure di stagione arrostite",
            tags: ["Vegano"],
            image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=300&q=80"
          },
          {
            name: "Hamburger classico",
            price: "Funghi 7,00 € | Pollo 7,50 € | Manzo 9,00 €",
            description: "Il nostro classico hamburger con lattuga, sottaceti e pomodori costoluti, servito con patatine fritte",
            tags: ["Carne"],
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80"
          },
          {
            name: "Cotoletta dorata",
            price: "4,00 €",
            description: "Croccante e dorata all'esterno, in una crosta di erbe e parmigiano",
            tags: ["Tradizione"],
            image: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=300&q=80"
          }
        ]
      },
      {
        id: "dolci",
        name: "DOLCI E DESSERT",
        subtitle: "Delizie artigianali preparate quotidianamente dal nostro pasticciere",
        items: [
          {
            name: "Cheesecake classica",
            price: "6,50 €",
            description: "Ricoperta con uno strato di marmellata di lamponi e fragole fresche affettate",
            tags: ["Dolci"],
            image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=300&q=80"
          },
          {
            name: "Torta meringata al limone",
            price: "6,50 €",
            description: "Meringa al limone, crumble al pistacchio, servita con crema chantilly",
            tags: ["Frutta a guscio"],
            image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=300&q=80"
          },
          {
            name: "Mousse al cioccolato",
            price: "Singola 4,00 € | Doppia 7,00 €",
            description: "Mousse al cioccolato fondente belga, vellutata e delicata",
            tags: ["Cioccolato"],
            image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=300&q=80"
          },
          {
            name: "Torta di carote speziata",
            price: "5,00 €",
            description: "Torta di carote leggermente aromatizzata alla cannella con glassa di cremoso formaggio",
            tags: ["Dolci"],
            image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=300&q=80"
          },
          {
            name: "Brownie artigianale",
            price: "5,00 €",
            description: "Brownie appena sfornato, ripieno di gocce di cioccolato fondente e noci croccanti",
            tags: ["Senza latticini"],
            image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=300&q=80"
          }
        ]
      },
      {
        id: "bevande",
        name: "BEVANDE",
        subtitle: "Vini selezionati, bevande rinfrescanti e spremute naturali",
        items: [
          {
            name: "Frullati salutari",
            price: "3,00 €",
            description: "Rinfrescati con la nostra selezione di frutta fresca di stagione",
            tags: ["Freschezza"],
            image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=300&q=80"
          },
          {
            name: "Spremute naturali",
            price: "Piccola 2,00 € | Media 3,00 € | Grande 4,50 €",
            description: "Una miscela rinfrescante di arancia, anguria, carota e zenzero appena spremuti",
            tags: ["100% Naturale"],
            image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=300&q=80"
          },
          {
            name: "Vino della casa",
            price: "2,00 € al calice",
            description: "A scelta tra rosso corposo, bianco fresco o rosato vivace delle nostre colline",
            tags: ["Vino"],
            image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=300&q=80"
          },
          {
            name: "Bibite & Soft Drink",
            price: "1,50 €",
            description: "Bibite classiche in vetro, chinotto, acqua minerale naturale e frizzante",
            tags: ["Bevande"],
            image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=300&q=80"
          }
        ]
      }
    ]
  }
};
