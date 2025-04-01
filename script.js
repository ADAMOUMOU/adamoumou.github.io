// Const for typewriter
const charDelay = 5;
const breakDelay = 400;
const delayerDelay = 300;

function detectOS() {
    const userAgent = navigator.userAgent.toLowerCase();

    if (userAgent.includes("win")) return "Windows";
    if (userAgent.includes("mac")) return "MacOS";
    if (userAgent.includes("linux") && !userAgent.includes("android")) return "Linux";
    if (userAgent.includes("android")) return "Android";
    if (userAgent.includes("iphone") || userAgent.includes("ipad")) return "iOS";

    return "OS Inconnu";
}

function makeOSMessage() {
    let os = detectOS();

    switch (os) {
        case 'Windows':
            return "[ FAILED ] Windows detected, self destruct initiated...";

        case 'MacOS':
            return "[ FAILED ] MacOS... Really...";

        case 'Linux':
            return "[ OK ] Friendly OS detected !";
    
        default:
            return "[ WARNING ] This OS may be unsupported on your platform";
    }
}

const bootMessages = [
    "[ OK ] Starting...",
    "[ <3 ] Checking system integrity... ` I-I mean, it's not like I care if your OS is broken or anything... B-baka !",
    "$ sudo apt install RAM",
    "[ FAILED ] Installing RAM",
    makeOSMessage(),
    '$ grep "cake" /``',
    "[ FAILED ] Cake is a lie.",
    "[ OK ] Loading interface",
    ""

];

const logo = [
    "               .'.                :0Xx.                                                                                                                ",
    "             .oXNK;              .xMMx.                                                                                                                ",
    "            .dNMMWd.             ,0MNc                                                                                                                 ",
    "           .xWNXWMK,             cNM0'                                                                                                                 ",
    "          .kWNocKMWo     .;okOOxoOWMx.  ,okOOkooxkc. ;xkdodOOkl,:dOOkl.   .;loxO0Oxl'   :xkc.  .okd, .okxookOOd;;okOOx,    'cdkOOkd;.  .okd'   ;xkc.   ",
    "         'OWNd..xMMO'   ;OWWKkxONMMNc 'xNWXkxkXMMWo .kMMXxlkNMWKxlkNMWl .c0WMN0xxKWMXc .kMWd   :XMK, :XMW0odKMMNOooKMMO' 'xXWKkxONMWx. cNMK,  .kMWd.   ",
    "        ,0WWO;..dWMNc  ;KMNo.  .oNMK,'OMWx'   cXMX: ,KMNl  ,KMWo. ,KMWl.lNMKx:.  .kMMO.;KMX:  .dWMk..dWMO' .dWM0,  oWMO''0MNx.   cNMNc.xWMx.  ,KMX:    ",
    "       ;0MMMNXXXNWMMk..xMMk.    NMx. lWMK,    ;XMO. lNM0'  cNMK,  :XMK;'0MWo.    .kWWx.lWMO'  'OMWl .OMWl  .OMWo  .kMWd.oWM0'    :XMX;'0MNl   lWM0'    ",
    "      :KMNklcccclOWMX:.dWMXc..'oXMNl cNMNd...c0WWd..xMMx. .xWMx.  oWMk..OMWOo;..;kNW0,.dWM0;.'dNM0' :XMK;  ;XMX:  ,KMN: lNMNo'.'lKMNo.;KMWd..:0MNl     ",
    "     cXMXl.      ;KMWd.'xNMWXKKNMMK, .oXMWXKKXWMX: ,0MNc  '0MNl  .OMWo  ,ONWMNXXNN0l.  ;0WWXKXWXx'  oWMk.  oWMO.  lNM0' .oKWWNXNWXx;  .dNMWXKNN0c.     ",
    "    .,c:,         ,cc,  .,cll:',:c,    ':llc,':c;. .;c;.  .;c;.  .;c:.   .':clll:'.     .;cllc:.    'c:'   ':c'   ':c,    .;cllc;.      'clllc,.       ",
];

const customLinks = [
    { 
        url: "https://github.com/ADAMOUMOU", 
        type: "dir",
        description: "github_repos",
        size: "22 repos"
    },
    { 
        url: "mailto:adamouch@adamouch.dev", 
        type: "file",
        description: "adamouch@adamouch.dev",
        size: "10 ko"
    }
];

const bootScreen = document.getElementById('boot-screen');
const logoContainer = document.getElementById('logo');

let currentLine = 0;
let blinkInterval;
let i = 0;

