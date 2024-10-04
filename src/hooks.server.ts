import { redirect, type Handle } from "@sveltejs/kit";

const public_paths = ['/'];

function isPathAllowed(path: string) {
    return public_paths.some(allowedPath =>
        path === allowedPath || path.startsWith(allowedPath + '/')
    );
}

export const handle: Handle = async ({ event, resolve }) => {
    const url = new URL(event.request.url);

    if (!isPathAllowed(url.pathname) && event.cookies.get('name') == null) {
        throw redirect(302, '/');
    }

    if (url.pathname === '/' && event.cookies.get('name')) {
        return redirect(303, '/quiz');
    }

    const response = await resolve(event);
    
	return response;
}