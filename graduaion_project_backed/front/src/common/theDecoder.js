export const decoder = (token) => {
    const theUser = JSON.parse(atob(token.split(".")[1]))
    const name = theUser["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
    const role = theUser["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
    const id = theUser["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    return { name, role, id }
}