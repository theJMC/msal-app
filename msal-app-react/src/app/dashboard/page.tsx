import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

import NavBar from '@/components/navbar.js'

export default async function ProfilePage() {
    // Set as Authenticatied Route
    const { data, error } = await createClient().auth.getUser()
    if (error || !data?.user) { redirect("/login") }

    return <>
        <NavBar active={"Dashboard"} isAuth={"yes"}/>
        <div className="container mx-auto w-1/2">
            <h1 className="text-2xl font-bold text-center">Dashboard</h1>
            <hr></hr>
            <p>This is the Dashboard</p>
        </div>
    </>
}