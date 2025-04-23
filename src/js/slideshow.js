import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

// Slideshow-logik
const slides = Array.from(document.querySelectorAll('slide')).map(slide => slide.textContent.trim())
const slideContainer = document.getElementById('slide')
let currentSlideIndex = 0
  
// Rendera en slide
function renderSlide() {
  const content = slides[currentSlideIndex]

  // Create a custom renderer
const renderer = new marked.Renderer();

// Customize HTML parsing
renderer.html = (html) => {
    return "MOPED" + html; // Return raw HTML unaltered
};

// Configure Marked to use the custom renderer
marked.setOptions({
    renderer: renderer,
    gfm: false,          // Enable GitHub Flavored Markdown
    breaks: true,       // Enable line breaks
    mangle: false,      // Disable email address mangling
    headerIds: false    // Disable IDs on headers
});

  slideContainer.innerHTML = marked.parse(content)
  console.log(slideContainer.innerHTML)
  //Prism.highlightAll()
}

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowLeft":
    case "ArrowUp":
        console.log("back")
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        renderSlide()
        break;
    case "ArrowRight":
    case "ArrowDown":
      console.log("forward")
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        renderSlide()
        break;
    default:
        break;
}
});
  
// Touch-navigering
let startX = 0
slideContainer.addEventListener('touchstart', (event) => {
  startX = event.touches[0].clientX
})

slideContainer.addEventListener('touchend', (event) => {
  const endX = event.changedTouches[0].clientX
  if (endX - startX > 50 && currentSlideIndex > 0) currentSlideIndex--
  if (startX - endX > 50 && currentSlideIndex < slides.length - 1) currentSlideIndex++
  renderSlide()
})
  
// Initiera första sliden
renderSlide()
  