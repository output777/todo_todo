import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const accessToken = localStorage.getItem("accessToken");
const config = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  },
};

export const __getTodo = createAsyncThunk(
  "todo/getTodo",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.get(
        `${BASE_URL}/todo/?date=${moment(payload).format("YYYY-MM-DD")}`,
        config
      );
      console.log("data", data.data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postTodo = createAsyncThunk(
  "todo/postTodo",
  async (payload, thunkAPI) => {
    try {
      const data = await axios.post(`${BASE_URL}/todo`, payload, config);
      console.log(data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async (payload, thunkAPI) => {
    try {
      console.log("payload", payload);
      const data = await axios.put(
        `${BASE_URL}/todo/${payload.todoId}`,
        payload,
        config
      );

      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.delete(
        `${BASE_URL}/todo/${payload}`,
        config
      );
      console.log("data", data);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __completeTodo = createAsyncThunk(
  "todo/completeTodo",
  async (payload, thunkAPI) => {
    try {
      console.log("payload", payload);
      const data = await axios.put(
        `${BASE_URL}/todo/${payload.todoId}`,
        payload,
        config
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

export const plannerSlice = createSlice({
  name: "planner",
  initialState,
  reducers: {},
  extraReducers: {
    // __getTodo
    [__getTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__getTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [__getTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // __postTodo
    [__postTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__postTodo.fulfilled]: (state, action) => {
      state.todos = [...state.todos, action.payload];
    },
    [__postTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // __updateTodo
    [__updateTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateTodo.fulfilled]: (state, action) => {
      console.log("action", action);
      state.isLoading = false;
      state.todos = state.todos.map((todo) => {
        // 코드 변경했는데 작동하는지 확인하기
        if (todo.todoId === action.meta.arg.todoId) {
          todo.content = action.meta.arg.content;
          console.log(todo.todoId);
          // return { ...todo, complete: action.payload.complete };
        }
        return todo;
      });
    },
    [__updateTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      console.log(state);
    },
    // __deleteTodo
    [__deleteTodo.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__deleteTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.filter(
        (item) => item.todoId !== Number(action.payload)
      );
    },
    [__deleteTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    // __completeTodo
    [__completeTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__completeTodo.fulfilled]: (state, action) => {
      console.log(typeof action.meta.arg.todoId, action.meta.arg);
      state.isLoading = false;
      state.todos = state.todos.map((todo) => {
        // 코드 변경했는데 작동하는지 확인하기
        if (todo.todoId === action.meta.arg.todoId) {
          todo.complete = action.meta.arg.isComplete;
          console.log(todo.complete);
          // return { ...todo, complete: action.payload.complete };
        }
        return todo;
      });
    },
    [__completeTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default plannerSlice.reducer;
