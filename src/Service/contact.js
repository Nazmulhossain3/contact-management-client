export async function getAllContact(){
    const res = await fetch('https://contact-management-server-kappa.vercel.app/contact-route/getAllContact')
    return res.json()
}