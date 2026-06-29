export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row sm:px-8">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-mono text-sm font-bold">
            AS
          </span>
          <span className="text-sm font-semibold">
            Amazon<span className="text-primary">Shoes</span> · Manaus
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Amazon Shoes. Seus tênis novos de novo.
        </p>
      </div>
    </footer>
  )
}
