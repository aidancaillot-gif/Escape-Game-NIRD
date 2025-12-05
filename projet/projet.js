
// Écran de démarrage
window.addEventListener("load", () => {
    const startScreen = document.getElementById("startScreen");
    const playButton = document.getElementById("playButton");

    playButton.addEventListener("click", () => {

        // Effet fondu
        startScreen.style.opacity = "0";

        // Retire l'écran après l'animation
        setTimeout(() => {
            startScreen.style.display = "none";
        }, 600);
    });
});



// -------------------------
// Stockage : réponses validées
// -------------------------
const validatedAnswers = {}; 

// -------------------------
// COMBINAISON SECRÈTE (mini-zones)
// -------------------------
let currentCombo = [];
const correctCombo = ["m5", "m9", "m2"]; // 🔥 MODIFIE ICI LA COMBINAISON
const comboReward = "✨ Mot de passe correct ✨"; // 🔥 RÉCOMPENSE DE LA COMBINAISON


// -------------------------
//  HOTSPOTS PAR IMAGE
// -------------------------
const imageHotspots = {
    "scene": [
        { left: '11%', top: '40%', width: '3%', height: '12%', url: 'https://i.imgur.com/MAYL6Mf.jpeg', blue: false },
        { left: '21%', top: '40%', width: '4%', height: '12%', url: 'https://i.imgur.com/QYdSTq1.jpeg', blue: false },
        { left: '52%', top: '40%', width: '3%', height: '12%', url: 'https://i.imgur.com/PBrrF6u.jpeg', blue: false }
    ],

    "https://i.imgur.com/MAYL6Mf.jpeg": [
        { left: '20%', top: '40%', width: '8%', height: '11%', url: 'https://i.imgur.com/S5ltRez.jpeg', blue: true, answer: "l’informatique durable" },
        { left: '57%', top: '47%', width: '8%', height: '12%', url: 'https://i.imgur.com/wPVaWwy.jpeg', blue: true, answer: "l’impact global des opérations informatiques" },
        { left: '76%', top: '47%', width: '8%', height: '12%', url: 'https://i.imgur.com/l4BwHYp.jpeg', blue: true, answer: "obsolescence programmée" },
        { left: '70%', top: '22%', width: '10%', height: '12%', url: 'https://i.imgur.com/cdZBNxU.jpeg', blue: true }
    ],

    "https://i.imgur.com/QYdSTq1.jpeg": [
        { left: '10%', top: '35%', width: '8%', height: '11%', url: 'https://i.imgur.com/K4DtGK7.jpeg', blue: true, answer: "société de l’information inclusive" },
        { left: '32%', top: '42%', width: '8%', height: '12%', url: 'https://i.imgur.com/H8909Nd.jpeg', blue: true, answer: "la fracture numérique" },
        { left: '56%', top: '45%', width: '8%', height: '16%', url: 'https://i.imgur.com/FTLqTni.jpeg', blue: true, answer: "formation et éducation au tic" },
        { left: '8%', top: '10%', width: '10%', height: '12%', url: 'https://i.imgur.com/zzPSrOG.jpeg', blue: true }
    ],

    "https://i.imgur.com/PBrrF6u.jpeg": [
        { left: '10%', top: '43%', width: '8%', height: '11%', url: 'https://i.imgur.com/FWtOC2E.jpeg', blue: true, answer: "la responsabilité informatique" },
        { left: '28%', top: '43%', width: '8%', height: '12%', url: 'https://i.imgur.com/XkkbR0l.jpeg', blue: true, answer: "protéger les données personnelles" },
        { left: '64%', top: '43%', width: '8%', height: '12%', url: 'https://i.imgur.com/s4I7bQN.jpeg', blue: true, answer: "limiter la consommation énergétique" },
        { left: '57%', top: '18%', width: '10%', height: '12%', url: 'https://i.imgur.com/lnc4xnN.jpeg', blue: true }
    ],

    // -------------------------
    // MINI-ZONES (COMBINATION PUZZLE)
    // -------------------------
    "https://i.imgur.com/PiHoQ9P.jpeg": [
        { id: "m1", left: '35%', top: '20%', width: '10%', height: '20%', mini: true },
        { id: "m2", left: '48%', top: '20%', width: '10%', height: '20%', mini: true },
        { id: "m3", left: '61%', top: '20%', width: '10%', height: '20%', mini: true },

        { id: "m4", left: '35%', top: '43%', width: '10%', height: '20%', mini: true },
        { id: "m5", left: '48%', top: '43%', width: '10%', height: '20%', mini: true },
        { id: "m6", left: '61%', top: '43%', width: '10%', height: '20%', mini: true },

        { id: "m7", left: '35%', top: '64%', width: '10%', height: '20%', mini: true },
        { id: "m8", left: '48%', top: '64%', width: '10%', height: '20%', mini: true },
        { id: "m9", left: '61%', top: '64%', width: '10%', height: '20%', mini: true },

        { id: "m10", left: '48%', top: '85%', width: '10%', height: '15%', mini: true }
    ]
};