function typeWriter() {
    if (currentLine < bootMessages.length) {
        const message = bootMessages[currentLine];
        
        if (message === "") {
            bootScreen.innerHTML += "<br>";
            currentLine++;
            setTimeout(typeWriter, 300);
        } else {
            const typing = setInterval(() => {
                if (i < message.length) {
                    if (currentLine === bootMessages.length - 1 && i === message.length - 1) {
                        // Dernier caractère (curseur clignotant)
                        bootScreen.innerHTML += '_';
                        i++;
                        blinkInterval = setInterval(() => {
                            const content = bootScreen.innerHTML;
                            bootScreen.innerHTML = content.slice(0, -1) + 
                                (content.endsWith('_') ? ' ' : '_');
                        }, 500);
                    } else {
                        if (message[i] == "`") {
                            clearInterval(typing);
                            setTimeout(typeWriter, delayerDelay)
                        } else {
                            bootScreen.innerHTML += message[i];
                        }
                        i++;
                    }
                    
                } else {
                    clearInterval(typing);
                    bootScreen.innerHTML += "<br>";
                    currentLine++;
                    i = 0;
                    setTimeout(typeWriter, breakDelay);
                }
            }, charDelay);
        }
    } else {
        // Après 3 secondes, afficher le logo
        setTimeout(showLogo, 1500);
    }
}

function showLogo() {
    clearInterval(blinkInterval);
    bootScreen.innerHTML = '';
    
    // Créer la structure du logo
    const logoChars = [];
    logo.forEach((line, row) => {
        const div = document.createElement('div');
        line.split('').forEach((char, col) => {
            const span = document.createElement('span');
            span.className = 'hidden';
            span.textContent = char;
            div.appendChild(span);
            logoChars.push({ span, row, col });
        });
        logoContainer.appendChild(div);
    });
    // Trier les caractères par distance depuis le coin supérieur gauche
    logoChars.sort((a, b) => 
        (a.row + a.col) - (b.row + b.col) || a.row - b.row
    );
    // Animer en vague
    logoChars.forEach(({ span, row, col }, index) => {
        setTimeout(() => {
            span.className = '';
            span.style.animation = `glow 0.5s`;
        }, index * 2);
    });
    startInteractiveTerminal()
}

function addGlitchEffect() {
    const logo = document.getElementById('logo');
    let glitchCount = 0;
    
    const glitch = setInterval(() => {
        if (glitchCount++ > 10) {
            clearInterval(glitch);
            return;
        }
        
        logo.style.textShadow = `0 0 10px ${getRandomColor()}`;
        logo.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
        
        setTimeout(() => {
            logo.style.textShadow = '';
            logo.style.transform = '';
        }, 100);
    }, 1000);
    
    function getRandomColor() {
        return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
    }
}

function addScanlines() {
    const scanlines = document.createElement('div');
    scanlines.id = 'scanlines';
    scanlines.innerHTML = Array(20).fill('<div class="scanline"></div>').join('');
    document.body.appendChild(scanlines);
    
    // Ajouter ce CSS :
    const style = document.createElement('style');
    style.textContent = `
        #scanlines {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 999;
        }
        .scanline {
            height: 2px;
            background: rgba(0, 255, 0, 0.1);
            margin-bottom: 2px;
        }
    `;
    document.head.appendChild(style);
}

function startInteractiveTerminal() {
    const terminal = document.createElement('div');
    terminal.id = 'terminal';
    terminal.innerHTML = '<div id="output"></div><div class="input-line">$ <span id="input" contenteditable></span></div>';
    document.body.appendChild(terminal);
    
    const commands = {
        help: "Available commands: help, about, ls, reboot",
        about: "Adamouch OS - v.1337",
        ls: "Files in /",
        reboot: "Rebooting..."
    };
    
    document.getElementById('input').addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const cmd = this.textContent.trim();
            const output = document.getElementById('output');
            
            output.innerHTML += `<div>$ ${cmd}</div>`;
            output.innerHTML += `<div>${commands[cmd] || "Commande inconnue"}</div>`;
            
            if (cmd === 'reboot') {
                setTimeout(() => {
                    document.body.innerHTML = '';
                    window.location.reload();
                }, 1000);
            }

            if (cmd === 'ls') {
                output.innerHTML += customLinks.map(element => `
                    <div style="display: flex; gap: 20px;">
                        <div style="flex: 1;"><a href="${element.url}">${element.description}</a></div>
                        <div style="flex: 1;">${element.type}</div>
                        <div style="flex: 1;">${element.size}</div>
                    </div>
                `).join('');
            }
            
            
            this.textContent = '';
            output.scrollTop = output.scrollHeight;
        }
    });
}

window.onload = function() {
    setTimeout(() => {
        //  addGlitchEffect();
        // addScanlines();
        typeWriter();
        
    }, 1000);
};