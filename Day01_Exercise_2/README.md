# Exercise 2
## 1. Write the function to calculate the combination (Cnk)
## 2. Write the function to get a random integer between 2 numbers: min, max;
## 3. Write the function get a random element from an arrays.
## 4. Given two arrays of integers, find which elements in the second array are missing from the first array.

# Research
## 1. BigInt
BigInt là một kiểu số nguyên với độ chính xác tùy ý (arbitrary-precision) được giới thiệu trong ECMAScript 2020.
Trước khi BigInt ra mắt, JavaScript chỉ có một kiểu số duy nhất là Number giới hạn trong khoảng từ -2^53 + 1 đến 2^53 - 1.
Bất kỳ số nguyên nào vượt quá phạm vi này sẽ mất tính chính xác do cơ chế làm tròn của dấu phẩy động.
Điều này dẫn đến một số lỗi khá lạ trong JavaScript như: console.log(9007199254740992 === 9007199254740993); // true
Do đó, BigInt ra đời để giải quyết các bài toán cần xử lý số nguyên rất lớn hoặc rất nhỏ mà vượt quá giới hạn này. 

Cách sử dụng BigInt (Literal và Constructor)
Có hai cách để tạo ra một giá trị BigInt: 
- Literal BigInt: Thêm ký tự n vào sau một số nguyên để tạo BigInt. Ví dụ: `const a = 9007199254740993n;`. Ngoài ra, Literal BigInt cũng hỗ trợ các hệ cơ số khác như nhị phân, bát phân, thập lục phân bằng cách thêm n vào cuối cùng.
- Hàm BigInt(): Dùng để chuyển đổi một giá trị thành BigInt. Hàm này có thể nhận vào một số nguyên kiểu Number hoặc String biểu diễn số nguyên. Ví dụ: BigInt(789), hoặc BigInt("789") trả về 789n.
Lưu ý: Mặc dù BigInt() nhìn khá giống constructor nhưng lại không được dùng new. Bơi vì BigInt là primitive nên việc new BigInt(5) sẽ gây lỗi TypeError.

Các toán tử hỗ trợ: BigInt sử dụng được hầu hết các toán tử mà Number dùng được trừ dấu + đơn nguyên (+x) và dịch phải không dấu (>>>).
Khi thực hiện phép chia / thì BigInt chỉ lấy phần nguyên. Ví dụ: 5n / 2n cho kết quả 2n (thay vì 2.5).
Không được phép trộn lẫn BigInt với Number trong biểu thức trừ trường hợp so sánh (<, <=, >, >=) và logic (&&, ||, !)
Ngoài ra, BigInt cũng không hỗ trợ hàm Math và JSON.stringify

Các trường hợp sử dụng BigInt:
- Xử lý số nguyên lớn
- Tài chính và xử lý tiền tệ
- Mã hoá
- Xử lý ID và các dữ liệu 64-bit
## 2. IEEE 754
JavaScript dùng IEEE 754 (64-bit, double-precision) cho mọi kiểu Number.
64 bit chia làm 3 phần:
- 1 bit dấu (sign)
- 11 bit mũ (exponent)
- 52 bit định trị (fraction)
Không phải mọi số thập phân đều có thể biểu diễn chính xác được.
Ví dụ: 0.1 và 0.2 là vô hạn tuần hoàn trong nhị phân. Dẫn đến sai số: 0.1 + 0.2 === 0.3 // 0.299999 === 0.3 => false
## 3. Destructure with object in object
Khi destructure nếu thay đổi thay đổi giá trị ở tầng đầu thì giá trị object gốc vẫn không thay đổi, ví dụ:
const obj = { name: "Hau", age: 25 };
const { name } = obj;
name = "Hau ne";
console.log(obj.name); // "Hau" 

Tuy nhiên, nếu thay đổi giá trị ở tầng sâu hơn thì giá trị của object gốc sẽ bị thay đổi, ví dụ:
const obj = {
  name: "Hau",
  age: 25,
  address: {
    city: "HCM",
    zip: 1000
  }
};
const { address } = obj;
address.city = "Ha Noi";
console.log(obj.address.city); // "Ha Noi"

Để tránh việc bị ảnh hưởng có thể dùng clone