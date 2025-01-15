
const login = {
    title:"تسجيل الدخول",
    email:"*البريد الإلكتروني",
    password:"*كلمة المرور",
    login:"تسجيل الدخول",
    forgot_password:"نسيت كلمة المرور",

    errors: {
        email: {
            required: "البريد الإلكتروني مطلوب",
            invalid: "صيغة البريد الإلكتروني غير صحيحة"
        },
        password: {
            required: "كلمة المرور مطلوبة"
        },
        unverified: "الرجاء تفعيل البريد الإلكتروني للمتابعة",
        invalid: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
        generic: "حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى"
    }
}

export default {
    login,
} as const