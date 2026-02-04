// Scene navigation + rose builders

document.addEventListener("DOMContentLoaded", () => {
    const scenes = ["scene1","scene2","scene3","scene4","scene5"];
    let current = 0;

    // build any static .rose in scene3 (replace red circle with petal structure)
    const staticRose = document.querySelector("#scene3 .rose");
    if (staticRose) {
        const built = buildRoseElement({petalCount: 12, size: 96});
        // place built petals inside existing .rose container
        staticRose.replaceWith(built.wrapper);
        // mark as "live" after bloom completes for gentle motion
        setTimeout(()=> built.wrapper.querySelector('.rose').classList.add('live'), 1100);
    }

    document.body.addEventListener("click", () => {
        const curId = scenes[current];
        const currentScene = document.getElementById(curId);
        if (!currentScene) return;

        if (current < scenes.length - 1) {
            currentScene.classList.remove("active");
            current++;
            const nextScene = document.getElementById(scenes[current]);
            if (!nextScene) return;
            nextScene.classList.add("active");

            if (scenes[current] === "scene4") growBush();
            if (scenes[current] === "scene5") growBouquet();
        }
    });

    // create a rose-wrapper + rose with petals and bud
    function buildRoseElement({petalCount = 8, size = 72} = {}) {
        const wrap = document.createElement("div");
        wrap.className = "rose-wrap";

        const rose = document.createElement("div");
        rose.className = "rose";
        rose.style.width = `${size}px`;
        rose.style.height = `${size}px`;

        // two-ring approach: smaller inner petals + larger outer petals
        const outerCount = Math.max(4, Math.round(petalCount * 0.6));
        const innerCount = Math.max(2, petalCount - outerCount);
        const baseOffset = (Math.random() - 0.5) * 10; // -5..5 degrees

        // outer ring
        for (let i = 0; i < outerCount; i++) {
            const p = document.createElement("div");
            p.className = "petal";
            const angle = (i / outerCount) * 360 + baseOffset + (Math.random() - 0.5) * 6;
            p.style.setProperty('--rot', angle + 'deg');

            const d = (Math.random() * 0.5) + (i * 0.03);
            p.style.setProperty('--d', d + 's');

            p.style.width = Math.round(size * 0.56) + 'px';
            p.style.height = Math.round(size * 0.86) + 'px';
            // give outer petals a small forward depth
            p.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(8px) scale(0.20) rotateX(34deg)`;

            rose.appendChild(p);
        }

        // inner ring (smaller, tighter to form the bud/body)
        for (let j = 0; j < innerCount; j++) {
            const p = document.createElement("div");
            p.className = "petal";
            const angle = (j / innerCount) * 360 + baseOffset * 0.5 + (Math.random() - 0.5) * 8;
            p.style.setProperty('--rot', angle + 'deg');

            const d = (Math.random() * 0.4) + (j * 0.02);
            p.style.setProperty('--d', d + 's');

            p.style.width = Math.round(size * 0.42) + 'px';
            p.style.height = Math.round(size * 0.62) + 'px';
            // inner petals sit a bit more forward and upright
            p.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translateY(2px) translateZ(6px) scale(0.22) rotateX(18deg)`;

            rose.appendChild(p);
        }

        const bud = document.createElement("div");
        bud.className = "bud";
        rose.appendChild(bud);

        // small random orientation for variety
        const randAngle = (Math.random() * 24) - 12;
        const tx = (Math.random() * 14) - 7;
        const ty = (Math.random() * 10) - 5;
        const tz = Math.floor(Math.random() * 8);
        wrap.style.transform = `translate(${tx}px, ${ty}px) rotate(${randAngle}deg) translateZ(${tz}px)`;
        wrap.style.transitionDelay = `${Math.random() * 0.5}s`;

        wrap.appendChild(rose);

        // after petals bloom, mark as live so petalLive animation runs
        setTimeout(()=> rose.classList.add('live'), 900);

        return { wrapper: wrap, roseEl: rose };
    }

    function growBush() {
        const bush = document.getElementById("bush");
        if (!bush) return;
        bush.innerHTML = "";
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const { wrapper } = buildRoseElement({ petalCount: 10 + Math.floor(Math.random()*4), size: 64 + Math.floor(Math.random()*20) });
                // stagger inner sway durations so motion isn't identical
                wrapper.querySelector('.rose').style.animationDuration = `${4 + Math.random()*3}s`;
                bush.appendChild(wrapper);
            }, i * 110);
        }
    }

    function growBouquet() {
        const bouquet = document.getElementById("bouquet");
        if (!bouquet) return;
        bouquet.innerHTML = "";
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const { wrapper } = buildRoseElement({ petalCount: 10 + Math.floor(Math.random()*6), size: 56 + Math.floor(Math.random()*30) });
                wrapper.querySelector('.rose').style.animationDuration = `${4 + Math.random()*4}s`;
                bouquet.appendChild(wrapper);
            }, i * 60);
        }
    }
});