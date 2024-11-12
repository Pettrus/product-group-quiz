import { db } from '$lib/server/db/db';
import { questionsTable, usersTable } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import { desc, eq, inArray } from 'drizzle-orm';
import type { QuestionAnswered } from '../quiz/+page.server.js';
import { TOTAL_QUESTIONS } from '$lib/util/constants.js';

export async function load({ cookies }) {
    const name = cookies.get('name')!;
    const user = await db.select({
        name: usersTable.name,
        points: usersTable.points,
        questions: usersTable.questionsAnswered
    }).from(usersTable).where(eq(usersTable.name, name));

    if (user.length === 0) {
        throw redirect(302, '/quiz');
    }

    const userQuestions = user[0].questions as QuestionAnswered[];

    if (userQuestions.length < TOTAL_QUESTIONS) {
        throw redirect(302, '/quiz');
    }

    const allUsers = await db
        .select({
            name: usersTable.name,
            points: usersTable.points,
            time: usersTable.time
        })
        .from(usersTable)
        .orderBy(desc(usersTable.points), desc(usersTable.time));

    const questionsDB = await db
        .select({
            id: questionsTable.id,
            question: questionsTable.question,
            options: questionsTable.options,
            answer: questionsTable.answer
        })
        .from(questionsTable)
        .where(inArray(questionsTable.id, userQuestions.map(uq => uq.questionId)));
    
    const questions = questionsDB.map(qDB => ({
        ...qDB,
        userAnswer: userQuestions.find(uq => uq.questionId === qDB.id)?.answer,
        id: undefined
    }));

    return {
        me: user[0],
        allUsers,
        questions
    }
}