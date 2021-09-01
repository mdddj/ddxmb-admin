import React from 'react';

const MarginRight: React.FC<{ m?: number }> = ({ m }) => {
  return (
    <span
      style={{
        marginRight: m ?? 12,
      }}
    />
  );
};

export default MarginRight;
