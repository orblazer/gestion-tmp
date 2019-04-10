export default function AuthMiddleware ({ app, route, redirect }) {
  const hasToken = !!app.$apolloHelpers.getToken()
  const routeName = app.getRouteBaseName(route)

  if (!hasToken && routeName !== 'login') {
    // error({ errorCode: 503, message: 'You are not allowed to see this' })
    redirect(app.localePath('login'))
  } else if (hasToken && routeName === 'login') {
    redirect(app.localePath('index'))
  }
}
