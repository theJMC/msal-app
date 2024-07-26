import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export default async function logout() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
        console.log('Error logging out:', error.message)
        try { 
            redirect("/error")
        } catch {}
    } 
    redirect("/")
}