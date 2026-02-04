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
  const H_MARGIN = 5; // vw - keep flowers at least this far from screen edges
  // clamp to margin so flowers don't overflow
  xPercent = Math.max(H_MARGIN, Math.min(100 - H_MARGIN, xPercent));

  const wrapper = document.createElement("div");
  wrapper.className = "flower-wrap";
  wrapper.style.position = "absolute";
  wrapper.style.left = "50%"; // center origin
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

  // Offset from center (in vw)
  const offsetX = xPercent - 50;
  wrapper.style.transform = `translate3d(${offsetX}vw, ${y}px, 0) scale(${scale})`;

  setTimeout(() => {
    wrapper.querySelector(".flowers")?.classList.remove("not-loaded");
  }, 100);
}

// Create a centered row of flower projects using CSS Grid so we can offset rows by half a column
// This guarantees equal spacing lengthwise and allows the second row to sit under gaps (chessboard)
function createCenteredRow({ count = 5, y = 320, scale = 0.28, hideSecondary = false, hidePrimary = false, zIndex = 10, offset = false, yNudgeMag = 6, gapPx = 10, startHidden = false }) {
  const row = document.createElement('div');
  row.className = 'center-row';
  row.style.bottom = y + 'px';
  row.style.zIndex = zIndex;
  if (startHidden) {
    row.classList.add('is-hidden');
  }

  // set grid columns and gaps
  row.style.gridTemplateColumns = `repeat(${count}, 1fr)`;
  row.style.setProperty('--center-gap-px', `${gapPx}px`);
  row.style.setProperty('--count', `${count}`);

  // if offset is true, shift the whole row by half a column so items land under gaps
  if (offset) {
    const shiftPercent = 100 / (2 * count); // percent of row width
    row.style.transform = `translateX(calc(-50% + ${shiftPercent}%))`;
  } else {
    row.style.transform = 'translateX(-50%)';
  }

  for (let i = 0; i < count; i++) {
    const wrapper = document.createElement('div');
    wrapper.className = 'flower-wrap';
    wrapper.style.position = 'static';

    // small vertical nudge per item for natural look
    const yNudgePx = ((i % 2 === 0) ? 1 : -1) * yNudgeMag;

    const perItemZ = zIndex + ((i % 2 === 0) ? 2 : 0);
    wrapper.style.zIndex = perItemZ;

    wrapper.dataset.baseScale = scale;
    wrapper.dataset.yNudgePx = yNudgePx;

    wrapper.style.transform = `translateY(${yNudgePx}px) scale(${scale})`;
    wrapper.style.justifySelf = 'center';
    wrapper.style.margin = `0 ${gapPx / 2}px`;

    const flower = flowerTemplate.content.cloneNode(true);
    if (hideSecondary) {
      flower.querySelectorAll(".flower--2, .flower--3").forEach(f => f.classList.add("hidden"));
    }
    if (hidePrimary) {
      flower.querySelectorAll(".flower--1").forEach(f => f.classList.add("hidden"));
    }

    wrapper.appendChild(flower);
    row.appendChild(wrapper);

    setTimeout(() => {
      wrapper.querySelector(".flowers")?.classList.remove("not-loaded");
    }, 100);
  }

  garden.appendChild(row);

  // measure and scale items to ensure they fit evenly in grid columns
  setTimeout(() => {
    const wrappers = Array.from(row.querySelectorAll('.flower-wrap'));
    const rowWidth = row.clientWidth;
    const totalGap = gapPx * (count - 1);
    const availableWidth = Math.max(0, rowWidth - totalGap);
    const perColumnWidth = availableWidth / count;

    wrappers.forEach((w, idx) => {
      const rect = w.getBoundingClientRect();
      const naturalW = rect.width;
      let scaleFactor = 1;
      if (naturalW > perColumnWidth && naturalW > 0) {
        scaleFactor = perColumnWidth / naturalW;
      }

      // clamp minimum scale so flowers remain readable (allow smaller if necessary)
      scaleFactor = Math.max(0.10, scaleFactor);

      const base = parseFloat(w.dataset.baseScale) || scale;
      const yNudgePx = parseFloat(w.dataset.yNudgePx) || 0;
      const finalScale = +(base * scaleFactor).toFixed(3);

      // stagger item visibility for smooth cascade
      w.style.animationDelay = `${idx * 0.1}s`;
      w.style.transform = `translateY(${yNudgePx}px) scale(${finalScale})`;
    });
  }, 150);

  return row;
}

function runGarden() {
    const bottomY = 0;
    const verticalSpacing = 130;     // BIG space between rows
    const horizontalSpacing = 16;    // space between flowers
    const rows = 6;                  // number of rows in field
    const maxFlowersPerRow = 5;

    let delay = 0;

    // 🌸 1. Bottom hero flower removed (single flower not needed)

    delay += 600; // slower, dramatic start ✨

    // Add a centered middle row of 5 flower projects (side-by-side, equal spacing)
    setTimeout(() => {
        const middleY = bottomY + Math.round((rows / 2) * verticalSpacing) + 40;
        const lowerY = middleY - Math.round(verticalSpacing * 1.4);
        const lower2Y = lowerY - Math.round(verticalSpacing * 1.2);
        const lower3Y = lower2Y - Math.round(verticalSpacing * 1.1);
        const lower4Y = lower3Y - Math.round(verticalSpacing * 1.0);

        const row5 = createCenteredRow({
          count: 1,
          y: lower4Y,
          scale: 0.28,
          hideSecondary: true, // hide flower--2 and flower--3
          zIndex: 10,
          offset: false,
          yNudgeMag: 2,
          gapPx: 10,
          startHidden: true
        });

        const row4 = createCenteredRow({
          count: 2,
          y: lower3Y,
          scale: 0.17,
          hideSecondary: false,
          hidePrimary: true, // hide flower--1
          zIndex: 9,
          offset: false,
          yNudgeMag: 4,
          gapPx: 10,
          startHidden: true
        });

        const row3 = createCenteredRow({
          count: 5,
          y: lower2Y,
          scale: 0.19,
          hideSecondary: false,
          zIndex: 8,
          offset: false,
          yNudgeMag: 6,
          gapPx: 10,
          startHidden: true
        });

        const row2 = createCenteredRow({
          count: 5,
          y: lowerY,
          scale: 0.21,
          hideSecondary: false,
          zIndex: 7,
          offset: true, // offset so this row sits under the gaps of the middle row
          yNudgeMag: 8,
          gapPx: 10,
          startHidden: true
        });

        const row1 = createCenteredRow({
          count: 5,
          y: middleY,
          scale: 0.22,
          hideSecondary: false,
          zIndex: 3,
          offset: false,
          yNudgeMag: 8,
          gapPx: 10,
          startHidden: true
        });

        // Unhide sequence: wait 2s, then row5, row4, row3, row2, row1 every 2s
        const reveal = [row5, row4, row3, row2, row1];
        reveal.forEach((row, idx) => {
          setTimeout(() => {
            row?.classList.remove('is-hidden');
          }, 2000 + idx * 2000);
        });
    }, delay + 300);

    // 🌸 2. Middle rows removed (bottom flowers)

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
// (scenes removed - no longer needed)

window.addEventListener("load", runGarden);
