# Kích hoạt database Supabase cho Nhịp Tập

Website: https://tranthanhlongdev.github.io/gym/

Dự án: https://supabase.com/dashboard/project/fjchymkicentjetfljhp

## 1. Tạo bảng, RLS và hàm đồng bộ

Trong **SQL Editor**, chạy toàn bộ file:

[`migrations/202610260001_private_gym_sync.sql`](migrations/202610260001_private_gym_sync.sql)

File tạo:

- `gym_states`: một nhật ký riêng cho mỗi tài khoản.
- `gym_state_backups`: tối đa 10 phiên bản cũ của từng tài khoản.
- `save_gym_state`: ghi có kiểm tra phiên bản, ngăn hai thiết bị âm thầm ghi đè nhau.

Người chưa đăng nhập không đọc/ghi được hai bảng. Người đăng nhập chỉ đọc bản thuộc `auth.uid()` của mình. Ứng dụng ghi qua hàm RPC; không có quyền sửa bảng trực tiếp. Không tắt RLS và không thêm service-role/secret key vào mã website.

Migration đã được kiểm thử với PostgreSQL cục bộ, bao gồm quyền truy cập giữa hai tài khoản, xung đột phiên bản và giới hạn bản sao lưu. Cần chạy trên dự án Supabase thật để kích hoạt dịch vụ.

## 2. Cấu hình email và đường dẫn xác nhận

Trong **Authentication → URL Configuration**:

- **Site URL:** `https://tranthanhlongdev.github.io/gym/`
- **Redirect URLs:** thêm `https://tranthanhlongdev.github.io/gym/`

Giữ **Email provider** và **Confirm email** được bật. Nếu dịch vụ email mặc định giới hạn người nhận, cấu hình SMTP của bạn trong Supabase; không tắt xác nhận chỉ để bỏ qua lỗi gửi thư.

## 3. Kiểm tra sau khi thiết lập

1. Mở website, chọn **Đăng nhập / Đăng ký**.
2. Đăng ký bằng email của bạn, mở email xác nhận, rồi đăng nhập.
3. Chọn gửi bản hiện tại ở máy lên nếu được hỏi; có thể tải file sao lưu trước.
4. Sửa một ghi chú và chờ trạng thái **Đã đồng bộ với Supabase**.
5. Mở website trên thiết bị khác, đăng nhập cùng tài khoản và kiểm tra ghi chú.
6. Thử đăng xuất: nhật ký của tài khoản không tiếp tục hiện trong chế độ chưa đăng nhập.

Dữ liệu chưa đăng nhập chỉ lưu ở trình duyệt. Sau khi đăng nhập, việc xóa dữ liệu trình duyệt không xóa bản đã đồng bộ trên Supabase; cần đăng nhập lại để tải về. File sao lưu vẫn nên được giữ ở nơi riêng tư.

## Cấu hình trình duyệt

`supabase-config.js` chứa URL và publishable key mà ứng dụng được phép công khai. Website là HTML/JS tĩnh; không cần Next.js hoặc backend riêng để đọc các biến `NEXT_PUBLIC_*`.

Supabase SDK 2.118.0 được đóng kèm trong `vendor/` cùng giấy phép MIT, không cần tải mã đăng nhập từ CDN lúc chạy.
