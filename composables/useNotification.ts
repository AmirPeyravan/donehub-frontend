import type { Notification, NotificationType } from '~/types/auth'

const notifications = ref<Notification[]>([])

export const useNotification = () => {
  const show = (
    message: string,
    type: NotificationType = 'info',
    duration: number = 5000
  ) => {
    const id = Math.random().toString(36).substring(2, 9)
    
    const notification: Notification = {
      id,
      type,
      message,
      duration
    }
    
    notifications.value.push(notification)
    
    if (duration > 0) {
      setTimeout(() => {
        remove(id)
      }, duration)
    }
    
    return id
  }

  const remove = (id: string) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const success = (message: string, duration?: number) => {
    return show(message, 'success', duration)
  }

  const error = (message: string, duration?: number) => {
    return show(message, 'error', duration)
  }

  const warning = (message: string, duration?: number) => {
    return show(message, 'warning', duration)
  }

  const info = (message: string, duration?: number) => {
    return show(message, 'info', duration)
  }

  const clear = () => {
    notifications.value = []
  }

  return {
    notifications: readonly(notifications),
    show,
    remove,
    success,
    error,
    warning,
    info,
    clear
  }
}