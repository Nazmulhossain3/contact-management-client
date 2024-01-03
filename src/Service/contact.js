export async function getAllContact(){
    const res = await fetch('http://localhost:3000/contact-route/getAllContact')
    return res.json()
}