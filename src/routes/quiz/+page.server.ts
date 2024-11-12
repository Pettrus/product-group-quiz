import { db } from "$lib/server/db/db";
import { questionsTable, usersTable } from "$lib/server/db/schema";
import { TOTAL_QUESTIONS } from "$lib/util/constants";
import { redirect, type Cookies } from "@sveltejs/kit";
import { eq, notInArray } from "drizzle-orm";

export interface QuestionAnswered {
    questionId: number;
    answer: number;
}

async function getRandomQuestion(idToIgnore: number[] = []) {
    const questionsCount = (await db.select().from(questionsTable).where(notInArray(questionsTable.id, idToIgnore)));

    const shuffledQuestions = questionsCount.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffledQuestions.slice(0, 1);

    return selectedQuestions;
}

async function getUser(cookies: Cookies) {
    const name = cookies.get('name');
    const user = await db.select().from(usersTable).where(eq(usersTable.name, name!));

    return user[0];
}

export async function load({ cookies }) {
    const user = await getUser(cookies);
    const answered = user.questionsAnswered as QuestionAnswered[];

    if (answered.length >= TOTAL_QUESTIONS) {
        return redirect(303, '/results');
    }

    const questions = await getRandomQuestion(answered.map(a => a.questionId));

    return {
        question: questions.map(q => ({
            ...q,
            answer: undefined
        }))[0]
    }
}

export const actions = {
    nextQuestion: async ({ request, cookies }) => {
        const data = await request.formData();
        const id = data.get('id') as any;
        const option = data.get('option') as string;
        const time = parseInt(data.get('time') as string);

        const user = await getUser(cookies);
        const answered = user.questionsAnswered as QuestionAnswered[];

        let correctAnswerPoints: number;
        let fullyAnswered: QuestionAnswered[]

        if (time === 0) {
            correctAnswerPoints = 0;
            fullyAnswered = [...answered, {
                questionId: parseInt(id),
                answer: 10
            }]
        } else {
            const question = (await db.select().from(questionsTable).where(eq(questionsTable.id, id)))[0];
            const qOptions: string[] = JSON.parse(question.options);
            const userAnswer = qOptions.findIndex(o => o === option);
            
            correctAnswerPoints = question.answer === userAnswer ? 2 : 0;
            fullyAnswered = [...answered, {
                questionId: parseInt(id),
                answer: qOptions.findIndex(oq => oq === option)
            }];
        }

        await db.update(usersTable)
            .set({ points: user.points + correctAnswerPoints, questionsAnswered: fullyAnswered, time: user.time + time })
            .where(eq(usersTable.id, user.id));

        if (answered.length + 1 === TOTAL_QUESTIONS) {
            return redirect(303, '/results');
        }

        const nextQuestion = await getRandomQuestion(fullyAnswered.map(fa => fa.questionId));

        return {
            ...nextQuestion,
            answer: undefined
        }
    }
}