import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { authService } from '@/services/auth.service'

export function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const isPublicPage = to.matched.some(record => record.meta.public)
  const isAuthenticated = authService.isAuthenticated()

  if (!isPublicPage && !isAuthenticated) {
    const loginPath = {
      name: 'login',
      query: { redirect: to.fullPath }
    }
    return next(loginPath)
  }

  if (isAuthenticated && isPublicPage) {
    const redirectPath = to.query.redirect?.toString() || '/dashboard'
    return next(redirectPath)
  }

  next()
}