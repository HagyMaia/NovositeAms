"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X } from "lucide-react"
import { SITE_CONFIG } from "@/lib/constants"

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false)
  const [hasClosedTooltip, setHasClosedTooltip] = useState(false)

  useEffect(() => {
    // Show tooltip after 3 seconds
    const timer = setTimeout(() => {
      if (!hasClosedTooltip) {
        setShowTooltip(true)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [hasClosedTooltip])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip Card */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="relative flex items-center gap-3 rounded-2xl border border-border bg-card/95 p-3.5 pr-8 shadow-2xl backdrop-blur-md max-w-xs text-xs text-foreground"
          >
            <button
              onClick={() => {
                setShowTooltip(false)
                setHasClosedTooltip(true)
              }}
              className="absolute right-2 top-2 p-1 text-muted-foreground hover:text-foreground"
              aria-label="Fechar balão"
            >
              <X className="size-3.5" />
            </button>
            <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Atendimento Online</p>
              <p className="text-muted-foreground text-[11px] mt-0.5">
                Tire dúvidas ou agende sua coleta delivery agora!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.a
        href={SITE_CONFIG.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar pelo WhatsApp"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="group relative flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/25 transition-all hover:shadow-2xl hover:shadow-[#25D366]/40 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
      >
        {/* Radar Pulse Animation */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 opacity-75 blur-sm animate-ping pointer-events-none" />

        {/* WhatsApp Icon */}
        <MessageCircle className="relative size-7 fill-white stroke-none" />

        {/* Online Status Indicator */}
        <span className="absolute top-1 right-1 flex size-3.5 items-center justify-center">
          <span className="size-3 rounded-full bg-emerald-300 ring-2 ring-background" />
        </span>
      </motion.a>
    </div>
  )
}
