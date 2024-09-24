import { z } from "zod";

export const RegisterSchema = z.object({
    taiKhoan: z.string(// giống như validation empty
        { message: 'Vui lòng nhập thông tin tài khoản' }
    ),//.optional()nếu là thuộc tính không bắt buộc nhập
    matKhau: z.string(
        { message: 'Nhập mật khẩu' }
    ),
    email: z.string(
        { message: 'Nhập Email' }
    ).email({ message: 'vui lòng nhập đúng định dạng' }),// validation đúng định dạng email
    soDt: z.string(
        { message: 'Nhập số điện thoại' }
        
    ),
    maNhom: z.string(
        { message: 'Nhập mã nhóm' }
    ),
    hoTen: z.string(
        { message: 'Nhập họ tên' }
    ),
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>