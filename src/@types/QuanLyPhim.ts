export interface Phim  {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  maNhom: string;
  ngayKhoiChieu: string;
  danhGia: number;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
};

export interface Banner {
  maBanner: number
  maPhim: number
  hinhAnh: string
}

export interface LichChieu {
  maPhim: number
  ngayChieuGioChieu: string
  maRap: string
  giaVe: number
}