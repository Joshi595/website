import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 120, className = "" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Display the actual logo image */}
      <img
        src="/logo1.png"
        alt="Mein Gärtla Logo"
        style={{ 
          height: `${size}px`,
          width: 'auto',
          objectFit: 'contain'
        }}
        className="drop-shadow-lg"
      />
    </div>
  );
};

export default Logo;
