import { whatsappUrl } from '../../constants/siteData'

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
      <path d="M20.52 3.48A11.87 11.87 0 0 0 12.06 0 11.95 11.95 0 0 0 1.74 17.9L0 24l6.26-1.64a12 12 0 0 0 5.77 1.47h.01A11.98 11.98 0 0 0 24 11.94c0-3.2-1.25-6.2-3.48-8.46Zm-8.47 18.31h-.01a9.94 9.94 0 0 1-5.07-1.39l-.36-.21-3.72.98 1-3.62-.24-.37a9.95 9.95 0 1 1 8.4 4.6Zm5.45-7.41c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.17.2-.35.23-.65.08-.3-.15-1.25-.46-2.39-1.46-.88-.78-1.47-1.74-1.64-2.03-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.93-2.25-.24-.59-.5-.51-.68-.52h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.02-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.13 3.25 5.16 4.56.72.31 1.28.5 1.72.64.73.23 1.4.2 1.93.12.59-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.27-.2-.57-.35Z" />
    </svg>
  )
}

function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
        aria-label="WhatsApp kontaktieren"
      >
        <WhatsAppIcon />
      </a>
    </div>
  )
}

export default WhatsAppButton
