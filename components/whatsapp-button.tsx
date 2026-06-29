"use client"

import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const WHATSAPP_URL = "https://wa.me/5592988140239?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20coleta."

  return (
    <motion.a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-6 right-6 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:bg-[#20bd5a] hover:shadow-2xl"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={28} />
    </motion.a>
  )
}