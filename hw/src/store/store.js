import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../student/slide/slide.js"

const store = configureStore({
    reducer: {
        students: studentReducer,
    }
})

export default store;