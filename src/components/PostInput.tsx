
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from 'lucide-react';

type PostInputProps = {
  onSimulate: () => void;
};

const PostInput: React.FC<PostInputProps> = ({ onSimulate }) => {
  return (
    <div className="w-full max-w-[600px] mx-auto my-6 glass-morphism rounded-lg p-1">
      <div className="relative">
        <textarea
          placeholder="Write a LinkedIn post..."
          className="w-full h-[100px] bg-transparent border-none resize-none p-4 text-gray-300 focus:outline-none placeholder:text-gray-500"
        />
        <div className="absolute bottom-4 right-4">
          <Button 
            onClick={onSimulate}
            className="bg-white text-black hover:bg-gray-200 transition-all rounded-md px-4 py-2 flex items-center gap-2 text-sm"
          >
            <span>Simulate</span>
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostInput;
