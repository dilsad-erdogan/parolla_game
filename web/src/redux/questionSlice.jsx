import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questions: [],
    currentQuestionIndex: 0,
    isCorrect: [],
};

const questions = createSlice({
    name: 'question',
    initialState,
    reducers: {
        fetchQuestions(state, action) {
            state.questions = action.payload;
            state.currentQuestionIndex = 0;
            state.isCorrect = [];
        },
        answerQuestion(state, action) {
            const { isCorrect } = action.payload;
            state.isCorrect.push(isCorrect);
            state.currentQuestionIndex += 1;
        },
    },
});

export const { fetchQuestions, answerQuestion } = questions.actions;
export default questions.reducer;