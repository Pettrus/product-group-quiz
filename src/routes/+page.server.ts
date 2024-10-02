import { PIN_CODE } from '$env/static/private';
import { error, fail, redirect } from '@sveltejs/kit';

export const actions = {
	login: async ({ request }) => {
		const data = await request.formData();
		const pin = data.get('pin');

		if (pin === PIN_CODE) {
			redirect(303, '/quiz');

			return true;
		}

		return fail(401, { incorrect: true });
	}
}