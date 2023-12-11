export const ValidateUsername = (name)=>{
    let namePattern = /^\w{3,8}$/
    return namePattern.test(name)
}
export const ValidateEmail = (email)=>{
    let emailPattern = /^\w+@[a-z]{2,8}\.[a-z]{2,8}$/
    return emailPattern.test(email)
}

export const ValidatePassword = (pword)=>{
    let passwordPattern = /^[\w.\.#-]{5,15}$/
    return passwordPattern.test(pword)
}

