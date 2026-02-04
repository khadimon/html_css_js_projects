const scenes = document.querySelectorAll(".scene");
const garden = document.getElementById("garden");
const flowerTemplate = document.getElementById("flower-project");

let currentScene = 0;

document.body.addEventListener("click", () => {
  if (currentScene < scenes.length - 1) {
    scenes[currentScene].classList.remove("active");
    currentScene++;
    scenes[currentScene].classList.add("active");
    runScene(currentScene);
  }
});

function createFlower({
  xPercent = 50, // keep centered by default
  y = 0,
  scale = 0.4,
  hideSecondary = false,
  zIndex = 1
}) {
  const wrapper = document.createElement("div");
  wrapper.className = "flower-wrap";
  wrapper.style.position = "absolute";
  wrapper.style.left = "50%"; // center
  wrapper.style.bottom = "0"; // start from bottom
  wrapper.style.zIndex = zIndex;

  const flower = flowerTemplate.content.cloneNode(true);

  if (hideSecondary) {
    flower.querySelectorAll(".flower--2, .flower--3").forEach(f =>
      f.classList.add("hidden")
    );
  }

  wrapper.appendChild(flower);
  garden.appendChild(wrapper);

  // Offset from center
  const offsetX = xPercent - 50;
  wrapper.style.transform = `translate3d(${offsetX}vw, ${y}px, 0) scale(${scale})`;

  setTimeout(() => {
    wrapper.querySelector(".flowers")?.classList.remove("not-loaded");
  }, 100);
}

function runGarden() {
    const bottomY = 0;
    const verticalSpacing = 130;     // BIG space between rows
    const horizontalSpacing = 16;    // space between flowers
    const rows = 6;                  // number of rows in field
    const maxFlowersPerRow = 5;

    let delay = 0;

    // 🌸 1. Bottom hero flower (hidden petals)
    setTimeout(() => {
        createFlower({
            xPercent: 50,
            y: bottomY,
            scale: 0.38,
            hideSecondary: true,
            zIndex: 20
        });
    }, delay);

    delay += 600; // slower, dramatic start ✨

    // 🌸 2. Middle rows (fill faster as we go up)
    for (let row = 0; row < rows; row++) {
        const y = bottomY + (row + 1) * verticalSpacing;
        const scale = 0.34 - row * 0.04;
        const zIndex = 15 - row * 2;
        const rowDelay = Math.max(120, 400 - row * 50); // faster higher up

        setTimeout(() => {
            for (let i = 0; i < maxFlowersPerRow; i++) {
                const offset =
                    (i - (maxFlowersPerRow - 1) / 2) * horizontalSpacing;

                createFlower({
                    xPercent: 50 + offset,
                    y,
                    scale,
                    hideSecondary: false,
                    zIndex
                });
            }
        }, delay);

        delay += rowDelay;
    }

    // 🌸 3. Top crown flower (hidden petals again)
    setTimeout(() => {
        createFlower({
            xPercent: 50,
            y: bottomY + (rows + 1) * verticalSpacing,
            scale: 0.28,
            hideSecondary: true,
            zIndex: 5
        });
    }, delay + 300);
}




// keep text on top
document.querySelectorAll(".scene .text").forEach(t => {
  t.style.position = "relative";
  t.style.zIndex = 1000;
});

window.addEventListener("load", runGarden);
