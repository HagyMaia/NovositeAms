const items = [
  "Coleta delivery",
  "Hidroblindagem",
  "Ozônio anti-odor",
  "Cuidado artesanal",
  "Couro · Knit · Suede",
  "Manaus",
]

export function Marquee() {
  return (
    <div className="relative flex overflow-hidden border-y border-border bg-primary py-4 text-primary-foreground">
      <div className="flex shrink-0 animate-[marquee_28s_linear_infinite] items-center gap-8 pr-8">
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span className="text-sm font-semibold uppercase tracking-wider">
              {item}
            </span>
            <span className="text-base">✦</span>
          </div>
        ))}
      </div>
      <div
        aria-hidden
        className="flex shrink-0 animate-[marquee_28s_linear_infinite] items-center gap-8 pr-8"
      >
        {[...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span className="text-sm font-semibold uppercase tracking-wider">
              {item}
            </span>
            <span className="text-base">✦</span>
          </div>
        ))}
      </div>
    </div>
  )
}
