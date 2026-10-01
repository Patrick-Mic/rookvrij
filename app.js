
// Motivatie
let motivatie = JSON.parse(localStorage.getItem("motivatie")) || {
    motiverendeTekst: "",
    motiverendeRedenen: []
};

// Instellingen
let instellingen = JSON.parse(localStorage.getItem("instellingen")) || {
    sigarettenPerDag: 10,
    prijsPerPakje: 13,
    sigarettenPerPakje: 20
};

// Elementen opzoeken
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
//const ... = document.getElementById("...");


// Stopdatum ophalen uit opslag, of standaard 1 oktober
let stopDatumTekst = localStorage.getItem("stopDatum") || "2026-10-01";
datumInvoer.value = stopDatumTekst;

// Motivatie ophalen
motivatieTekstLimiet.textContent = motivatie.motiverendeTekst.length;
motivatieInvoer.value = motivatie.motiverendeTekst;
redenenInvoer.value = motivatie.motiverendeRedenen.join("\n");

// Instellingen ophalen
perDagInvoer.value = instellingen.sigarettenPerDag;
prijsInvoer.value = instellingen.prijsPerPakje;
perPakjeInvoer.value = instellingen.sigarettenPerPakje;

function berekenAlles() {
    const stopDatum = new Date(stopDatumTekst + "T00:00");
    const vandaag = new Date();
    const dagen = Math.floor((vandaag - stopDatum) / (1000 * 60 * 60 * 24));
    const prijsPerSigaret = instellingen.prijsPerPakje / instellingen.sigarettenPerPakje;
    const prijsPerDag = instellingen.sigarettenPerDag * prijsPerSigaret;

    if (vandaag >= stopDatum) { 
        const geldBespaard = dagen * prijsPerDag;
        const ongerookteSigaretten = dagen * instellingen.sigarettenPerDag;

        dagenGetal.textContent = dagen;
        dagenTekst.textContent = dagen === 1 ? "dag rookvrij" : "dagen rookvrij";
        bespaardGetal.textContent = `${geldBespaard.toLocaleString("nl-NL", {style: "currency", currency: "EUR"})}`;
        bespaardTekst.textContent = `bespaard`;
        peukenGetal.textContent = ongerookteSigaretten;
        peukenTekst.textContent = `ongerookte peukies 🚬`;
    } else {
        dagenGetal.textContent = `${-dagen}`;
        dagenTekst.textContent = dagen === -1 ? "dag tot rookvrij" : "dagen tot rookvrij";
        bespaardGetal.textContent = "€ 0,00";
        bespaardTekst.textContent = `Geen zak bespaard :(`;
        peukenGetal.textContent = "0";
        peukenTekst.textContent = `Nog geen sigaretten bespaard`;
    }
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

// Als je op Opslaan klikt
opslaanKnop.addEventListener("click", () => {
    if (!datumInvoer.value) {
        return;
    }
    stopDatumTekst = datumInvoer.value;
    localStorage.setItem("stopDatum", stopDatumTekst);
    berekenAlles();
});

// een keer uitvoeren bij het laden van de pagina
berekenAlles();

// trekmomenten ophalen uit de opslag, of een lege lijst
let trekMomenten = JSON.parse(localStorage.getItem("trekMomenten")) || [];

// Getal naast de schuifbalk bijwerken tijdens het schuiven
intensiteit.addEventListener("input", () => {
    intensiteitWaarde.textContent = intensiteit.value;
});

// motivatie woordenteller
motivatieInvoer.addEventListener("input", () => {
    motivatieTekstLimiet.textContent = motivatieInvoer.value.length;
});

function toonTrek() {
    const vandaagTekst = new Date().toDateString();
    const aantalVandaag = trekMomenten.filter(
        (moment) => new Date(moment.tijd).toDateString() === vandaagTekst
    ).length;
    const aantalTotaal = trekMomenten.length;
    trekVandaag.textContent = `Vandaag: ${aantalVandaag} keer trek`;
    trekTotaal.textContent = `Totaal aantal trekmomenten: ${aantalTotaal} keer trek`;
}

function toonMotivatie() {
    if (motivatie.motiverendeTekst !== "") {
        motivatieTekst.textContent = motivatie.motiverendeTekst;
    } else {
        motivatieTekst.textContent = "Schrijf je motivatie in de instellingen ⚙︎";
    }   
    redenenLijst.textContent = "";
    motivatie.motiverendeRedenen.forEach((reden) => {
        const redenPlek = document.createElement("li");
        redenPlek.textContent = reden;
        redenenLijst.appendChild(redenPlek);})
}

function toonRookLog() {
    rookLog.textContent = "";
    const rookMomenten = trekMomenten.filter(
        (moment) => moment.gerookt === true
    ).reverse();

    rookMomenten.forEach((rookMoment) => {
        const rookMomentPlek = document.createElement("li");
        const datum = new Date(rookMoment.tijd).toLocaleString("nl-NL", {
            weekday: "short",
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit"
        });
        rookMomentPlek.textContent = `${datum} · ${rookMoment.trigger} · Trek: ${rookMoment.intensiteit}/10  `;
        
        const verwijderKnop = document.createElement("button");
        verwijderKnop.textContent = "x";
        verwijderKnop.className = "verwijderKnop";
        rookMomentPlek.appendChild(verwijderKnop);

        rookLog.appendChild(rookMomentPlek);

        verwijderKnop.addEventListener("click", () => {
            if(!confirm("Wil je dit logmoment verwijderen?")){
                return;
            }   

            trekMomenten = trekMomenten.filter(
                (moment) => moment.tijd !== rookMoment.tijd
            );
            localStorage.setItem("trekMomenten", JSON.stringify(trekMomenten))

            toonRookLog();
            toonTrek();
        });
    });

    meldingLegeRookLog.hidden = rookMomenten.length > 0;

}

trekKnop.addEventListener("click", () => {
    slaMomentOp(false);
});

gerooktKnop.addEventListener("click", () => {
    if (!confirm("Heb je gerookt? Je streak begint opnieuw :(")) {
        return;
    }
    slaMomentOp(true);
    
    const vandaagDatum = new Date().toLocaleDateString("sv-SE");

    stopDatumTekst = vandaagDatum;
    localStorage.setItem("stopDatum", stopDatumTekst);
    datumInvoer.value = stopDatumTekst;

    berekenAlles();

    toonRookLog();
});

exportKnop.addEventListener("click", () => {
    const kopregel = "tijd,trigger,intensiteit,gerookt";
    const rijen = trekMomenten.map((moment) => `${moment.tijd},${moment.trigger},${moment.intensiteit},${moment.gerookt}`);
    const tabel = rijen.join("\n");
    const exportData = kopregel + "\n" + tabel;
    const vandaagDatum = new Date().toLocaleDateString("sv-SE");

    downloadBestand(exportData, `exportData-${vandaagDatum}.csv`);
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
        return{
            tijd: tijd,
            trigger: trigger,
            intensiteit: Number(intensiteit),
            gerookt: gerookt === "true"
        };
    });


    if(!confirm("Wil je deze data importeren? Je huidige data verdwijnt")){
        return;
    }

    trekMomenten = momenten;
    localStorage.setItem("trekMomenten", JSON.stringify(trekMomenten));

    toonTrek();

    toonRookLog();

});

instellingenOpslaan.addEventListener("click", () => {
    if (Number(prijsInvoer.value) <= 0) {
        return alert("Een pakje kan niet 0 euro zijn!");
    }
    if (Number(perPakjeInvoer.value) <= 0) {
        return alert("Een pakje kan niet 0 sigaretten hebben");
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

    const redenen = redenenInvoer.value.split("\n").map((reden => reden.trim().slice(0,60))).filter(
        (reden) => reden !== ""
    );
    if (redenen.length > 5) {
        alert("Teveel redenen alleen de eerste 5 zijn opgeslagen");
        motivatie.motiverendeRedenen = redenen.slice(0,5);
    } else {
        motivatie.motiverendeRedenen = redenen;
    }
    redenenInvoer.value = motivatie.motiverendeRedenen.join("\n");

    localStorage.setItem("motivatie", JSON.stringify(motivatie));

    toonMotivatie();
});

toonMotivatie();

toonTrek();

toonRookLog();
