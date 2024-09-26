import { message } from "antd"
import dayjs from "dayjs"
import { any, number, object, z } from "zod"


export const AddFilmSchema = z.object({
    maNhom: z.string({ message: 'chưa nhập mã nhóm' }).regex(/^GP(0[0-5]|1[1-9])$/, { message: 'Chỉ nhập số từ GP01 đến 15' }),
    tenPhim: z.string({ message: 'Vui lòng nhập tên phim' }),
    trailer: z.string({ message: 'Vui lòng đường dẫn' }).regex(/^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/, { message: 'kiểm tra lại đường dẫn' }),
    moTa: z.string({ message: 'Vui lòng mô tả' }),
    dangChieu: z.boolean({ message: "chọn ngày khởi chiếu" }).optional(),
    sapChieu: z.boolean({ message: "chọn ngày khởi chiếu" }).optional(),
    hot: z.boolean({ message: "chọn ngày khởi chiếu" }).optional(),
    danhGia: z.string({ message: 'Nhập số sao' }),
    ngayKhoiChieu: z.any({ message: 'aaaa' }).refine(value => value !== null && value !== undefined, { message: 'Trường này không được để trống' }).transform(data => (dayjs(data).format('DD/MM/YYYY'))),
    File: z.any().refine(value => value !== null && value !== undefined, { message: 'Trường này không được để trống' }),

})

export type AddFilmSchemaType = z.infer<typeof AddFilmSchema>