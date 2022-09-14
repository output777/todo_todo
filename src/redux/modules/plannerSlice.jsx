import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const __getTodo = createAsyncThunk(
  "todo/getTodo",
  async (payload, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const data = await axios.get(`http://13.125.241.100/api/todo`, config);
      console.log("data", data);
      return thunkAPI.fulfillWithValue(data.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __postTodo = createAsyncThunk(
  "todo/postTodo",
  async (newTodo, thunkAPI) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const data = await axios.post(
        "http://13.125.241.100/api/todo",
        newTodo,
        config
      );
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
      const data = await axios.patch(
        `http://13.125.241.100/api/todo/${payload.id}`,
        payload
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
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const { data } = await axios.delete(
        `http://13.125.241.100/api/todo/${payload}`,
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
      const accessToken = localStorage.getItem("accessToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const { data } = await axios.put(
        `http://13.125.241.100/api/todo/${payload.todoId}`,
        payload,
        config
      );
      console.log("data", data);
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const __completeTodo = createAsyncThunk(
//   "todo/completeTodo",
//   async (payload, thunkAPI) => {
//     try {
//       console.log("payload", payload);
//       const data = await axios.patch(
//         `http://13.125.241.100/api/${payload.id}`,
//         payload
//       );

//       return thunkAPI.fulfillWithValue(data.data);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error);
//     }
//   }
// );
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
    [__postTodo.fulfilled]: (state, action) => {
      state.todos = [...state.todos, action.payload];
    },
    [__updateTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__updateTodo.fulfilled]: (state, action) => {
      console.log("action", action);
      state.isLoading = false;
      state.worries = [action.payload];
    },
    [__updateTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteTodo.pending]: (state, action) => {
      state.isLoading = true;
    },
    [__deleteTodo.fulfilled]: (state, action) => {
      state.isLoading = false;
      console.log("action", typeof action.payload);
      state.todos = state.todos.filter(
        (item) => item.todoId !== Number(action.payload)
      );
    },
    [__deleteTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__completeTodo.pending]: (state) => {
      state.isLoading = true;
    },
    [__completeTodo.fulfilled]: (state, action) => {
      console.log("action", action);
      state.isLoading = false;
      state.todos = state.todos.map((todo) => {
        if (todo.todoId === Number(action.payload)) {
          return { ...todo, isComplete: action.payload.isComplete };
        } else {
          return todo;
        }
      });
    },
    [__completeTodo.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default plannerSlice.reducer;
