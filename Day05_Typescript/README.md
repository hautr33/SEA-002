# Day 05 & 06: Library | 12 & 13/05/2025

Xây dựng một ứng dụng quản lý thư viện sử dụng TypeScript và áp dụng các kiến thức đã học trong ngày.

## Chức năng
**Phân quyền:**  Guest, Student, Manager
* **Guest**
  1. Xem danh sách sách
  2. Đăng nhập
* **Student**
  1. Tìm sách theo tên sách, tên tác giả hoặc tên thể loại
  2. Xem danh sách sách đã 
  3. Mượn sách mới
  4. Trả sách
  5. Đăng xuất
* **Manager**
  1. Thêm sách mới
  2. Xem danh sách sách
  3. Tìm sách theo tên sách, tên tác giả hoặc tên thể loại
  4. Cập nhật trạng thái sách (Available, Lost)
  5. Xoá sách

## Các kiến thức đã được áp dụng
1. Type Annotation
2. Union Type
3. Intersection Type
4. Generic Type
5. Type Guard
6. Function Type
7. Type Assertion
8. Interface

## Cấu hình và chạy ứng dụng
**1. Cài đặt TypeScript và Dependencies**
```bash
npm install typescript ts-node bcrypt
```

**2. Chạy ứng dụng**
```bash
npx ts-node src/index.ts
```

**3. Phân quyền**
* **Manager**
  * username: manager
  * password: 12345678
* **Student**
  * username: student
  * password: 12345678