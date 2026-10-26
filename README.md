# Nhịp Tập — Gym cá nhân

Website tiếng Việt với lộ trình tăng cơ, giảm mỡ 8 tuần (26/10–20/12/2026), xây dựng bằng HTML, CSS và JavaScript thuần, đăng nhập và đồng bộ qua Supabase.

## Tính năng

- Chọn lịch từ Thứ 2 đến Chủ nhật, có hai ngày nghỉ phục hồi.
- Chuyển giữa tạ đơn / dây cáp và máy cho mỗi buổi tập.
- 26 bộ ảnh động tác, hai tư thế, phóng lớn và tự chuyển ảnh.
- Hướng dẫn kỹ thuật, số hiệp, số lần và cardio cuối buổi.
- Đồng hồ nghỉ, ghi chú, đánh dấu hoàn thành và in lịch tập.
- Bố cục một cột trên điện thoại, có thanh điều hướng phía dưới.
- Lộ trình 8 tuần theo Push / Pull / Legs / Upper / Legs, số hiệp tăng theo giai đoạn.
- Thực đơn mẫu có gà luộc, mốc calo/đạm và hướng dẫn điều chỉnh sau 14 ngày.
- Nhật ký mức tạ, cân trung bình, vòng eo riêng từng tuần.
- Đăng nhập/đăng ký email qua Supabase Auth, đồng bộ và lịch sử 10 phiên bản.
- Xuất/khôi phục file JSON làm bản sao lưu độc lập.

Khi chưa đăng nhập, dữ liệu lưu ở `localStorage`. Sau khi cấu hình database và đăng nhập, dữ liệu được đồng bộ vào tài khoản Supabase riêng. Xem [hướng dẫn kích hoạt Supabase](supabase/SETUP.md); publishable key không tự tạo được bảng.

## Chạy tại máy

Không cần cài thư viện hoặc chạy bước build. Từ thư mục dự án:

```sh
python3 -m http.server 8080
```

Mở [http://localhost:8080](http://localhost:8080).

## Cấu trúc

```text
index.html                 Trang chính
style.css                  Giao diện và responsive
app.js                     Dữ liệu bài tập và hình minh hoạ
program.js                 Quy tắc lộ trình, số hiệp, ngày tháng và dữ liệu
dashboard.js               Giao diện lịch, thực đơn, số đo, sao lưu
sync-core.js               Quy tắc so sánh phiên bản và xử lý xung đột
cloud-sync.js              Đăng nhập Supabase và đồng bộ dữ liệu
supabase-config.js         URL và publishable key cho trình duyệt
supabase/migrations/       SQL tạo bảng, RLS và hàm ghi có kiểm tra phiên bản
assets/gym.jpg             Ảnh phòng gym
assets/exercises/          Ảnh động tác và thông tin nguồn
```

## Kiểm tra

```sh
node --check app.js
npm test
```

Giao diện đã được kiểm tra ở chiều rộng 320, 375, 390 và 430 CSS px, cùng bố cục desktop. `npm test` kiểm tra lịch, bản sao lưu, xung đột dữ liệu và các chính sách trên một PostgreSQL tạm, chỉ mở Unix socket riêng và xóa sau kiểm thử. Cài PostgreSQL để chạy phần kiểm thử database; các bài còn lại chỉ cần Node.js.

## Nguồn hình ảnh

- Ảnh phòng gym: [Unsplash](https://unsplash.com/photos/a-gym-filled-with-lots-of-machines-and-weights-1RNQ11ZODJM).
- 25 bộ ảnh bài tập: [Free Exercise DB](https://github.com/yuhonas/free-exercise-db). Thông tin từng bộ nằm trong `assets/exercises/sources.json`.
- Minh hoạ máy nâng vai ngang: [GymFit](https://gymfitclub.ir/articles/showarticle/205).

Các nguồn hình ảnh thuộc chủ sở hữu tương ứng. Nội dung kỹ thuật và lưu ý tham khảo được dẫn nguồn trong website.
