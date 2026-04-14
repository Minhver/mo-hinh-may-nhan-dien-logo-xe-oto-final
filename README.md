# 🚗 Car Logo Recognition System
Dự án cuối kỳ môn Học máy: Xây dựng mô hình nhận diện các thương hiệu xe ô tô.

## 👥 Thành viên nhóm
- Thành viên 1: Đinh Trọng Hiệp - Data Engineer
- Thành viên 2: Nguyễn Quang Minh - AI Engineer/leader
- Thành viên 3: Nguyễn Thành Lộc - Backend & UI
- Thành viên 4: Lê Hoàng Sơn - Documentation

## 🚀 Tính năng chính
- Nhận diện tự động logo các hãng xe (Toyota, Honda, VinFast,.....).
- Giao diện web trực quan, cho phép tải ảnh lên để dự đoán.
- Độ chính xác cao nhờ mô hình YOLOv8.

## 🛠 Công nghệ sử dụng
- **AI Model:** YOLOv8 (ultralytics)
- **Framework:** Streamlit (UI), OpenCV
- **Ngôn ngữ:** Python 
- **Quản lý:** Git/GitHub

## 📁 Cấu trúc thư mục
```text
├── dataset/          # Chứa dữ liệu train/val
├── models/           # Chứa file best.pt (weights)
├── src/              # Source code chính
├── notebooks/        # File train_yolo.ipynb
└── requirements.txt  # Thư viện cần cài

dataset 
# car logo > 2026-04-06 11:32pm
https://universe.roboflow.com/quangminh17s-workspace/car-logo-r1q5a-6nyh6
Provided by a Roboflow user
License: CC BY 4.0
