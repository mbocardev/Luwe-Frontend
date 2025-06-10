'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    
    try {
      // Étape 1: Authentification
      const { error: authError } = await supabase.auth.signInWithPassword({ 
        email, 
        password 
      })
      
      if (authError) throw authError

      // Étape 2: Récupération du user avec son rôle
      const { data: { user: authUser } } = await supabase.auth.getUser()
      
      if (!authUser) throw new Error('Utilisateur non trouvé')

      // Étape 3: Récupération du profil complet depuis la table users
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('id, role')
        .eq('email', email)
        .single()

      if (profileError || !userProfile) throw new Error('Profil utilisateur introuvable')

      // Étape 4: Redirection selon le rôle
      switch (userProfile.role) {
        case 'admin':
          router.push('/admin/dashboard')
          break
        case 'owner':
          router.push('/owner/dashboard')
          break
        case 'tenant':
          router.push('/tenant/dashboard')
          break
        default:
          router.push('/')
      }
      
      // Force le rafraîchissement pour s'assurer que les données utilisateur sont à jour
      router.refresh()

    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('Une erreur inconnue est survenue')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-bold text-center">Connexion</h1>
        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <Input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button 
            onClick={handleLogin} 
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </Button>
        </div>
        <p className="text-center text-sm text-muted-foreground">
          Pas encore de compte ?{' '}
          <a href="/auth/signup" className="text-primary hover:underline">
            S'inscrire
          </a>
        </p>
      </div>
    </div>
  )
}