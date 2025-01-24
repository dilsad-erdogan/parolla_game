import { configureStore } from "@reduxjs/toolkit";
import questionSlice from "./questionSlice";

const store = configureStore({
    reducer: {
        question: questionSlice
    }
});

export default store;