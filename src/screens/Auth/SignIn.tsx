import { FormEvent, useState } from 'react'
import { Button, Card, CardContent, Field, Input, SyncBrandMark, SyncMascot } from '@/components'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'
import { user } from '@/data/mock'
import { useLanguage } from '@/i18n'

interface SignInScreenProps {
  onSignIn: () => void
}

/** Shown after logging out; any password signs back into the demo account */
export function SignInScreen({ onSignIn }: SignInScreenProps) {
  const { t } = useLanguage()
  const copy = t.auth
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)

  const submit = (e: FormEvent) => {
    e.preventDefault()
    if (!email.includes('@') || !password) {
      setError(copy.invalid)
      return
    }
    setError(undefined)
    setLoading(true)
    window.setTimeout(onSignIn, 600)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background p-md">
      <div className="absolute right-4 top-4">
        <ThemeSwitcher />
      </div>
      <div className="w-full max-w-(--container-sm) space-y-lg">
        <div className="flex flex-col items-center gap-md text-center">
          <SyncMascot pose="wave" size="md" floating sparkles speech={copy.mascotWelcome} />
          <div className="flex items-center gap-1.5">
            <span className="text-2xl font-bold tracking-tight text-foreground">
              Fin<span className="text-[#1877f2] dark:text-[#45b8ff]">Sync</span>
            </span>
          </div>
        </div>
        <Card>
          <CardContent>
            <form onSubmit={submit} className="space-y-md" noValidate>
              <div className="space-y-1 text-center">
                <h1 className="text-xl font-semibold tracking-tight">{copy.title}</h1>
                <p className="text-sm text-muted">{copy.description}</p>
              </div>
              <Field id="signin-email" label={t.settings.email}>
                <Input id="signin-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Field>
              <Field id="signin-password" label={copy.password} error={error}>
                <Input
                  id="signin-password"
                  type="password"
                  autoComplete="current-password"
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={!!error}
                />
              </Field>
              <Button type="submit" className="w-full" isLoading={loading}>
                {copy.signIn}
              </Button>
              <p className="text-center text-xs text-muted">{copy.demoHint}</p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
