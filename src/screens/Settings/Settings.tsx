import { ReactNode, useRef, useState } from 'react'
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ChangePasswordDialog,
  ConfirmDialog,
  Container,
  Field,
  Input,
  PageHeader,
  Select,
  Switch,
  SyncAvatar,
} from '@/components'
import { user } from '@/data/mock'
import { useToast } from '@/hooks/useToast'
import { useLanguage, type Language } from '@/i18n'
import type { NavigateFn } from '@/lib/navigation'
import { ArrowRight, Sparkles } from 'lucide-react'

interface SettingRowProps {
  id: string
  title: string
  description: string
  control: ReactNode
}

function SettingRow({ id, title, description, control }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between gap-lg px-lg py-md">
      <div className="space-y-0.5">
        <label htmlFor={id} className="text-sm font-medium">
          {title}
        </label>
        <p className="text-sm text-muted">{description}</p>
      </div>
      {control}
    </div>
  )
}

interface SettingsScreenProps {
  onNavigate?: NavigateFn
  /** Called after the account is deleted */
  onSignOut?: () => void
  avatarUrl?: string | null
  onAvatarChange?: (url: string | null) => void
}

export function SettingsScreen({ onNavigate, onSignOut, avatarUrl, onAvatarChange }: SettingsScreenProps = {}) {
  const { language, setLanguage, t } = useLanguage()
  const { toast } = useToast()
  const copy = t.settingsExtra
  const fileInput = useRef<HTMLInputElement>(null)

  const [saved, setSaved] = useState({ name: user.name, email: user.email })
  const [name, setName] = useState(saved.name)
  const [email, setEmail] = useState(saved.email)
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})
  const [passwordOpen, setPasswordOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [twoFactor, setTwoFactor] = useState(false)
  const [mascotMood, setMascotMood] = useState<'idle' | 'happy' | 'thinking'>('idle')

  const dirty = name !== saved.name || email !== saved.email

  const saveProfile = () => {
    const nextErrors = {
      name: name.trim() ? undefined : copy.nameRequired,
      email: /^\S+@\S+\.\S+$/.test(email) ? undefined : copy.emailInvalid,
    }
    setErrors(nextErrors)
    if (nextErrors.name || nextErrors.email) return
    setSaved({ name: name.trim(), email })
    toast({ title: copy.profileSaved })
  }

  const cancel = () => {
    setName(saved.name)
    setEmail(saved.email)
    setErrors({})
  }

  const choosePhoto = (file?: File) => {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast({ title: copy.photoInvalid, variant: 'error' })
      return
    }
    onAvatarChange?.(URL.createObjectURL(file))
    toast({ title: copy.photoUpdated })
  }

  const preferenceSaved = () => toast({ title: copy.preferenceSaved, variant: 'info' })

  return (
    <Container maxWidth="lg" className="space-y-xl">
      <PageHeader title={t.settings.title} description={t.settings.description} />

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle>{t.settings.profileTitle}</CardTitle>
          <CardDescription>{t.settings.profileDescription}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-lg">
          <div className="flex items-center gap-md">
            <Avatar src={avatarUrl ?? undefined} initials={user.initials} alt={saved.name} className="size-14 text-base" />
            <div className="flex gap-sm">
              <input
                ref={fileInput}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  choosePhoto(e.target.files?.[0])
                  e.target.value = ''
                }}
              />
              <Button variant="secondary" size="sm" onClick={() => fileInput.current?.click()}>
                {t.settings.changePhoto}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled={!avatarUrl}
                onClick={() => {
                  onAvatarChange?.(null)
                  toast({ title: copy.photoRemoved, variant: 'info' })
                }}
              >
                {t.settings.remove}
              </Button>
            </div>
          </div>
          <div className="grid gap-md sm:grid-cols-2">
            <Field id="name" label={t.settings.fullName} error={errors.name}>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} />
            </Field>
            <Field id="email" label={t.settings.email} error={errors.email}>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email} />
            </Field>
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-sm">
          <Button variant="ghost" onClick={cancel} disabled={!dirty}>
            {t.settings.cancel}
          </Button>
          <Button onClick={saveProfile} disabled={!dirty}>
            {t.settings.saveChanges}
          </Button>
        </CardFooter>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle>{t.settings.securityTitle}</CardTitle>
          <CardDescription>{t.settings.securityDescription}</CardDescription>
        </CardHeader>
        <div className="divide-y divide-border">
          <SettingRow
            id="password"
            title={t.settings.password}
            description={t.settings.passwordDescription}
            control={
              <Button id="password" variant="secondary" size="sm" onClick={() => setPasswordOpen(true)}>
                {t.settings.update}
              </Button>
            }
          />
          <SettingRow
            id="two-factor"
            title={t.settings.twoFactor}
            description={t.settings.twoFactorDescription}
            control={
              <Switch
                id="two-factor"
                checked={twoFactor}
                onCheckedChange={(value) => {
                  setTwoFactor(value)
                  toast({ title: value ? copy.twoFactorOn : copy.twoFactorOff, variant: value ? 'success' : 'info' })
                }}
              />
            }
          />
        </div>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>{t.settings.preferencesTitle}</CardTitle>
          <CardDescription>{t.settings.preferencesDescription}</CardDescription>
        </CardHeader>
        <div className="divide-y divide-border">
          <SettingRow
            id="language"
            title={t.settings.language}
            description={t.settings.languageDescription}
            control={
              <Select
                id="language"
                className="w-48"
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
              >
                <option value="pt">{t.settings.languages.pt}</option>
                <option value="en">{t.settings.languages.en}</option>
                <option value="es">{t.settings.languages.es}</option>
              </Select>
            }
          />
          <SettingRow
            id="currency"
            title={t.settings.currency}
            description={t.settings.currencyDescription}
            control={
              <Select id="currency" className="w-48" onChange={preferenceSaved}>
                <option value="BRL">{t.settings.currencies.brl}</option>
                <option value="USD">{t.settings.currencies.usd}</option>
                <option value="EUR">{t.settings.currencies.eur}</option>
              </Select>
            }
          />
          <SettingRow
            id="notifications"
            title={t.settings.emailNotifications}
            description={t.settings.emailNotificationsDescription}
            control={<Switch id="notifications" defaultChecked onCheckedChange={preferenceSaved} />}
          />
          <SettingRow
            id="hide-balances"
            title={t.settings.hideBalances}
            description={t.settings.hideBalancesDescription}
            control={<Switch id="hide-balances" onCheckedChange={preferenceSaved} />}
          />
        </div>
        {onNavigate && (
          <CardFooter>
            <Button variant="ghost" size="sm" className="-ml-2" onClick={() => onNavigate('notifications')}>
              {copy.viewNotifications}
              <ArrowRight />
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Sync Mascot & AI Companion preview */}
      <Card className="relative overflow-hidden border-[#15b2f7]/25 bg-linear-to-br from-[#2055f5]/[0.04] via-surface to-[#15b2f7]/[0.06]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="size-4 text-[#15b2f7]" />
                {t.settingsSync.title}
              </CardTitle>
              <CardDescription>{t.settingsSync.description}</CardDescription>
            </div>
            <Badge variant="info">{t.settingsSync.badge}</Badge>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-lg sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-md">
            <SyncAvatar size="lg" mood={mascotMood} glow trackMouse className="shrink-0" />
            <div className="space-y-0.5">
              <p className="text-sm font-semibold">{t.settingsSync.characterTitle}</p>
              <p className="text-xs text-muted leading-relaxed">
                {t.settingsSync.characterDescription}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-xs shrink-0" role="group" aria-label="Humor do mascote">
            <Button
              size="sm"
              variant={mascotMood === 'idle' ? 'primary' : 'secondary'}
              onClick={() => setMascotMood('idle')}
            >
              {t.settingsSync.moodNormal}
            </Button>
            <Button
              size="sm"
              variant={mascotMood === 'happy' ? 'primary' : 'secondary'}
              onClick={() => setMascotMood('happy')}
            >
              {t.settingsSync.moodHappy}
            </Button>
            <Button
              size="sm"
              variant={mascotMood === 'thinking' ? 'primary' : 'secondary'}
              onClick={() => setMascotMood('thinking')}
            >
              {t.settingsSync.moodThinking}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border-danger/30">
        <CardHeader className="border-danger/20">
          <CardTitle className="text-danger">{t.settings.dangerZoneTitle}</CardTitle>
          <CardDescription>{t.settings.dangerZoneDescription}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-md sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-0.5">
            <p className="text-sm font-medium">{t.settings.deleteAccount}</p>
            <p className="text-sm text-muted">{t.settings.deleteAccountDescription}</p>
          </div>
          <Button variant="destructive" className="shrink-0" onClick={() => setDeleteOpen(true)}>
            {t.settings.deleteAccount}
          </Button>
        </CardContent>
      </Card>

      <ChangePasswordDialog open={passwordOpen} onOpenChange={setPasswordOpen} />
      <ConfirmDialog
        open={deleteOpen}
        onOpenChange={(open) => {
          setDeleteOpen(open)
          if (!open) setDeleteConfirm('')
        }}
        title={copy.deleteTitle}
        description={t.settings.deleteAccountDescription}
        confirmLabel={t.settings.deleteAccount}
        destructive
        confirmDisabled={deleteConfirm.trim().toUpperCase() !== copy.deleteKeyword}
        onConfirm={() => {
          toast({ title: copy.deleted, description: copy.deletedDescription, variant: 'info' })
          onSignOut?.()
        }}
      >
        <Field id="delete-confirm" label={copy.deleteConfirmLabel(copy.deleteKeyword)}>
          <Input
            id="delete-confirm"
            autoComplete="off"
            value={deleteConfirm}
            onChange={(e) => setDeleteConfirm(e.target.value)}
          />
        </Field>
      </ConfirmDialog>
    </Container>
  )
}
