import React from 'react';

interface ToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

const Toggle: React.FC<ToggleProps> = ({ enabled, onChange }) => {
  return (
    <button
      type="button"
      className={`
        relative inline-flex h-6 w-11 items-center rounded-full
        transition-colors duration-300 outline-1 outline-black ease-in-out 
        ${enabled ? 'outline-zinc-950' : 'outline-gray-900 '}
      `}
      onClick={() => onChange(!enabled)}
    >
      <span className="sr-only">Toggle</span>
      <span
        className={`
          inline-block h-4 w-4 rounded-full bg-black transform transition-transform outline-1 outline-black duration-300 ease-in-out
          ${enabled ? 'translate-x-6' : 'translate-x-1'}
        `}
      />
    </button>
  );
};

export default Toggle;