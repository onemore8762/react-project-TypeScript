import {instance} from "./api";

export const authApi = {
    me() {
        return instance.get('auth/me')
    },
    login(email: string, password: string, rememberMe: boolean, captcha?: string) {
        return instance.post('auth/login', {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete('auth/login')
    },
    captcha() {
        return instance.get('security/get-captcha-url')
    }
}