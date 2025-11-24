import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
    edit: null,
}

const studentSlice = createSlice(
    {
        name: "studentReducer",
        initialState,
        reducers: {
            addStudent: (state, action) => { 
                state.list.push(action.payload);
            },
            deleteStudent: (state, action) => {
                const maSV = action.payload;
                state.list = state.list.filter((sv) => sv.maSV !== maSV);
            },
            setEdit: (state, action) => { 
                state.edit = action.payload;
            },
            updateStudent: (state, action) => { 
                const up = action.payload;
                const idx = state.list.findIndex((sv) => sv.maSV === up.maSV);
                if (idx !== -1) { 
                    state.list[idx] = up;
                }
                state.edit = null;
            }
        }
    }
)

export const {addStudent, deleteStudent, setEdit, updateStudent } = studentSlice.actions;
export default studentSlice.reducer;