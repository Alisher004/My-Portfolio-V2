import { onMounted, onUnmounted, watch } from 'vue'

export function useSlideIn(rootRef, { removeOnLeave = false, watchSource = null } = {}) {
  let observer

  function setup() {
    observer?.disconnect()

    const root = rootRef?.value
    if (!root) return

    const elements = root.querySelectorAll('.slide-in-left, .slide-in-right')
    if (!elements.length) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          } else if (removeOnLeave) {
            entry.target.classList.remove('is-visible')
          }
        })
      },
      { threshold: 0.15, rootMargin: '50px 0px' }
    )

    elements.forEach((el) => observer.observe(el))
  }

  onMounted(() => {
    setup()
  })

  if (watchSource) {
    watch(watchSource, () => {
      requestAnimationFrame(setup)
    })
  }

  onUnmounted(() => {
    observer?.disconnect()
  })
}
