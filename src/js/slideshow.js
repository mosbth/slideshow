// Slideshow-logik
const slides = Array.from(document.querySelectorAll('slide')).map(slide => slide.textContent.trim())
const slideContainer = document.getElementById('slide-container')
const prevButton = document.getElementById('prev-slide')
const nextButton = document.getElementById('next-slide')
let currentSlideIndex = 0
  
// Rendera en slide
function renderSlide() {
  const content = slides[currentSlideIndex]

  slideContainer.innerHTML = marked.parse(content)
  Prism.highlightAll()

  /*
    if (content.trim().startsWith("![") && content.includes("](")) {
      const imgSrc = content.match(/\((.*?)\)/)[1];
      slideContainer.innerHTML = `<img src="${imgSrc}" alt="Slide Image">`;
    } else {
      slideContainer.innerHTML = marked.parse(content);
      Prism.highlightAll();
    }
*/
  prevButton.disabled = currentSlideIndex === 0
  nextButton.disabled = currentSlideIndex === slides.length - 1
}
  
// Eventlisteners för knappar
prevButton.addEventListener('click', () => {
  if (currentSlideIndex > 0) currentSlideIndex--
  renderSlide()
})
  
nextButton.addEventListener('click', () => {
  if (currentSlideIndex < slides.length - 1) currentSlideIndex++
  renderSlide()
})
  
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
  