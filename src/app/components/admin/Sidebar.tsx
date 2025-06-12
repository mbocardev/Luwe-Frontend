'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Users,
  Building,
  AlertCircle,
  CreditCard,
} from "lucide-react"

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: Home },
  { label: "Utilisateurs", href: "/admin/users", icon: Users },
  { label: "Propriétés", href: "/admin/properties", icon: Building },
  { label: "Incidents", href: "/admin/issues", icon: AlertCircle },
  { label: "Paiements", href: "/admin/payments", icon: CreditCard },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen p-4 flex flex-col bg-background text-foreground">
      <div>
        <h1 className="text-2xl font-bold mb-6">Admin</h1>
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
