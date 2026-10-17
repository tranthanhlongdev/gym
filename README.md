# Nhịp Tập — Gym cá nhân

Website tiếng Việt theo dõi lịch tập gym 5 buổi tối trong tuần, xây dựng bằng HTML, CSS và JavaScript thuần.

## Tính năng

- Chọn lịch từ Thứ 2 đến Chủ nhật, có hai ngày nghỉ phục hồi.
- Chuyển giữa tạ đơn / dây cáp và máy cho mỗi buổi tập.
- 24 bộ ảnh động tác, hai tư thế, phóng lớn và tự chuyển ảnh.
- Hướng dẫn kỹ thuật, số hiệp, số lần và cardio cuối buổi.
- Đồng hồ nghỉ, ghi chú, đánh dấu hoàn thành và in lịch tập.
- Bố cục một cột trên điện thoại, có thanh điều hướng phía dưới.

Tiến độ và ghi chú được lưu bằng `localStorage` trên từng trình duyệt, chưa đồng bộ giữa các thiết bị.

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
app.js                     Lịch, hướng dẫn và tương tác
assets/gym.jpg             Ảnh phòng gym
assets/exercises/          Ảnh động tác và thông tin nguồn
```

## Kiểm tra

```sh
node --check app.js
```

Giao diện đã được kiểm tra ở chiều rộng 320, 375, 390 và 430 CSS px, cùng bố cục desktop. Các kiểm tra bao gồm đổi dụng cụ, đổi tư thế ảnh, phóng lớn, điều hướng điện thoại và đánh dấu tiến độ.

## Nguồn hình ảnh

- Ảnh phòng gym: [Unsplash](https://unsplash.com/photos/a-gym-filled-with-lots-of-machines-and-weights-1RNQ11ZODJM).
- 23 bộ ảnh bài tập: [Free Exercise DB](https://github.com/yuhonas/free-exercise-db). Thông tin từng bộ nằm trong `assets/exercises/sources.json`.
- Minh hoạ máy nâng vai ngang: [GymFit](https://gymfitclub.ir/articles/showarticle/205).

Các nguồn hình ảnh thuộc chủ sở hữu tương ứng. Nội dung kỹ thuật và lưu ý tham khảo được dẫn nguồn trong website.
