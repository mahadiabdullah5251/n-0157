
import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import Sidebar from "@/components/Sidebar";
import NetworkGraph from "@/components/NetworkGraph";
import SegmentSelector from "@/components/SegmentSelector";
import PostInput from "@/components/PostInput";

// LinkedIn segments
const LINKEDIN_SEGMENTS = [
  "Building Services Engineers"
];

const Index = () => {
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showGraph, setShowGraph] = useState<boolean>(false);

  const handleSelectSegment = (segment: string | null) => {
    setActiveSegment(segment);
  };

  const handleSimulate = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowGraph(true);
      toast.success("Simulation generated successfully!");
    }, 1500);
  };

  useEffect(() => {
    // Automatically show the graph after a short delay on first load
    const timer = setTimeout(() => {
      setShowGraph(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 flex flex-col">
        <div className="w-full">
          <SegmentSelector 
            segments={LINKEDIN_SEGMENTS}
            activeSegment={activeSegment}
            onSelectSegment={handleSelectSegment}
          />
        </div>
        
        <div className="flex-1 relative">
          {/* Network visualization */}
          <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
               style={{ opacity: showGraph ? 1 : 0 }}>
            <NetworkGraph 
              centerNodeId="center-node"
              segment={activeSegment || undefined}
            />
          </div>
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-t-2 border-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        
        {/* Post input at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 pb-6">
          <PostInput onSimulate={handleSimulate} />
        </div>
      </main>
    </div>
  );
};

export default Index;
