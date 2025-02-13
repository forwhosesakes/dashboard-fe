
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


const latestOrgs = {
    "Healthcare":{
        name:"الرعاية الصحية",
        theme: {
            bg: "bg-[#eef4ff]",
            text: "text-[#3538cd]",
            border: "border-[#c6d7fe]",
          }
    },
    "technical":{
        name:"تقني",
        theme: {
            bg: "bg-[#f9f5ff]",
            text: "text-[#6941c6]",
            border: "border-[#e9d7fe]",
          },
    },
    "orphans":{
        name:"رعاية الأيتام",
        theme:{
            bg:"bg-[#eff8ff]",
            text:"text-[#175cd3]",
            border:"border-[#b2ddff]"}
        }
}

export default {
    login,
    latestOrgs
} as const