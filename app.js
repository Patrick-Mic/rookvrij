// ==== TIJD & VERSIE====

const MS_PER_MINUUT = 1000 * 60;
const MS_PER_UUR = MS_PER_MINUUT * 60;
const MS_PER_DAG = MS_PER_UUR * 24;

const VERSIE = "v0.8";

const STANDAARD_TAAL = navigator.language.startsWith("nl") ? "nl" : "en";


// ==== DATA OPHALEN ====

// Motivatie
let motivatie = JSON.parse(localStorage.getItem("motivatie")) || {
    motiverendeTekst: "",
    motiverendeRedenen: []
};

// Instellingen
let instellingen = JSON.parse(localStorage.getItem("instellingen")) || {
    sigarettenPerDag: 10,
    prijsPerPakje: 13,
    sigarettenPerPakje: 20,
    taal: STANDAARD_TAAL
};

// deelnemerscode ophalen
if (!instellingen.deelnemersCode) {
    instellingen.deelnemersCode = crypto.randomUUID().slice(0, 6).toUpperCase();
    localStorage.setItem("instellingen", JSON.stringify(instellingen));
}

if (!instellingen.taal) {
    instellingen.taal = STANDAARD_TAAL;
    localStorage.setItem("instellingen", JSON.stringify(instellingen));
}

// trekmomenten ophalen uit de opslag, of een lege lijst
let trekMomenten = JSON.parse(localStorage.getItem("trekMomenten")) || [];

// Stopdatum ophalen uit opslag, of huidige datum
let stopMoment = localStorage.getItem("stopDatum") || new Date().toISOString();

if (!stopMoment.includes("T")) {
    stopMoment = new Date(stopMoment + "T00:00").toISOString();
}

// Is het een nieuwe gebruiker
const isNieuweGebruiker = localStorage.getItem("stopDatum") === null;

// ==== ELEMENTEN OPZOEKEN ====

const dagenGetal = document.getElementById("dagenGetal");
const dagenTekst = document.getElementById("dagenTekst");
const bespaardGetal = document.getElementById("bespaardGetal");
const bespaardTekst = document.getElementById("bespaardTekst");
const peukenGetal = document.getElementById("peukenGetal");
const peukenTekst = document.getElementById("peukenTekst");
const datumInvoer = document.getElementById("datumInvoer");
const opslaanKnop = document.getElementById("opslaanKnop");
const triggerKeuze = document.getElementById("triggerKeuze");
const intensiteit = document.getElementById("intensiteit");
const intensiteitWaarde = document.getElementById("intensiteitWaarde");
const trekKnop = document.getElementById("trekKnop");
const trekVandaag = document.getElementById("trekVandaag");
const trekTotaal = document.getElementById("trekTotaal");
const gerooktKnop = document.getElementById("gerooktKnop");
const exportKnop = document.getElementById("exportKnop");
const importInvoer = document.getElementById("importInvoer");
const instellingenOpslaan = document.getElementById("instellingenOpslaan");
const perDagInvoer = document.getElementById("perDagInvoer");
const prijsInvoer = document.getElementById("prijsInvoer");
const perPakjeInvoer = document.getElementById("perPakjeInvoer");
const instellingenKnop = document.getElementById("instellingenKnop");
const instellingenPaneel = document.getElementById("instellingenPaneel");
const motivatieInvoer = document.getElementById("motivatieInvoer");
const motivatieTekst = document.getElementById("motivatieTekst");
const redenenInvoer = document.getElementById("redenenInvoer");
const redenenLijst = document.getElementById("redenenLijst");
const redenenEnMotivatieOpslaanKnop = document.getElementById("redenenEnMotivatieOpslaanKnop");
const motivatieTekstLimiet = document.getElementById("motivatieTekstLimiet");
const meldingLegeRookLog = document.getElementById("meldingLegeRookLog");
const rookLog = document.getElementById("rookLog");   
const codeTekst = document.getElementById("codeTekst");
const versieTekst = document.getElementById("versieTekst");
const welkomStartDatum = document.getElementById("welkomStartDatum");
const welkomPerDagInvoer = document.getElementById("welkomPerDagInvoer");
const welkomPrijsInvoer = document.getElementById("welkomPrijsInvoer");
const welkomPerPakjeInvoer = document.getElementById("welkomPerPakjeInvoer");
const welkomMotivatieInvoer = document.getElementById("welkomMotivatieInvoer");
const welkomMotivatieTekstLimiet = document.getElementById("welkomMotivatieTekstLimiet");
const welkomRedenenInvoer = document.getElementById("welkomRedenenInvoer");
const welkomOpslaan = document.getElementById("welkomOpslaan");
const welkomScherm = document.getElementById("welkomScherm");
const exportTimer = document.getElementById("exportTimer");
const taalKeuze = document.getElementById("taalKeuze");
const welkomTaalKeuze = document.getElementById("welkomTaalKeuze");
const boomAfbeelding = document.getElementById("boomAfbeelding");
const boomHint = document.getElementById("boomHint");


