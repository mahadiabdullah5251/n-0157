
import React from 'react';
import { Info, LogOut, MessageCircle, Plus, Upload, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  alignRight?: boolean;
};

const SidebarItem = ({ icon, label, onClick, isActive = false, alignRight = false }: SidebarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-between w-full py-3 px-4 text-sm transition-colors",
        isActive ? "text-white" : "text-gray-400 hover:text-white"
      )}
    >
      <span>{label}</span>
      {alignRight && <div className="ml-auto">{icon}</div>}
      {!alignRight && icon}
    </button>
  );
};

type SidebarProps = {
  credits?: number;
};

const Sidebar = ({ credits = 5 }: SidebarProps) => {
  return (
    <div className="w-[170px] h-screen bg-black border-r border-gray-800 flex flex-col justify-between">
      <div className="flex flex-col">
        {/* Logo */}
        <div className="p-4 mb-2">
          <svg height="24" width="24" viewBox="0 0 24 24">
            <path d="M19.7 3H4.3A1.3 1.3 0 003 4.3v15.4A1.3 1.3 0 004.3 21h15.4a1.3 1.3 0 001.3-1.3V4.3A1.3 1.3 0 0019.7 3zM8.4 17.7H5.6v-8h2.8v8zm-1.4-9a1.6 1.6 0 110-3.2 1.6 1.6 0 010 3.2zm11.3 9h-2.8v-4.4c0-1-.4-1.7-1.3-1.7-.7 0-1.2.5-1.4 1-.1.1-.1.3-.1.6v4.6H9.9v-8h2.7v1.2a2.8 2.8 0 012.5-1.4c1.8 0 3.2 1.2 3.2 3.7v4.5z" fill="currentColor"/>
          </svg>
        </div>
        
        {/* Reach dropdown */}
        <div className="mx-4 mb-2">
          <button className="flex items-center justify-between bg-zinc-900 rounded-md px-3 py-2 w-full text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Reach</span>
            </div>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        
        {/* Divider */}
        <div className="border-t border-gray-800 mx-4 my-2"></div>
        
        {/* Create new test */}
        <div className="px-4">
          <SidebarItem 
            label="Create new test" 
            icon={<Plus className="w-4 h-4" />} 
            alignRight={true}
          />
        </div>
      </div>
      
      <div className="mt-auto">
        {/* Credits info */}
        <div className="flex items-center justify-between px-4 py-3 text-gray-400 text-sm border-t border-gray-800">
          <span>Credits: {credits}</span>
          <Info className="w-4 h-4" />
        </div>
        
        {/* Bottom menu items */}
        <SidebarItem 
          label="Upgrade plan" 
          icon={<Upload className="w-4 h-4" />} 
          alignRight={true}
        />
        
        <SidebarItem 
          label="Leave feedback" 
          icon={<MessageCircle className="w-4 h-4" />} 
          alignRight={true}
        />
        
        <SidebarItem 
          label="Log out" 
          icon={<LogOut className="w-4 h-4" />} 
          alignRight={true}
        />
        
        {/* Version number */}
        <div className="text-gray-500 text-[10px] text-center py-2">
          Version 1.2
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
