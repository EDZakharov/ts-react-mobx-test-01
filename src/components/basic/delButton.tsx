import { useState } from 'react';

export const DeleteButton = ({ handler }: { handler: () => void }) => {
  const [src, setSrc] = useState<string>(`del_default.png`);

  const handleHoverIn = () => {
    setSrc(`del_hover.png`);
  };

  const handleHoverOut = () => {
    setSrc(`del_default.png`);
  };

  return (
    <>
      <img
        onClick={handler}
        src={src}
        onMouseEnter={handleHoverIn}
        onMouseLeave={handleHoverOut}
      ></img>
    </>
  );
};