// ==== FUNCTIES ====

// Een bedrag als geld in de taal van de gebruiker, bijv. "€ 13,00" of "€13.00"
function alsGeld(bedrag) {
    return bedrag.toLocaleString(t("locale"), { style: "currency", currency: "EUR" });
}

function berekenAlles() {
    const stopDatum = new Date(stopMoment);
    const vandaag = new Date();
    const MSVerschil = Math.abs(vandaag - stopDatum);
    const minuten = Math.floor(MSVerschil/MS_PER_MINUUT % 60);
    const uren = Math.floor(MSVerschil/MS_PER_UUR % 24);
    const dagen = Math.floor(MSVerschil/MS_PER_DAG);

    const prijsPerSigaret = instellingen.prijsPerPakje / instellingen.sigarettenPerPakje;
    const prijsPerDag = instellingen.sigarettenPerDag * prijsPerSigaret;

    // De afkortingen verschillen per taal: in het Engels is een uur "h" in plaats van "u"
    const tijdTekst = `${dagen}${t("afkortingDag")} ${uren}${t("afkortingUur")} ${minuten}${t("afkortingMinuut")}`;

    if (vandaag >= stopDatum) { 
        const geldBespaard = MSVerschil/MS_PER_DAG * prijsPerDag;
        const ongerookteSigaretten = Math.floor(MSVerschil/MS_PER_DAG * instellingen.sigarettenPerDag);

        dagenGetal.textContent = tijdTekst;
        dagenTekst.textContent = t("rookvrij");
        bespaardGetal.textContent = alsGeld(geldBespaard);
        bespaardTekst.textContent = t("bespaard");
        peukenGetal.textContent = ongerookteSigaretten;
        peukenTekst.textContent = t("ongerookt");
    } else {
        dagenGetal.textContent = tijdTekst;
        dagenTekst.textContent = t("totRookvrij");
        bespaardGetal.textContent = alsGeld(0);
        bespaardTekst.textContent = t("geenBespaard");
        peukenGetal.textContent = "0";
        peukenTekst.textContent = t("nogGeenSigaretten");
    }

    if (vandaag < stopDatum) {
        boomAfbeelding.src = "boom-1.png";
    } else {
        boomAfbeelding.src = kiesBoom(dagen);
    }

    toonBoomHint();
}

function slaMomentOp(gerookt){
    const moment = {
        tijd: new Date().toISOString(),
        trigger: triggerKeuze.value,
        intensiteit: Number(intensiteit.value),
        gerookt: gerookt
    };
    trekMomenten.push(moment);
    localStorage.setItem("trekMomenten", JSON.stringify(trekMomenten));
    toonTrek();
}

