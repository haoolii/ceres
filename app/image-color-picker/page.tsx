import { ImageColorPickerBoard } from "@/features/image-color-picker/components/imageColorPickerBoard";

export default function ImageColorPicker() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl mb-4">圖片顏色選取</h1>
      <ImageColorPickerBoard />
    </div>
  );
}