// -------------------------
//  RÉCOMPENSES PAR IMAGE
// -------------------------
const imageRewards = {
    "https://i.imgur.com/MAYL6Mf.jpeg": " Premier numéro du code : 5 !",
    "https://i.imgur.com/QYdSTq1.jpeg": " Deuxième numéro du code : 9 !",
    "https://i.imgur.com/PBrrF6u.jpeg": " Troisième numéro du code : 2 !"
};


// -------------------------
// FONCTION PRINCIPALE
// -------------------------
function openImage(url, showInput = false, zoneAnswer = "", parentImage = "") {

    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.9)';
    overlay.style.zIndex = '1000';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.overflow = 'hidden';

    const img = document.createElement('img');
    img.src = url;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    overlay.appendChild(img);

    const hotspots = imageHotspots[url] || [];

    hotspots.forEach((h, index) => {
        const zone = document.createElement('div');
        zone.style.position = 'absolute';
        zone.style.left = h.left;
        zone.style.top = h.top;
        zone.style.width = h.width;
        zone.style.height = h.height;
        zone.style.cursor = 'pointer';

        // Couleur spéciale mini-zones
        if (h.mini) {


            // ---------------------
            // COMBINAISON
            // ---------------------
            zone.addEventListener("click", () => {
                currentCombo.push(h.id);

                if (currentCombo.length === 3) {
                    if (JSON.stringify(currentCombo) === JSON.stringify(correctCombo)) {
                        alert(comboReward);
                        openImage("https://i.imgur.com/r4Gb6WN.jpeg");
                    } else {
                        alert("❌ Mauvaise combinaison !");
                    }
                    currentCombo = []; // reset après 3 clics
                }
            });

        } else {
            // Zones bleues
            zone.addEventListener('click', (e) => {
                e.stopPropagation();

                if (h.blue && index !== 3) {
                    openImage(h.url, true, h.answer, url);
                } else {
                    openImage(h.url, false);
                }
            });
        }

        overlay.appendChild(zone);
    });


    // ---------------------
    // BARRE DE RÉPONSE
    // ---------------------
    if (showInput) {

        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Écris ta réponse ici...";
        input.style.position = "absolute";
        input.style.bottom = "20px";
        input.style.left = "50%";
        input.style.transform = "translateX(-50%)";
        input.style.width = "50%";
        input.style.padding = "8px 12px";
        input.style.fontSize = "16px";
        input.style.borderRadius = "5px";
        input.style.border = "2px solid #fff";
        overlay.appendChild(input);
        input.focus();

        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {

                if (input.value.trim().toLowerCase() === zoneAnswer.toLowerCase()) {
                    alert("Bonne réponse !");

                    if (!validatedAnswers[parentImage]) validatedAnswers[parentImage] = {};
                    validatedAnswers[parentImage][zoneAnswer] = true;

                    if (Object.keys(validatedAnswers[parentImage]).length === 3) {
                        alert(imageRewards[parentImage]);
                    }

                } else {
                    alert("Essaie encore !");
                }
            }
        });
    }

    // FERMETURE
    const arrow = document.createElement('div');
    arrow.innerHTML = '&#x2193;';
    arrow.style.position = 'absolute';
    arrow.style.bottom = '70px';
    arrow.style.left = '50%';
    arrow.style.transform = 'translateX(-50%)';
    arrow.style.fontSize = '50px';
    arrow.style.color = '#fff';
    arrow.style.cursor = 'pointer';
    arrow.addEventListener('click', () => overlay.remove());
    overlay.appendChild(arrow);

    document.body.appendChild(overlay);
}
