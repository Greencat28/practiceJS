const courseProgress = document.querySelector(
  ".course__progress-element progress"
);
const courseSection = document.querySelector(".course");
const progress = courseSection ? courseSection.querySelector("progress") : null;
const amountLabel = courseSection
  ? courseSection.querySelector(".course__progress-label .course__number")
  : null;

console.dir({ courseSection, progress, amountLabel });

if (!courseSection || !progress) {
  console.warn(
    "Не найден элемент .course или <progress> — анимация прогресса не будет работать."
  );
} else {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Запускаем анимацию один раз
          obs.disconnect();
          startProgressAnimation();
        }
      });
    },
    { root: null, rootMargin: "-50% 0px -50% 0px", threshold: 0 }
  );

  observer.observe(courseSection);

  let animated = false;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function startProgressAnimation() {
    if (animated) return;
    animated = true;

    const target = +progress.getAttribute("value") || +progress.value || 0;
    const max = +progress.getAttribute("max") || +progress.max || target || 100;

    progress.value = 0;

    const duration = 1200; // ms
    const startTime = performance.now();
    const nf = new Intl.NumberFormat("ru-RU");

    function frame(now) {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = easeOutCubic(t);
      const current = eased * target;

      progress.value = current;
      if (amountLabel)
        amountLabel.textContent = nf.format(Math.round(current)) + "₽";

      if (t < 1) requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }
}
console.log("progress value:", value);
console.log("progress max:", max);
console.log("progress percent:", percent);
