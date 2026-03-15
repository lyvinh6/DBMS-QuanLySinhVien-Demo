Student Management Demo 

🚀 Giới thiệu

Trong các trường đại học với quy mô hơn 20.000 sinh viên, việc lưu trữ bằng file Excel/Word cho từng phòng ban thường dẫn đến tình trạng dư thừa dữ liệu (thông tin nhập nhiều lần) và truy xuất rất khó khăn.
Demo này cung cấp một mô hình dữ liệu quan hệ (Relational Data Model) thông qua các bảng được thiết kế chuẩn hóa:
Mức logic (Logical Level): Tổ chức dữ liệu thành các bảng KHOA, LOP, SINHVIEN, MONHOC, DIEM liên kết với nhau bằng Khóa ngoại (Foreign Key).
Mức vật lý & Kiến trúc 3 lớp (3-tier): Sử dụng Docker để đóng gói Database Server (Lớp 3) chạy độc lập, giúp hệ thống ổn định và bảo mật.

🛠 Công nghệ sử dụng

Database: MySQL 8.0
Ngôn ngữ truy vấn: T-SQL (Data Definition & Data Manipulation) 
Tools: Docker, Docker Compose

🏃 Cách chạy dự án (Khuyên dùng Docker)

Yêu cầu
Đã cài đặt Docker Desktop.
Cài đặt một công cụ quản trị CSDL bất kỳ (DBeaver, MySQL Workbench, DataGrip) hoặc dùng Terminal.
Các bước thực hiện
Mở terminal tại thư mục gốc của dự án.
Khởi động dịch vụ Database Server:
Bash
docker-compose up -d
Lúc này hệ thống sẽ tự động tạo CSDL QuanLySinhVienDB, tự động tạo các bảng và chèn dữ liệu mẫu.

Kết nối vào hệ thống (thông qua DBeaver/Workbench) với thông tin:
Host: localhost
Port: 3306
User: root
Password: admin_password_123

🧪 Kịch bản thử nghiệm

1. Thử nghiệm tính nhất quán dữ liệu (Data Consistency)
Kịch bản: Sửa tên một sinh viên (ví dụ: "Nguyễn Văn A" thành "Nguyễn Văn Anh") trong bảng SINHVIEN.
Kết quả: Vì điểm số ở bảng DIEM được liên kết qua MaSV (Khóa ngoại) thay vì lưu trực tiếp tên, nên phòng đào tạo khi truy xuất bảng điểm tự động thấy tên mới được cập nhật. Hoàn toàn không bị tình trạng "không nhất quán" như dùng file Excel.
2. Thử nghiệm bộ xử lý truy vấn (Query Processing)
Kịch bản: Chạy câu lệnh SELECT kết hợp JOIN 3 bảng (SINHVIEN, DIEM, MONHOC) để lấy ra bảng điểm chi tiết của sinh viên.
Kết quả: DBMS tự động dò tìm và kết nối dữ liệu từ các bảng khác nhau, trả về View mức ngoài (External View) nhanh chóng thay vì phải dò tìm thủ công qua hàng ngàn dòng hồ sơ giấy.

### 📂 Cấu trúc dự án (Kiến trúc 3-tier)

Dự án được tổ chức theo đúng chuẩn mô hình Kiến trúc 3 lớp (3-tier) trong Hệ quản trị CSDL:

```text
DBMS-QuanLySinhVien-Demo/
├── public/
│   └── index.html         
├── Dockerfile             
├── docker-compose.yml     
├── init.sql               
├── package.json           
├── README.md              
└── server.js              

