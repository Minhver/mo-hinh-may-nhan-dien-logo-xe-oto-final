import streamlit as st
from ultralytics import YOLO
from PIL import Image
import numpy as np

# Load mô hình (Đảm bảo file best.pt đã nằm trong thư mục models)
model = YOLO('models/best.pt')

st.title("🚗 Nhận Diện Logo Xe Ô Tô")

uploaded_file = st.file_uploader("Tải ảnh logo xe lên đây...", type=['jpg', 'png', 'jpeg'])

if uploaded_file:
    img = Image.open(uploaded_file)
    st.image(img, caption="Ảnh bạn vừa tải lên", use_container_width=True)
    
    # Dự đoán
    results = model(img)
    
    # Vẽ kết quả
    res_plotted = results[0].plot()
    st.image(res_plotted, caption="Kết quả AI nhận diện", use_container_width=True)
