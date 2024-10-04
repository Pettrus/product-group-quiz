import { PIN_CODE } from '$env/static/private';
import { db } from '$lib/server/db/db.js';
import { usersTable } from '$lib/server/db/schema.js';
import { error, fail, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const actions = {
	login: async ({ request, cookies }) => {
		const data = await request.formData();
		const pin = data.get('pin');
		const name = data.get('name') as string;

		if (pin === PIN_CODE) {
			cookies.set('name', name, { path: '/' });
			const userWithName = await db.select().from(usersTable).where(eq(usersTable.name, name));

			if (userWithName.length === 0) {
				await db.insert(usersTable).values({ name, points: 0, questionsAnswered: [] });
			}

			return redirect(303, '/quiz');
		}

		return fail(401, { incorrect: true });
	}
}