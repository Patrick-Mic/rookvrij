// ==== TEKSTEN ====
// Alle teksten van de app, in het Nederlands en het Engels.
// Teksten met {aantal} krijgen later een getal ingevuld.

const TEKSTEN = {
    nl: {
        // Algemeen
        locale: "nl-NL",
        opslaan: "Opslaan",
        taal: "Taal",

        // Welkomstscherm
        welkomTitel: "Welkom bij Rookvrij",
        welkomIntro: "Rookvrij helpt je op weg naar een gezond, gelukkig en rookvrij leven. Vul de volgende gegevens in om te beginnen. Je kunt ze altijd veranderen in de instellingen.",
        installerenKop: "Installeren:",
        installerenTekst: "open de link in Safari, tik op het deel-icoon en kies \"Zet op beginscherm\".",
        welkomStopVraag: "Wanneer ben je gestopt?",
        welkomPerDagVraag: "Hoeveel sigaretten rookte je per dag?",
        welkomPrijsVraag: "Hoeveel kost een pakje?",
        welkomPerPakjeVraag: "Hoeveel sigaretten zitten er in een pakje?",
        welkomMotivatieVraag: "Wat is een zin die je motiveert?",
        welkomRedenenVraag: "Wat zijn je redenen om te stoppen? (max. 5, één per regel)",
        start: "Start",
        motivatiePlaceholder: "Dit is mijn motivatie...",
        redenenPlaceholder: "Beter kunnen sporten\nGeld sparen",

        // Hoofdscherm
        waaromIkStop: "Waarom ik stop",
        trek: "Trek?",
        watSpeeldeEr: "Wat speelde er?",
        hoeSterk: "Hoe sterk?",
        vastleggen: "Vastleggen",
        gerookt: "Gerookt?",

        // Triggers (alleen de getoonde tekst; de opgeslagen waarde blijft Nederlands)
        triggerStress: "Stress",
        triggerKoffie: "Koffie",
        triggerNaEten: "Na het eten",
        triggerAlcohol: "Alcohol",
        triggerVerveling: "Verveling",
        triggerSocialeDruk: "Sociale druk",
        triggerOver: "Had nog sigaretten over",
        triggerAnders: "Anders",

        // Instellingen
        stopdatum: "Stopmoment",
        instellingen: "Instellingen",
        jouwCode: "Jouw code:",
        perDag: "Sigaretten per dag:",
        prijsPerPakje: "Prijs per pakje:",
        perPakje: "Sigaretten per pakje:",
        motivatieKop: "Motivatie",
        motiverendeZin: "Motiverende zin",
        redenen: "Redenen (max. 5, één per regel)",
        data: "Data",
        export: "Exporteren",
        importeren: "Importeren",
        logboek: "Logboek",
        nogNietGerookt: "Nog niet gerookt!",

        // Over deze app
        overDezeApp: "Over deze app",
        privacyKop: "Privacy:",
        privacyTekst: "je data blijft op je eigen telefoon. Niemand kan hem zien, tenzij je hem zelf deelt.",
        letOpKop: "Let op:",
        letOpTekst: "als je de app verwijdert, verdwijnen je gegevens. Maak dus geregeld een export.",
        delenKop: "Delen:",
        delenTekst: "wil je meedoen aan mijn analyse? Deel je data dan wekelijks met mij via de exportknop, zodat ik kan onderzoeken wat tot terugval leidt. Je data is niet gekoppeld aan je naam en delen is vrijwillig. Wil je dat ik je data verwijder? Stuur me je code.",

        // Teksten voor in het JavaScript (stap 3)
        rookvrij: "Rookvrij",
        totRookvrij: "Tot rookvrij",
        bespaard: "Bespaard",
        geenBespaard: "Geen zak bespaard :(",
        ongerookt: "Ongerookte peukies 🚬",
        nogGeenSigaretten: "Nog geen sigaretten bespaard",
        afkortingDag: "d",
        afkortingUur: "u",
        afkortingMinuut: "m",
        trekVandaag: "Vandaag: {aantal} keer trek",
        trekTotaal: "Totaal aantal trekmomenten: {aantal}",
        geenMotivatie: "Schrijf je motivatie in de instellingen ⚙︎",
        trekLabel: "Trek",
        nooitGeexporteerd: "Nog nooit geëxporteerd",
        exportVandaag: "Laatste export: vandaag",
        exportGisteren: "Laatste export: gisteren",
        exportDagen: "Laatste export: {aantal} dagen geleden",
        tikHint: "Tik op je boompje 🌱",
        totMorgen: "Tot morgen!",

        // Meldingen
        bevestigVerwijderen: "Wil je dit logmoment verwijderen?",
        bevestigGerookt: "Heb je gerookt? Je streak begint opnieuw :(",
        bevestigImport: "Wil je deze data importeren? Je huidige data verdwijnt.",
        teVeelRedenen: "Te veel redenen, alleen de eerste 5 zijn opgeslagen.",
        foutDatum: "Vul een geldige datum in.",
        foutPerDag: "Vul in hoeveel sigaretten je per dag rookte.",
        foutPrijs: "Vul een prijs in die hoger is dan 0.",
        foutPerPakje: "Vul een aantal sigaretten per pakje in dat groter is dan 0."
    },

    en: {
        // General
        locale: "en-GB",
        opslaan: "Save",
        taal: "Language",

        // Welcome screen
        welkomTitel: "Welcome to Rookvrij",
        welkomIntro: "Rookvrij helps you on your way to a healthy, happy and smoke-free life. Fill in the details below to get started. You can always change them in the settings.",
        installerenKop: "Install:",
        installerenTekst: "open the link in Safari, tap the share icon and choose \"Add to Home Screen\".",
        welkomStopVraag: "When did you quit?",
        welkomPerDagVraag: "How many cigarettes did you smoke per day?",
        welkomPrijsVraag: "How much does a pack cost?",
        welkomPerPakjeVraag: "How many cigarettes are in a pack?",
        welkomMotivatieVraag: "What sentence motivates you?",
        welkomRedenenVraag: "What are your reasons for quitting? (max. 5, one per line)",
        start: "Start",
        motivatiePlaceholder: "This is my motivation...",
        redenenPlaceholder: "Get fitter\nSave money",

        // Main screen
        waaromIkStop: "Why I'm quitting",
        trek: "Craving?",
        watSpeeldeEr: "What was going on?",
        hoeSterk: "How strong?",
        vastleggen: "Log it",
        gerookt: "Smoked?",

        // Triggers (display text only; the stored value stays Dutch)
        triggerStress: "Stress",
        triggerKoffie: "Coffee",
        triggerNaEten: "After a meal",
        triggerAlcohol: "Alcohol",
        triggerVerveling: "Boredom",
        triggerSocialeDruk: "Social pressure",
        triggerOver: "Still had cigarettes left",
        triggerAnders: "Other",

        // Settings
        stopdatum: "Quit moment",
        instellingen: "Settings",
        jouwCode: "Your code:",
        perDag: "Cigarettes per day:",
        prijsPerPakje: "Price per pack:",
        perPakje: "Cigarettes per pack:",
        motivatieKop: "Motivation",
        motiverendeZin: "Motivating sentence",
        redenen: "Reasons (max. 5, one per line)",
        data: "Data",
        export: "Export",
        importeren: "Import",
        logboek: "Log",
        nogNietGerookt: "No cigarettes smoked yet!",

        // About this app
        overDezeApp: "About this app",
        privacyKop: "Privacy:",
        privacyTekst: "your data stays on your own phone. Nobody can see it unless you share it yourself.",
        letOpKop: "Note:",
        letOpTekst: "if you delete the app, your data is gone. So export it regularly.",
        delenKop: "Sharing:",
        delenTekst: "would you like to take part in my analysis? Then share your data with me weekly using the export button, so I can research what leads to relapse. Your data is not linked to your name and sharing is voluntary. Want me to delete your data? Send me your code.",

        // Texts used in JavaScript (step 3)
        rookvrij: "Smoke-free",
        totRookvrij: "Until smoke-free",
        bespaard: "Saved",
        geenBespaard: "Nothing saved yet :(",
        ongerookt: "Cigarettes not smoked 🚬",
        nogGeenSigaretten: "No cigarettes saved yet",
        afkortingDag: "d",
        afkortingUur: "h",
        afkortingMinuut: "m",
        trekVandaag: "Today: {aantal} cravings",
        trekTotaal: "Total cravings: {aantal}",
        geenMotivatie: "Write your motivation in the settings ⚙︎",
        trekLabel: "Craving",
        nooitGeexporteerd: "Never exported",
        exportVandaag: "Last export: today",
        exportGisteren: "Last export: yesterday",
        exportDagen: "Last export: {aantal} days ago",
        tikHint: "Tap your tree 🌱",
        totMorgen: "See you tomorrow!",

        // Messages
        bevestigVerwijderen: "Do you want to delete this entry?",
        bevestigGerookt: "Did you smoke? Your streak starts over :(",
        bevestigImport: "Do you want to import this data? Your current data will be replaced.",
        teVeelRedenen: "Too many reasons, only the first 5 have been saved.",
        foutDatum: "Please enter a valid date.",
        foutPerDag: "Please enter how many cigarettes you smoked per day.",
        foutPrijs: "Please enter a price higher than 0.",
        foutPerPakje: "Please enter a number of cigarettes per pack higher than 0."
    }
};
