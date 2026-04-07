import { useState } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { CarBrandResults } from './components/CarBrandResults';

interface RecognitionResult {
  brand: string;
  model: string;
  confidence: number;
  year?: string;
  color: string;
}

function App() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [recognitionResults, setRecognitionResults] = useState<RecognitionResult[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    setIsProcessing(true);

    // Mô phỏng kết quả nhận diện (mock data)
    setTimeout(() => {
      const mockResults: RecognitionResult[] = [
        {
          brand: 'Toyota',
          model: 'Camry',
          confidence: 0.95,
          year: '2023',
          color: '#EB0A1E',
        },
        {
          brand: 'Honda',
          model: 'Civic',
          confidence: 0.78,
          year: '2022',
          color: '#E40521',
        },
        {
          brand: 'Mercedes-Benz',
          model: 'C-Class',
          confidence: 0.65,
          year: '2024',
          color: '#333333',
        },
      ];
      setRecognitionResults(mockResults);
      setIsProcessing(false);
    }, 2000);
  };

  const handleReset = () => {
    setUploadedImage(null);
    setRecognitionResults([]);
    setIsProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <svg className="w-12 h-12 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Hệ Thống Nhận Diện Thương Hiệu Ô Tô
          </h1>
          <p className="text-slate-600">
            Tải lên ảnh xe của bạn và AI sẽ nhận diện thương hiệu, mô hình tự động
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload Ảnh Xe
            </h2>
            <ImageUploader onImageUpload={handleImageUpload} />
            {uploadedImage && (
              <button
                onClick={handleReset}
                className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
              >
                Tải ảnh xe khác
              </button>
            )}
          </div>

          {/* Original Image Display */}
          {uploadedImage && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Ảnh Gốc
              </h2>
              <div className="relative rounded-lg overflow-hidden bg-slate-100 border-2 border-slate-200">
                <img
                  src={uploadedImage}
                  alt="Uploaded car"
                  className="w-full h-auto object-contain max-h-96"
                />
              </div>
            </div>
          )}
        </div>

        {/* Recognition Results */}
        {uploadedImage && (
          <CarBrandResults 
            results={recognitionResults}
            isProcessing={isProcessing}
          />
        )}

        {/* Instructions */}
        {!uploadedImage && (
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Hướng dẫn sử dụng
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-3">
                  1
                </div>
                <h4 className="font-semibold text-slate-800 mb-2">Upload Ảnh</h4>
                <p className="text-sm text-slate-600">
                  Nhấn vào nút upload hoặc kéo thả ảnh xe của bạn vào khung
                </p>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mb-3">
                  2
                </div>
                <h4 className="font-semibold text-slate-800 mb-2">Xem Ảnh Gốc</h4>
                <p className="text-sm text-slate-600">
                  Ảnh xe gốc sẽ được hiển thị để bạn kiểm tra
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mb-3">
                  3
                </div>
                <h4 className="font-semibold text-slate-800 mb-2">Nhận Kết Quả</h4>
                <p className="text-sm text-slate-600">
                  AI sẽ nhận diện thương hiệu, mô hình và năm sản xuất
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h4 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Thương hiệu được hỗ trợ
              </h4>
              <p className="text-sm text-amber-800">
                Toyota • Honda • Mercedes-Benz • BMW • Ford • Audi • Volkswagen • Hyundai • Mazda • Nissan • Lexus • KIA và nhiều hãng khác...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;