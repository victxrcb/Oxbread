import { useInView } from '../hooks/useInView'

const directionMap = {
  up:    'translate-y-10',
  down:  '-translate-y-10',
  left:  'translate-x-10',
  right: '-translate-x-10',
}

export default function FadeIn({ children, className = '', delay = 0, direction = 'up' }) {
  const [ref, inView] = useInView()

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        inView
          ? 'opacity-100 translate-x-0 translate-y-0'
          : `opacity-0 ${directionMap[direction]}`
      } ${className}`}
    >
      {children}
    </div>
  )
}
