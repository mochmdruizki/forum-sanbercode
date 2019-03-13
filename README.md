# forum-sanbercode

Tugas akhir pelatihan intensif nodejs Sanbercode.

## Directions
Buatlah sebuah aplikasi REST-API menggunakan expressJS dan Sequelize ORM. Pedoman pembuatan aplikasi bisa dilihat di dokumentasi https://testsanbercode.docs.apiary.io .

Terdapat beberapa fitur dengan ketentuan sebagai berikut: 
1. Register
Register user baru dengan memasukkan nama, email dan password. Response balikan dari server adalah user baru yang password nya sudah dienkripsi (hashed password).
2. Login
User dapat login untuk mendapatkan access token. access token tersebut akan dipakai dalam mengakses fitur-fitur tertentu di aplikasi kita.
3. Get all questions
Fitur ini dapat diakses siapapun dari luar tanpa mengharuskan user login. Response balikan dari endpoint ini adalah pertanyaan-pertanyaan yang ditanyakan oleh user disusun dari yang terbaru.
4. Get Question by Id
Buatlah endpoint yang dapat memberikan detail pertanyaan berdasarkan id nya. Fitur ini tidak memerlukan login
5. Create Question
Fitur untuk menambahkan pertanyaan baru. Memerlukan login dan access token untuk memakai fitur ini. setiap User menambahkan pertanyaan maka reputation user tersebut bertambah +1.
6. Upvote Question
Fitur untuk memberikan penilaian lebih terhadap sebuah pertanyaan. User tidak bisa mengupvote pertanyaan sendiri, dan upvote hanya boleh sekali untuk satu user pada satu pertanyaan. Setiap Upvote diberikan, maka user yang memberikan upvote bertambah reputasi +1 dan user yang memiliki (author) pertanyaan tersebut reputation +2.
7. Downvote Question
Fitur ini kebalikan dari upvote yaitu untuk memberikan penilaian kurang terhadap sebuah pertanyaan. Aturannya sama dengan upvote, tidak bisa downvote pertanyaan sendiri dan satu user hanya boleh satu kali downvote pada satu pertanyaan. Downvote hanya boleh diberikan oleh user yang setidaknya memiliki nilai reputasi 5 ke atas. Setiap downvote diberikan oleh user, maka user tersebut berkurang reputation nya -2 dan user yang menjadi author dari pertanyaan tersebut reputation dikuran -1.
8. Answer a Question
Fitur membuat (create) jawaban dari sebuah pertanyaan. Memerlukan access token untuk memakai fitur ini. setiap user yang memberikan jawaban maka user tersebut bertambah +2 reputation nya. 
9. Upvote an Answer
Fitur yang kurang lebih sama dengan upvote question. setiap user yang  memberikan upvote mendapatkan penambahan reputation +1, dan user yang memiliki jawaban tersebut bertambah +2.
10. Downvote an Answer
downvote sebuah jawaban hanya boleh untuk user dengan reputation minimal 5. setiap downvote diberikan, maka user yang memberikan downvote berkurang reputation -2 dan user yang memiliki jawaban tersebut berkurang -1.
11. Choose an appropriate answer
User yang memiliki pertanyaan dapat memilih jawaban yang menurut dia paling tepat. fitur ini akan mengubah status jawaban yang sebelumnya isApproved bernilai false menjadi true.
