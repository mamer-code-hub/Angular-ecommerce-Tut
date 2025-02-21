import { AuthService } from "../../features/Authentication/services/auth.service";

export const redirectToHome = (auth: AuthService):any => {
  return auth.isLoggedIn.subscribe({
    next: (isLoggedIn) => {
      if (isLoggedIn) {
        auth.navigateToHome()
      }
    }
  })
}
export const redirectToLogin = (auth: AuthService):any => {
  return auth.isLoggedIn.subscribe({
    next: (isLoggedIn) => {
      if (!isLoggedIn) {
        auth.navigateToLogin()
      }
    }
  })
}
