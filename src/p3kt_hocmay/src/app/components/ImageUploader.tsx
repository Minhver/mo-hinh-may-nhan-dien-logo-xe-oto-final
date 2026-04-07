import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  onImageUpload: (imageUrl: string) => void;
}

export function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onImageUpload(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileChange(file);
    }
  };

  return (
    <div>
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          relative border-2 border-dashed rounded-xl p-8 cursor-pointer
          transition-all duration-200 ease-in-out
          ${
            isDragging
              ? 'border-blue-500 bg-blue-50 scale-[1.02]'
              : 'border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />
        
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <div className={`
            p-4 rounded-full transition-all duration-200
            ${isDragging ? 'bg-blue-100 scale-110' : 'bg-blue-50'}
          `}>
            {isDragging ? (
              <ImageIcon className="w-8 h-8 text-blue-600 animate-bounce" />
            ) : (
              <Upload className="w-8 h-8 text-blue-600" />
            )}
          </div>
          
          <div>
            <p className="text-slate-700 font-semibold text-lg">
              {isDragging ? 'Thả ảnh xe vào đây' : 'Tải lên ảnh xe của bạn'}
            </p>
            <p className="text-sm text-slate-500 mt-1">
              Nhấn để chọn hoặc kéo thả ảnh vào đây
            </p>
          </div>
          
          <div className="flex items-center gap-2 mt-2">
            <div className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-600">
              JPG
            </div>
            <div className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-600">
              PNG
            </div>
            <div className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-600">
              WebP
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-3 text-center">
        <p className="text-xs text-slate-500">
          Để có kết quả tốt nhất, hãy chụp ảnh xe từ phía trước hoặc logo thương hiệu rõ ràng
        </p>
      </div>
    </div>
  );
}