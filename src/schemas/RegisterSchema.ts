import { z } from "zod";

export const RegisterSchema = z.object({
    taiKhoan: z.string(
        { message: 'Vui lòng nhập thông tin tài khoản' }
    ),
    matKhau: z.string(
        { message: 'Nhập mật khẩu' }
    ),
    email: z.string(
        { message: 'Nhập Email' }
    ).email({ message: 'vui lòng nhập đúng định dạng' }),
    soDt: z.string(
        { message: 'Nhập số điện thoại' }
    ),
    maNhom: z.string(
        { message: 'Nhập mã nhóm' }
    ).regex(/^GP(0[0-5]|1[1-9])$/, { message: 'Chỉ nhập số từ GP01 đến 15' }),
    hoTen: z.string(
        { message: 'Nhập họ tên' }
    ),
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>