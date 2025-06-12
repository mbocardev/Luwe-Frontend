import Navbar from "@/app/components/Navbar"
import Sidebar from "@/app/components/owner/Sidebar"
import "@/app/globals.css"

export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Navbar />
        <main className="p-6 bg-background min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}
