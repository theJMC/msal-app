import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

import NavBar from '@/components/navbar.js'

export default async function ProfilePage() {
    // Set as Authenticatied Route
    const { data, error } = await createClient().auth.getUser()
    if (error || !data?.user) { redirect("/login") }

    return <>
        <NavBar active={"Profile"} isAuth={"no"}/>
        <div className="container mx-auto w-1/2">
            <h1 className="text-2xl font-bold text-center">Profile</h1>
            <hr></hr>
            <table className="w-full text-l text-left text-gray-500">
                <tbody>
                    <tr className='bg-white border-b'>
                        <th>Email</th>
                        <td>{data.user.email}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
}