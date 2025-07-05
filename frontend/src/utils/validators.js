// Kiểm tra định dạng email: phải có ký tự trước và sau @ và có dấu chấm sau @
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

// Kiểm tra password: chỉ gồm chữ cái và số, tối thiểu 8 ký tự
export function isValidPassword(password) {
  const passwordRegex = /^[A-Za-z0-9]{8,}$/;
  return passwordRegex.test(password);
}

// Kiểm tra số điện thoại: chỉ 10 chữ số
export function isValidPhoneNumber(phone) {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone.trim());
}

// Kiểm tra không rỗng
export function isNotEmpty(value) {
  return typeof value === 'string' && value.trim() !== '';
}

// Kiểm tra mật khẩu trùng khớp
export function doPasswordsMatch(pw1, pw2) {
  return pw1 === pw2;
}
