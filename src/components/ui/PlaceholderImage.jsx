function PlaceholderImage({ label, className = '' }) {
  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-[#F5EFE7] type-ui uppercase text-[#8B7355]/70 ${className}`}
    >
      {label}
    </div>
  )
}

export default PlaceholderImage
