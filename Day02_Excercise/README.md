# Day 02 Exercise
## Exercise 1
1. Write a function to format money string: Example: 10000000 => “10,000,000" || 123456 => “123,456" || 12000.02 => "12,000.02"
2. Write a function for format money in shorten (1000 => 1K, 1123400000 => 1.12B , 1342222 => 1.34M)
3. Write the function to count how many words appear in a string (oneTwoThree => 3)
4. Write the function get the get the Extension of file: “image.png” => “png”. “Sound.mp3” => “mp3”
## Student Management System 
Build A Student Management Application With The Following Features:
1. Store Student Information (Id, Name, Age, Grade)
2. Display The List Of Students
3. Add New Students To The List
4. Search For Students By Name
5. Display Statistics:
- Total Number Of Students
- Average Grade Of All Students
- Number Of Students By Classification: Excellent (≥ 8), Good (≥ 6.5), Average (< 6.5)
6. Save The Student List To A File (JSON)
7. Load The Student List From File On Startup
The Application Should Have A Command-Line Interface That Allows Users To Select Functions Through An Interactive Menu.
## Competition Team Management (Tổ chức đội thi đấu)
### Một đội vận động viên có 40 người:
- 1 người là thành viên chủ lực 
- 5 người là đội nòng cốt 
- 5 người là đội dự bị 
- 29 người còn lại là thành viên thường

### Yêu cầu:
1. Tìm tất cả các cách chọn 3 người thỏa mãn:
- Bắt buộc phải có thành viên chủ lực
- Phải có ít nhất 1 người từ đội nòng cốt
- Người còn lại phải là người từ đội dự bị

2. Các ràng buộc bổ sung:
- Trong đội có những cặp bài trùng HLV muốn những người này phải chơi cùng nhau, nhưng có những cặp thì không thể chơi cùng nhau nên ko thể ghép vào 1 đội.
- thêm những ràng buộc này trong quá trình chọn đội. 
- HLV có thể thay đổi những điều kiện này trước khi sắp xếp đội hình