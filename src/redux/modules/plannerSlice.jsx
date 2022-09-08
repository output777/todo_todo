import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const __getTodos = createAsyncThunk(
  "getTodos",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get("http://localhost:3001/todos");
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postTodos = createAsyncThunk("postTodos", async (newTodos) => {
  const data = await axios.post("http://localhost:3001/todos", newTodos);
  return data.data;
});

export const __deleteTodos = createAsyncThunk(
  "deleteTodos",
  async (payload, thunkAPI) => {
    await axios.delete(`http://localhost:3001/todos/${payload}`);
    return payload;
  }
);

export const __updateTodos = createAsyncThunk(
  "patchTodos",
  async (payload, thunkAPI) => {
    try {
      console.log("payload", payload);
      const data = await axios.patch(
        `http://localhost:3001/${payload.id}`,
        payload
      );

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  todos: [],
  isLoading: false,
  error: null,
};

export const PlannerSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    [__getTodos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [__getTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getTodos.pending]: (state) => {
      state.isLoading = true;
    },
    [__postTodos.pending]: (state) => {
      state.isSuccess = false;
      state.isLoading = true;
    },
    [__postTodos.fulfilled]: (state, action) => {
      state.isSuccess = true;
      state.isLoading = false;
      state.todos.push(action.payload);
    },
    [__postTodos.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },

    [__deleteTodos.fulfilled]: (state, action) => {
      const target = state.todos.findIndex(
        (comment) => comment.id === action.payload
      );

      state.todos.splice(target, 1);
    },
    [__deleteTodos.rejected]: () => {},
    [__deleteTodos.pending]: () => {},
  },
});

export default PlannerSlice.reducer;
