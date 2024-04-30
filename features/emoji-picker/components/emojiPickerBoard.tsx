"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import emojis from "../assets/emoji.json";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const EmojiPickerBoard = () => {
  const copy = async (text: string) => {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      toast({
        title: "訊息",
        description: "複製成功",
      });
    } else {
      toast({
        variant: "destructive",
        title: "訊息",
        description: "複製失敗",
      });
    }
  };

  return (
    <TooltipProvider>
      <div className="flex gap-2 flex-wrap justify-center">
        {emojis.map((emoji) => (
          <Tooltip key={emoji.emoji}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  copy(emoji.emoji);
                }}
              >
                {emoji.emoji}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span className="font-semibold">{emoji.description}</span>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};
