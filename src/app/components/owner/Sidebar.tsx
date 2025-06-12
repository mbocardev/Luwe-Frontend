'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Building, Users, AlertCircle } from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/owner/dashboard", icon: Home },
  { label: "Mes biens", href: "/owner/properties", icon: Building },
  { label: "Locataires", href: "/owner/tenants", icon: Users },
  { label: "Incidents", href: "/owner/issues", icon: AlertCircle },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen p-4 flex flex-col bg-background text-foreground">
      <div>
        <h1 className="text-2xl font-bold mb-6">Propriétaire</h1>
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
