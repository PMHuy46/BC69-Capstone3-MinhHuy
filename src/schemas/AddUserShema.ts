import { z } from "zod"
import { RegisterSchema } from "./RegisterSchema"
import { message } from "antd"

const LoaiUser = z.object({
    maLoaiNguoiDung: z.enum(['KhachHang', 'QuanTri'],{message:'Chọn loại người dùng'})
})

export const AddUserSchema = RegisterSchema.merge(LoaiUser)

export type AddUserSchemaType = z.infer<typeof AddUserSchema>