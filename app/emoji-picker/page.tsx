import { Button } from "@/components/ui/button";
import { EmojiPickerBoard } from "@/features/emoji-picker/components/emojiPickerBoard";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "表情符號",
  description: "emoji,表情符號,特殊符號,臉書表情符號,HTML特殊符號",
  keywords: [
    "表情符號",
    "特殊符號",
    "emoji",
    "symbol",
    "臉書表情符號",
    "Facebook表情符號",
    "HTML特殊符號",
  ],
};

export default function EmojiPicker() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl mb-4">表情符號</h1>
      <EmojiPickerBoard />
    </div>
  );
}
