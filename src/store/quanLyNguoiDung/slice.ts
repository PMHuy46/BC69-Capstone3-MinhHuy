import { createSlice } from "@reduxjs/toolkit";
import { quanLyNguoiDungThunks } from "./thunk";
import { DanhSachGhe, DanhSachVe,  LoginAPIResponse } from "../../@types";
import { storage } from "../../utils";
import { localStorageKey } from "../../constants";
import { RegisterSchemaType } from "../../schemas";

type InitialState = {
    isLoadingRegister: boolean,
    userRegister?: RegisterSchemaType,
    user: LoginAPIResponse | null,
    maLichChieu: string,
    danhSachGheDangChon: DanhSachGhe[]
    danhSachGheDat: DanhSachVe[]
}

const initialState: InitialState = {
    isLoadingRegister: false,
    userRegister: undefined,
    user: storage(localStorageKey.USER),
    maLichChieu: '',
    danhSachGheDangChon: [],
    danhSachGheDat: [],
}

const { dangKy } = quanLyNguoiDungThunks

export const { reducer: quanLyNguoiDungReducer, actions: quanLyNguoiDungActions } = createSlice({
    name: 'quanLyNguoiDung',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user = payload
            localStorage.setItem(localStorageKey.USER, JSON.stringify(payload))
        },
       
        logOut: (state) => {
            state.user = null
            localStorage.removeItem(localStorageKey.USER)
        },
        setMaLichChieu: (state, { payload }) => {
            state.maLichChieu = payload
        },
        chooseToCheck: (state, { payload }) => {
            const check = state.danhSachGheDangChon.findIndex(item => item.maGhe === payload.maGhe)
            if (check == -1) {
                state.danhSachGheDangChon.push(payload),
                state.danhSachGheDat.push({ maGhe:payload.maGhe, giaVe:payload.giaVe })
            }
        },
        deleteChoose: (state, { payload }) => {
            state.danhSachGheDangChon = state.danhSachGheDangChon.filter(item => item.maGhe != payload)
        },
        acceptChoose: (state) => {
            state.danhSachGheDat = []
            state.danhSachGheDangChon=[]
        }

    },
    extraReducers(builder) {
        builder
            .addCase(dangKy.pending, (state) => {
                state.isLoadingRegister = true
            })
            .addCase(dangKy.fulfilled, (state, { payload }) => {
                state.isLoadingRegister = false
                state.userRegister = payload
            })
            .addCase(dangKy.rejected, (state) => {
                state.isLoadingRegister = false
            })
    }
})