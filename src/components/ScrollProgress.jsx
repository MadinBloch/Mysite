import { motion, useScroll } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent"
      aria-hidden="true"
    />
  )
}
