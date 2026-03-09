'use server';

import { redirect } from 'next/navigation';

export async function handleAdminLogin(formData: FormData) {
    const role = formData.get('role');

    // This is a mock login. In a real app, you'd validate credentials.
    if (role === 'admin') {
        redirect('/admin');
    } else if (role === 'vendor') {
        redirect('/vendor-dashboard');
    } else {
        // Redirect back with an error if role is invalid, though this shouldn't happen with the select dropdown.
        redirect('/auth/admin?error=invalid_role');
    }
}
