
import React from 'react';
import { Info, LogOut, MessageCircle, Plus, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
};

const SidebarItem = ({ icon, label, onClick, isActive = false }: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center text-xs gap-1 p-2 rounded w-full transition-colors",
        isActive ? "text-white" : "text-gray-400 hover:text-white"
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

type SidebarProps = {
  credits?: number;
};

const Sidebar = ({ credits = 5 }: SidebarProps) => {
  return (
    <div className="w-[170px] h-screen bg-black border-r border-gray-800 flex flex-col justify-between">
      <div className="flex flex-col items-center p-4">
        <div className="text-white text-2xl mb-8">
          <svg height="32" width="32" viewBox="0 0 24 24">
            <path d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.4 17.7H5.6v-8h2.8v8zm-1.4-9a1.6 1.6 0 110-3.2 1.6 1.6 0 010 3.2zm11.3 9h-2.8v-4.4c0-1-.4-1.7-1.3-1.7-.7 0-1.2.5-1.4 1-.1.1-.1.3-.1.6v4.6H9.9v-8h2.7v1.2a2.8 2.8 0 012.5-1.4c1.8 0 3.2 1.2 3.2 3.7v4.5z" fill="currentColor"/>
          </svg>
        </div>
        
        <div className="flex flex-col items-center space-y-4 w-full">
          <div className="relative">
            <SidebarItem 
              icon={<div className="relative flex items-center justify-center"><Upload className="w-5 h-5" /><span className="absolute -right-1 -top-1 bg-red-500 rounded-full flex items-center justify-center w-4 h-4 text-[10px]">⌄</span></div>} 
              label="Reach" 
              isActive={true}
            />
          </div>
          
          <div className="border border-gray-800 rounded-md p-2 w-full">
            <SidebarItem 
              icon={<Plus className="w-5 h-5" />} 
              label="Create new test" 
            />
          </div>
        </div>
      </div>
      
      <div className="mt-auto p-4 flex flex-col space-y-4 w-full">
        <div className="flex items-center justify-between text-gray-400 text-xs">
          <span>Credits: {credits}</span>
          <Info className="w-4 h-4" />
        </div>
        
        <SidebarItem 
          icon={<Upload className="w-5 h-5" />} 
          label="Upgrade plan" 
        />
        
        <SidebarItem 
          icon={<MessageCircle className="w-5 h-5" />} 
          label="Leave feedback" 
        />
        
        <SidebarItem 
          icon={<LogOut className="w-5 h-5" />} 
          label="Log out" 
        />
        
        <div className="text-gray-500 text-[10px] mt-2 text-center">
          Version 1.2
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
