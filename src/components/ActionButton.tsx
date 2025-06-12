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
      className="w-2/4  bg-black text-white text-sm py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
    >
      <Users size={18} />
      <span>See who's present</span>
    </button>
  );
};

export default ActionButton;