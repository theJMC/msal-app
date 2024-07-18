


document.addEventListener("DOMContentLoaded", async () => {
    const SB_client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

    const { data: { user }} = await SB_client.auth.getUser()
    if (!user) {
        window.location.href = "/"
    }

    for (let element of document.getElementsByClassName("username")) {
        element.innerText = user.email
    }
    console.log(user)
});