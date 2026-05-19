const HEADER_OFFSET = 80

export function useScrollTo() {
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId)
    if (!section) return

    const header = document.querySelector('.content3')
    const headerHeight = header?.offsetHeight ?? HEADER_OFFSET
    const top = section.getBoundingClientRect().top + window.scrollY - headerHeight

    window.scrollTo({ top, behavior: 'smooth' })
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return { scrollToSection, scrollToTop }
}
