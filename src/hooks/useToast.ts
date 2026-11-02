import { useContext } from 'react'
import { ToastContext } from '@/components/Toast/context'

export function useToast() {
  return useContext(ToastContext)
}
