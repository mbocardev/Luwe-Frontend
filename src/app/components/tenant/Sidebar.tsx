'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, CreditCard, MessageCircle, AlertCircle } from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/tenant/dashboard", icon: Home },
  { label: "Paiements", href: "/tenant/payments", icon: CreditCard },
  { label: "Messages", href: "/tenant/messages", icon: MessageCircle },
  { label: "Incidents", href: "/tenant/issues", icon: AlertCircle },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen p-4 flex flex-col bg-background text-foreground">
      <div>
        <h1 className="text-2xl font-bold mb-6">Locataire</h1>
        <nav className="space-y-2">
          {navItems.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center px-3 py-2 rounded-md transition hover:bg-muted/10 ${
                pathname === href ? "bg-muted/20" : ""
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
