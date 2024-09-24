type HttpResponse<T>={
    statusCode: number
    message:string
    content:T
}

// định nghĩa kiểu dữ liệu trả về khi gọi API