function downloadBestand(inhoud, bestandnaam) {
    const blob = new Blob([inhoud], { type: "text/csv"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = bestandnaam;
    link.click();
    URL.revokeObjectURL(url);
}

function toonTrek() {
    const vandaagTekst = new Date().toDateString();
    const aantalVandaag = trekMomenten.filter(
        (moment) => new Date(moment.tijd).toDateString() === vandaagTekst
    ).length;
    const aantalTotaal = trekMomenten.length;
    trekVandaag.textContent = t("trekVandaag", aantalVandaag);
    trekTotaal.textContent = t("trekTotaal", aantalTotaal);
}

function toonMotivatie() {
    if (motivatie.motiverendeTekst !== "") {
        motivatieTekst.textContent = motivatie.motiverendeTekst;
    } else {
        motivatieTekst.textContent = t("geenMotivatie");
    }   
    redenenLijst.textContent = "";
    motivatie.motiverendeRedenen.forEach((reden) => {
        const redenPlek = document.createElement("li");
        redenPlek.textContent = reden;
        redenenLijst.appendChild(redenPlek);
    });
}

// Zoekt bij een opgeslagen trigger (bijv. "Koffie") de getoonde, vertaalde tekst op (bijv. "Coffee").
// De <select> weet al welke tekst bij welke waarde hoort, dus die gebruiken we als woordenboek.
function triggerTekst(waarde) {
    const optie = [...triggerKeuze.options].find((optie) => optie.value === waarde);
    return optie ? optie.textContent : waarde;
}

function toonRookLog() {
    rookLog.textContent = "";
    const rookMomenten = trekMomenten.filter(
        (moment) => moment.gerookt === true
    ).reverse();

    rookMomenten.forEach((rookMoment) => {
        const rookMomentPlek = document.createElement("li");
        const datum = new Date(rookMoment.tijd).toLocaleString(t("locale"), {
            weekday: "short",
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit"
        });
        rookMomentPlek.textContent = `${datum} · ${triggerTekst(rookMoment.trigger)} · ${t("trekLabel")}: ${rookMoment.intensiteit}/10  `;
        
        const verwijderKnop = document.createElement("button");
        verwijderKnop.textContent = "✕";
        verwijderKnop.className = "verwijderKnop";
        rookMomentPlek.appendChild(verwijderKnop);

        rookLog.appendChild(rookMomentPlek);

        verwijderKnop.addEventListener("click", () => {
            if (!confirm(t("bevestigVerwijderen"))) {
                return;
            }   

            trekMomenten = trekMomenten.filter(
                (moment) => moment.tijd !== rookMoment.tijd
            );
            localStorage.setItem("trekMomenten", JSON.stringify(trekMomenten));

            toonRookLog();
            toonTrek();
        });
    });

    meldingLegeRookLog.hidden = rookMomenten.length > 0;
}

function momentNaarVeld(moment) {
    return new Date(moment)
        .toLocaleString("sv-SE")
        .replace(" ", "T")
        .slice(0, 16);
}

function vulInvoervelden() {
    // Stopdatum ophalen
    datumInvoer.value = momentNaarVeld(stopMoment);

    // taal
    taalKeuze.value = instellingen.taal;

    // Motivatie ophalen
    motivatieTekstLimiet.textContent = motivatie.motiverendeTekst.length;
    motivatieInvoer.value = motivatie.motiverendeTekst;
    redenenInvoer.value = motivatie.motiverendeRedenen.join("\n");

    // Instellingen ophalen
    perDagInvoer.value = instellingen.sigarettenPerDag;
    prijsInvoer.value = instellingen.prijsPerPakje;
    perPakjeInvoer.value = instellingen.sigarettenPerPakje;

    // Persoonlijke code ophalen
    codeTekst.textContent = instellingen.deelnemersCode;

    // versie ophalen
    versieTekst.textContent = VERSIE;
}

function verwerkRedenen(tekst) {
    const redenen = tekst
        .split("\n")
        .map((reden) => reden.trim().slice(0, 60))
        .filter((reden) => reden !== "");

    if (redenen.length > 5) {
        alert(t("teVeelRedenen"));
    }

    return redenen.slice(0, 5);
}

function toonExportHerinnering() {
    const exportDatum = localStorage.getItem("laatsteExport");

    if (!exportDatum) {
        exportTimer.textContent = t("nooitGeexporteerd");
        return;
    }
    
    const dagenSindsExport = Math.floor((new Date() - new Date(exportDatum))/MS_PER_DAG);
    if (dagenSindsExport === 0) {
        exportTimer.textContent = t("exportVandaag");
    } else if (dagenSindsExport === 1) {
        exportTimer.textContent = t("exportGisteren");
    } else {
        exportTimer.textContent = t("exportDagen", dagenSindsExport);
    }

    exportTimer.classList.toggle("waarschuwingTekst", dagenSindsExport > 7);
}

function t(sleutel, aantal) {
    const tekst = TEKSTEN[instellingen.taal][sleutel] ?? sleutel;
    return tekst.replace("{aantal}", aantal);
}

function vertaalPagina() {
    document.querySelectorAll("[data-tekst]").forEach((element) => {
        element.textContent = t(element.dataset.tekst);
    });

    document.querySelectorAll("[data-placeholder]").forEach((element) => {
        element.placeholder = t(element.dataset.placeholder);
    });

    document.documentElement.lang = instellingen.taal;
}

function vernieuwScherm() {
    vertaalPagina();
    berekenAlles();
    toonTrek();
    toonMotivatie();
    toonRookLog();
    toonExportHerinnering();
}

function wisselTaal(nieuweTaal) {
    instellingen.taal = nieuweTaal;
    localStorage.setItem("instellingen", JSON.stringify(instellingen));
    taalKeuze.value = nieuweTaal;
    welkomTaalKeuze.value = nieuweTaal;
    vernieuwScherm();
}

function kiesBoom(dagen) {
    if (dagen >= 30) return "boom-5.png";
    if (dagen >= 17) return "boom-4.png";
    if (dagen >= 10) return "boom-3.png";
    if (dagen >= 3) return "boom-2.png";
    return "boom-1.png";
}

function toonBoomHint() {
    const vandaag = momentNaarVeld(new Date()).slice(0,10);
    const laatsteTik = localStorage.getItem("laatsteTik");

    if (vandaag === laatsteTik) {
        boomHint.textContent = t("totMorgen");
    } else {
        boomHint.textContent = t("tikHint");
    }
}



// ==== EVENTS ====

// Stopmoment opslaan
opslaanKnop.addEventListener("click", () => {
    if (!datumInvoer.value) {
        return;
    }
    stopMoment = new Date(datumInvoer.value).toISOString();
    localStorage.setItem("stopDatum", stopMoment);
    berekenAlles();
});

// Getal naast de schuifbalk bijwerken tijdens het schuiven
intensiteit.addEventListener("input", () => {
    intensiteitWaarde.textContent = intensiteit.value;
});

// motivatie tekenteller
motivatieInvoer.addEventListener("input", () => {
    motivatieTekstLimiet.textContent = motivatieInvoer.value.length;
});

welkomMotivatieInvoer.addEventListener("input", () => {
    welkomMotivatieTekstLimiet.textContent = welkomMotivatieInvoer.value.length;
});

trekKnop.addEventListener("click", () => {
    slaMomentOp(false);
});

gerooktKnop.addEventListener("click", () => {
    if (!confirm(t("bevestigGerookt"))) {
        return;
    }
    slaMomentOp(true);
    
    stopMoment = new Date().toISOString();
    localStorage.setItem("stopDatum", stopMoment);
    datumInvoer.value = momentNaarVeld(stopMoment);
    berekenAlles();

    toonRookLog();
});

exportKnop.addEventListener("click", () => {
    const kopregel = "tijd,trigger,intensiteit,gerookt,deelnemer";
    const rijen = trekMomenten.map((moment) => `${moment.tijd},${moment.trigger},${moment.intensiteit},${moment.gerookt},${instellingen.deelnemersCode}`);
    const tabel = rijen.join("\n");
    const exportData = kopregel + "\n" + tabel;
    const vandaagDatum = new Date().toLocaleDateString("sv-SE");

    localStorage.setItem("laatsteExport", new Date().toISOString());

    downloadBestand(exportData, `${instellingen.deelnemersCode}-${vandaagDatum}.csv`);

    toonExportHerinnering();
});

importInvoer.addEventListener("change", async () => {
    const bestand = importInvoer.files[0];
    if (!bestand) {
        return;
    }
    const tekst = await bestand.text();
    const regels = tekst.split("\n").slice(1).filter(
        (regel) => regel !== ""
    );

    const momenten = regels.map((regel) => {
        const [tijd, trigger, intensiteit, gerookt] = regel.split(",");
        return {
            tijd: tijd,
            trigger: trigger,
            intensiteit: Number(intensiteit),
            gerookt: gerookt === "true"
        };
    });

    if (!confirm(t("bevestigImport"))) {
        return;
    }

    trekMomenten = momenten;
    localStorage.setItem("trekMomenten", JSON.stringify(trekMomenten));

    toonTrek();
    toonRookLog();
});

instellingenOpslaan.addEventListener("click", () => {
    if (Number(prijsInvoer.value) <= 0) {
        alert(t("foutPrijs"));
        return;
    }
    if (Number(perPakjeInvoer.value) <= 0) {
        alert(t("foutPerPakje"));
        return;
    }

    instellingen.sigarettenPerDag = Number(perDagInvoer.value);
    instellingen.prijsPerPakje = Number(prijsInvoer.value);
    instellingen.sigarettenPerPakje = Number(perPakjeInvoer.value);

    localStorage.setItem("instellingen", JSON.stringify(instellingen));

    berekenAlles();
});

instellingenKnop.addEventListener("click", () => {
    instellingenPaneel.hidden = !instellingenPaneel.hidden;
});

redenenEnMotivatieOpslaanKnop.addEventListener("click", () => {
    motivatie.motiverendeTekst = motivatieInvoer.value;
    motivatie.motiverendeRedenen = verwerkRedenen(redenenInvoer.value);
    redenenInvoer.value = motivatie.motiverendeRedenen.join("\n");

    localStorage.setItem("motivatie", JSON.stringify(motivatie));

    toonMotivatie();
});

welkomOpslaan.addEventListener("click", () => {
    if (!welkomStartDatum.value) {
        alert(t("foutDatum"));
        return;
    }
    if (Number(welkomPerDagInvoer.value) <= 0) {
        alert(t("foutPerDag"));
        return;
    }
    if (Number(welkomPrijsInvoer.value) <= 0) {
        alert(t("foutPrijs"));
        return;
    }
    if (Number(welkomPerPakjeInvoer.value) <= 0) {
        alert(t("foutPerPakje"));
        return;
    }

    instellingen.sigarettenPerDag = Number(welkomPerDagInvoer.value);
    instellingen.prijsPerPakje = Number(welkomPrijsInvoer.value);
    instellingen.sigarettenPerPakje = Number(welkomPerPakjeInvoer.value);

    stopMoment = new Date(welkomStartDatum.value).toISOString();

    motivatie.motiverendeTekst = welkomMotivatieInvoer.value;
    motivatie.motiverendeRedenen = verwerkRedenen(welkomRedenenInvoer.value);

    localStorage.setItem("instellingen", JSON.stringify(instellingen));
    localStorage.setItem("motivatie", JSON.stringify(motivatie));
    localStorage.setItem("stopDatum", stopMoment);

    welkomScherm.hidden = true;

    berekenAlles();
    toonMotivatie();
    vulInvoervelden();
});

taalKeuze.addEventListener("change", () => {
    wisselTaal(taalKeuze.value);
});

welkomTaalKeuze.addEventListener("change", () => {
    wisselTaal(welkomTaalKeuze.value);
});

boomAfbeelding.addEventListener("click", () => {
    const vandaag = momentNaarVeld(new Date()).slice(0, 10);
    const laatsteTik = localStorage.getItem("laatsteTik");

    if (vandaag === laatsteTik) return;

    boomAfbeelding.classList.add("getikt");

    localStorage.setItem("laatsteTik", vandaag);

    toonBoomHint();

});

boomAfbeelding.addEventListener("animationend", () => {
    boomAfbeelding.classList.remove("getikt");
});



// ==== START ====

vernieuwScherm();

if (isNieuweGebruiker) {
    welkomTaalKeuze.value = instellingen.taal;
    welkomScherm.hidden = false;
    welkomStartDatum.value = momentNaarVeld(new Date());
}

setInterval(berekenAlles, 1000);

vulInvoervelden();
