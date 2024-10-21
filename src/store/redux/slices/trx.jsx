import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import trxApi from "../../../services/api/trxApi";

let initialState = {
  wop: localStorage.getItem("wop") ? JSON.parse(localStorage.getItem("wop")) : [],
  paymentStepGuide: localStorage.getItem("wopGuide") ? JSON.parse(localStorage.getItem("wopGuide")) : [],
  trxHistory: localStorage.getItem("trx") ? JSON.parse(localStorage.getItem("trx")) : [],

  selectedWOP: {
    title: "",
    code: "",
    trxType: "",
    va_code: "",
    admin: 0,
    img: "",
    isMaintenance: false,
  },
};

export const getAllWop = createAsyncThunk("trx/getAllWop", async () => {
  const wopData = await trxApi.getAllWopList();
  return wopData;
});

export const getAllTrx = createAsyncThunk("trx/getAllTrx", async () => {
  const trxData = await trxApi.getAllTrxList();
  return trxData;
});

export const addTrx = createAsyncThunk("trx/addTrx", async ({ trxObj }) => {
  const newTrxData = {
    id: trxObj.id,
    email: trxObj.email,
    kelasId: trxObj.kelasId,
    title: trxObj.title,
    trxType: trxObj.trxType,
    wopCode: trxObj.wopCode,
    price: trxObj.price,
    admin: trxObj.admin,
    vaNo: trxObj.vaNo,
  };
  const newTrx = await trxApi.addTrx(newTrxData);
  return newTrx;
});

export const updateTrx = createAsyncThunk("trx/updateTrx", async ({ trxObj }) => {
  const updatedTrx = await trxApi.updateTrx(trxObj);
  return updatedTrx;
});

export const deleteTrx = createAsyncThunk("trx/deleteTrx", async ({ trxObj }) => {
  const deletedTrx = await trxApi.deleteTrx(trxObj);
  return deletedTrx;
});

const trxSlice = createSlice({
  name: "trx",
  initialState,
  reducers: {
    setSelectedWOP: (state, action) => {
      const wopObj = action.payload.wopObj;
      state.selectedWOP = { ...state.selectedWOP, ...wopObj };
    },
    getWOPDetailByCode: (state, action) => {
      const wopCode = action.payload?.code;
      const wops = state.wop;
      for (let i = 0; i < wops.length; i++) {
        for (let j = 0; j < wops[i].sub.length; j++) {
          if (wops[i].sub[j].code == wopCode) {
            state.selectedWOP = { ...state.selectedWOP, ...wops[i].sub[j] };
          }
        }
      }
    },
    resetTrx: (state) => {
      let temp = {
        title: "",
        code: "",
        va_code: "",
        admin: 0,
        img: "",
        isMaintenance: false,
      };
      state.wop = temp;
    },
    getWopGuide: (state, action) => {
      const trxType = action.payload.type;
      const wopGuide = state.wop.find((w) => w.trxType == trxType).guide;
      state.paymentStepGuide = wopGuide;
      localStorage.setItem("wopGuide", JSON.stringify(wopGuide));
    },
    filterTrxByCategory: (state, action) => {
      const filteredTrx = state.trxHistory;
      const category = action.payload.ctg;
      if (category !== "") {
        const temp = filteredTrx.filter((x) => x.status.toLowerCase() == category.toLowerCase());
        state.trxHistory = temp;
      }
    },
    filterTrxByTitle: (state, action) => {
      const filteredTrx = state.trxHistory;
      const title = action.payload.title;
      if (title !== "") {
        const temp = filteredTrx.filter((x) => x.kelasTitle.toLowerCase().includes(title.toLowerCase()));
        state.trxHistory = temp;
      }
    },
    resetFilter: (state) => {
      state.trxHistory = JSON.parse(localStorage.getItem("trx"));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllWop.fulfilled, (state, action) => {
      state.wop = action.payload;
    });
    builder.addCase(getAllTrx.fulfilled, (state, action) => {
      state.trxHistory = action.payload;
    });
    builder.addCase(addTrx.fulfilled, (state, action) => {
      state.trxHistory.push(action.payload);
    });
    builder.addCase(updateTrx.fulfilled, (state, action) => {
      const index = state.trxHistory.findIndex((trx) => trx.id == action.payload.id);
      if (index !== -1) {
        state.trxHistory[index] = {
          ...state.trxHistory[index],
          ...action.payload,
        };
      }
    });
    builder.addCase(deleteTrx.fulfilled, (state, action) => {
      const index = state.trxHistory.findIndex((trx) => trx.id == action.payload.id);
      if (index !== -1) {
        state.trxHistory.splice(index, 1);
      }
    });
  },
});

export const {
  setSelectedWOP,
  getWOPDetailByCode,
  getWopGuide,
  filterTrxByCategory,
  filterTrxByTitle,
  resetFilter,
  resetTrx,
  setIsLoading,
} = trxSlice.actions;
export default trxSlice.reducer;
