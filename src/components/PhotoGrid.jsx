// The one place that defines the responsive columns:
// 1 on mobile, 2 on tablet (md), 4 on desktop (lg).
export default function PhotoGrid({ children, ...props }) {
  return (
    <ul
      className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-4"
      {...props}
    >
      {children}
    </ul>
  )
}
