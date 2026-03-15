const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();

// Phục vụ giao diện web tĩnh (Lớp 1)
app.use(express.static(path.join(__dirname, 'public')));

// Thiết lập kết nối đến Database (Lớp 3)
const db = mysql.createPool({
  host: 'db', // Tên service của database trong docker-compose
  user: 'root',
  password: 'admin_password_123',
  database: 'QuanLySinhVienDB',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Tạo API xử lý truy vấn điểm
app.get('/api/diem', (req, res) => {
  // Câu lệnh T-SQL kết nối 3 bảng
  const sql = `
    SELECT SV.MaSV, SV.HoTen, MH.TenMH, D.DiemSo
    FROM SINHVIEN SV
    JOIN DIEM D ON SV.MaSV = D.MaSV
    JOIN MONHOC MH ON D.MaMH = MH.MaMH
  `;
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Lỗi truy vấn:", err);
      return res.status(500).json({ error: "Lỗi cơ sở dữ liệu" });
    }
    res.json(results); // Trả dữ liệu về cho trình duyệt
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server ứng dụng đang chạy tại http://localhost:${PORT}`);
});
