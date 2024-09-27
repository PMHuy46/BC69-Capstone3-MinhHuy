import dayjs from "dayjs";
import { z } from "zod";

export const CreateShowTime = z.object({
    heThongRap: z.string({ message: "Chọn hệ thống rạp" }),
    maRap: z.string({ message: "Chọn rạp chiếu" }),
    ngayChieuGioChieu: z.any().refine(value => value !== null && value !== undefined, { message: 'Chưa chọn thời gian chiếu' }).transform(data => (dayjs(data).format('DD/MM/YYYY HH:mm:ss'))),
    giaVe: z.string({ message: "Nhập giá vé" }).regex(/^(75|76|77|78|79|8\d|9\d{2}|1\d{5}|200000)$|^(7[5-9]\d{3}|8[0-9]\d{4}|9[0-9]{4}|1[0-9]{5}|200000)$/ ,{message:"Nhập giá trong khoảng 75k đến 200k"})
});

export type CreateShowTimeType = z.infer<typeof CreateShowTime>;