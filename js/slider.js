document.addEventListener("DOMContentLoaded", () => {
  const slides = [
    {
      bgText: "AUDI",
      imageSrc: "img/Audi.png",
    },
    {
      bgText: "TOYOTA",
      imageSrc: "img/Toyota.png",
    },
    {
      bgText: "MERCEDES",
      imageSrc: "img/Mercedes.png",
    },
  ];

  let currentSlideIndex = 0;

  const bgTextElement = document.querySelector(".hero-bg-text");
  const imageElement = document.querySelector(".hero-right-top img");
  const dots = document.querySelectorAll(".dot");

  function updateSlide(newIndex) {
    bgTextElement.classList.add("bg-text-fade-out");
    imageElement.classList.add("image-fade-out");

    setTimeout(() => {
      bgTextElement.textContent = slides[newIndex].bgText;
      imageElement.src = slides[newIndex].imageSrc;

      bgTextElement.classList.remove("bg-text-fade-out");
      imageElement.classList.remove("image-fade-out");

      bgTextElement.classList.add("bg-text-fade-in");
      imageElement.classList.add("image-fade-in");

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === newIndex);
      });

      setTimeout(() => {
        bgTextElement.classList.remove("bg-text-fade-in");
        imageElement.classList.remove("image-fade-in");
      }, 600);

      currentSlideIndex = newIndex;
    }, 600);
  }

  document
    .querySelector(".hero-right-bottom button:first-child")
    .addEventListener("click", () => {
      const newIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
      updateSlide(newIndex);
    });

  document
    .querySelector(".hero-right-bottom button:last-child")
    .addEventListener("click", () => {
      const newIndex = (currentSlideIndex + 1) % slides.length;
      updateSlide(newIndex);
    });

  updateSlide(currentSlideIndex);
});
