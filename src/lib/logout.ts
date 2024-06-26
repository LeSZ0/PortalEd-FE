import { userStore } from "./stores/user.store";
import type { Action } from "@sveltejs/kit";


export const action: Action = async ({ cookies }) => {
    userStore.update((state) => ({ ...state, loggedIn: false, accessToken: '' }));
  
    // Clear access_token cookie on the server
    await cookies.delete('accessToken', { maxAge: 0, path: '/' });
    await cookies.delete('refreshToken', { maxAge: 0, path: '/' });
    await cookies.delete('loggedIn', { maxAge: 0, path: '/' });
    
    // Indicate successful logout for client-side handling
    return { success: true };
  }