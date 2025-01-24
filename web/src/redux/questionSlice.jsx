import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questions: [],
};

const questions = createSlice({
    name: 'question',
    initialState,
    reducers: {
        fetchQuestions(state, action) {
            state.questions = action.payload;
        },
    }
});

export const { fetchQuestions } = questions.actions;
export default questions.reducer;