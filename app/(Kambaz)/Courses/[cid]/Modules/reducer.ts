import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { modules as dbModules } from "../../../Database"; // your default modules

interface Lesson {
  _id: string;
  name: string;
}

interface Module {
  _id: string;
  name: string;
  course: string;
  lessons?: Lesson[];
  editing?: boolean;
}

interface ModulesState {
  modules: Module[];
}

// Load saved modules from localStorage
const savedModules =
  typeof window !== "undefined" ? localStorage.getItem("modules") : null;

// Merge dbModules with savedModules so default modules are not lost
const initialState: ModulesState = {
  modules: savedModules
    ? [...(dbModules as Module[]), ...JSON.parse(savedModules)].filter(
        (v, i, a) => a.findIndex((t) => t._id === v._id) === i
      )
    : (dbModules as Module[]),
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    addModule: (
      state,
      action: PayloadAction<{ name: string; course: string }>
    ) => {
      const newModule: Module = {
        _id: uuidv4(),
        name: action.payload.name,
        course: action.payload.course,
        lessons: [],
        editing: false,
      };
      state.modules.push(newModule);
      localStorage.setItem("modules", JSON.stringify(state.modules));
    },

    deleteModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.filter((m) => m._id !== action.payload);
      localStorage.setItem("modules", JSON.stringify(state.modules));
    },

    updateModule: (state, action: PayloadAction<Module>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload._id ? action.payload : m
      );
      localStorage.setItem("modules", JSON.stringify(state.modules));
    },

    editModule: (state, action: PayloadAction<string>) => {
      state.modules = state.modules.map((m) =>
        m._id === action.payload ? { ...m, editing: true } : m
      );
      localStorage.setItem("modules", JSON.stringify(state.modules));
    },
  },
});

export const { addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;

export default modulesSlice.reducer;
