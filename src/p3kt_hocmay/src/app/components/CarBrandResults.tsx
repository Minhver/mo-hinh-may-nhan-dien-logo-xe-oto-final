interface RecognitionResult {
  brand: string;
  model: string;
  confidence: number;
  year?: string;
  color: string;
}

interface CarBrandResultsProps {
  results: RecognitionResult[];
  isProcessing: boolean;
}

export function CarBrandResults({ results, isProcessing }: CarBrandResultsProps) {
  return (
    <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        Kết Quả Nhận Diện
      </h2>
      
      {isProcessing ? (
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <svg className="w-8 h-8 text-blue-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
              </svg>
            </div>
            <div className="text-center">
              <p className="text-slate-700 font-medium">Đang phân tích ảnh xe...</p>
              <p className="text-sm text-slate-500 mt-1">AI đang xử lý và nhận diện thương hiệu</p>
            </div>
          </div>
        </div>
      ) : results.length > 0 ? (
        <div className="space-y-4">
          {/* Top Result - Featured */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
                  style={{ backgroundColor: results[0].color }}
                >
                  {results[0].brand.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold text-slate-900">{results[0].brand}</h3>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                      Kết quả tốt nhất
                    </span>
                  </div>
                  <p className="text-slate-600 font-medium">{results[0].model}</p>
                  {results[0].year && (
                    <p className="text-sm text-slate-500 mt-1">Năm: {results[0].year}</p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">
                  {(results[0].confidence * 100).toFixed(1)}%
                </div>
                <div className="text-xs text-slate-500 mt-1">Độ tin cậy</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-600 mb-1">
                <span>Mức độ chính xác</span>
                <span className="font-semibold">{getAccuracyLabel(results[0].confidence)}</span>
              </div>
              <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out shadow-md"
                  style={{
                    width: `${results[0].confidence * 100}%`,
                    background: `linear-gradient(90deg, ${results[0].color}, ${adjustColorBrightness(results[0].color, 30)})`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Other Results */}
          {results.slice(1).map((result, index) => (
            <div
              key={index}
              className="p-4 bg-slate-50 rounded-lg border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow"
                    style={{ backgroundColor: result.color }}
                  >
                    {result.brand.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-bold text-slate-900">{result.brand}</h4>
                      <span className="text-sm text-slate-500">•</span>
                      <span className="text-slate-700">{result.model}</span>
                    </div>
                    {result.year && (
                      <p className="text-xs text-slate-500">Năm: {result.year}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${result.confidence * 100}%`,
                        backgroundColor: result.color,
                      }}
                    ></div>
                  </div>
                  <span className="text-lg font-bold text-slate-700 w-14 text-right">
                    {(result.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Technical Info */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div>
                <h4 className="font-semibold text-blue-900 mb-1">Thông tin kỹ thuật</h4>
                <p className="text-sm text-blue-800">
                  <strong>Lưu ý:</strong> Đây là kết quả mô phỏng sử dụng dữ liệu mẫu. 
                  Trong ứng dụng thực tế, bạn cần tích hợp với:
                </p>
                <ul className="text-sm text-blue-700 mt-2 space-y-1 ml-4">
                  <li>• <strong>TensorFlow.js</strong> hoặc <strong>ONNX Runtime</strong> cho mô hình AI</li>
                  <li>• <strong>Pre-trained model</strong> như YOLO hoặc ResNet đã được huấn luyện với dữ liệu xe hơi</li>
                  <li>• <strong>Backend API</strong> (Python/FastAPI) kết nối với PyTorch/TensorFlow</li>
                  <li>• <strong>Cloud Vision API</strong> như Google Cloud Vision hoặc AWS Rekognition Custom Labels</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center">
              <div className="text-2xl font-bold text-green-600">{results.length}</div>
              <div className="text-sm text-green-700">Kết quả phát hiện</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {(results.reduce((sum, r) => sum + r.confidence, 0) / results.length * 100).toFixed(0)}%
              </div>
              <div className="text-sm text-blue-700">Độ tin cậy TB</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 text-center">
              <div className="text-2xl font-bold text-purple-600">AI</div>
              <div className="text-sm text-purple-700">Công nghệ sử dụng</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-slate-500">
          <svg className="w-16 h-16 mx-auto mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>Không phát hiện thương hiệu xe nào</p>
        </div>
      )}
    </div>
  );
}

function getAccuracyLabel(confidence: number): string {
  if (confidence >= 0.9) return 'Rất cao';
  if (confidence >= 0.8) return 'Cao';
  if (confidence >= 0.7) return 'Trung bình';
  return 'Thấp';
}

function adjustColorBrightness(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
}
