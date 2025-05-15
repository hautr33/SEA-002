# Day 07 & 08: Task Management | 14 & 15/05/2025

Xây dựng một ứng dụng quản lý task và áp dụng các kiến thức đã học trong ngày.

## Chức năng
1. Xem task board (To Do, In Progress, Done)
2. GUI Kéo thả để chuyển trạng thái task. Tô màu các story, tag, priority để dễ phân biệt.
3. Tìm task theo nhiều option (name, tag, priority, owner, story)
4. Thêm task mới
5. Chỉnh sửa thông tin task
6. Xóa task

## Các kiến thức đã được áp dụng
1. Class
* Access Modifiers
* Constructor
* Static Members
2. Decorator
* Class Decorator
3. Module
* ES Module (ESM)
* Named Export & Import
4. Namespace

## Cấu hình và chạy ứng dụng
**1. Cài đặt TypeScript và Dependencies**
* better-sqlite3
* ejs
* express
* nodemon
* ts-node
* typescript
```bash
npm install i --save-dev @types/better-sqlite3 @types/ejs @types/express better-sqlite3 ejs express nodemon ts-node typescript
```

**2. Chạy ứng dụng**
Vào thư mục Day07_Task_Management, chạy:
```bash
npm run dev
```

http://localhost:3000