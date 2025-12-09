// app/components/Header.tsx
export function Header() {
    return (
      <header className="w-full border-b border-sky-200 bg-gradient-to-r from-sky-600 to-blue-700 shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <h1 className="text-xl font-semibold text-white">Painel Digital</h1>
          <span className="text-xs md:text-sm text-sky-100">
            Autonomia digital para o empreendedor
          </span>
        </div>
      </header>
    );
  }
  