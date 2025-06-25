import React from 'react';
import { Users } from 'lucide-react';

interface ActionButtonProps {
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="lg:w-2/4 w-full  bg-black text-white text-sm py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gradient-to-r hover:from-[#31CCD6] hover:via-[#66C587] hover:to-[#BBD16B] hover:text-black cursor-pointer transition-colors"
    >
      <Users size={18} />
      <span>See who's present</span>
    </button>
  );
};

export default ActionButton;