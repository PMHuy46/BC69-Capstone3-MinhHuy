import { createAsyncThunk } from "@reduxjs/toolkit";
import { RegisterSchemaType } from "../../schemas/RegisterSchema";
import { sleep } from "../../utils";
import { quanLyNguoiDungServices } from "../../services";

const dangKy = createAsyncThunk(
    "quanLyNguoiDung/dangKy",
    async (payload: RegisterSchemaType, { rejectWithValue }) => {
        try {
            await sleep(2000)
            const result = await quanLyNguoiDungServices.dangKy(payload)
            return result.data.content
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const quanLyNguoiDungThunks = { dangKy };


