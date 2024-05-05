import { useState } from 'react';

interface IImgaeItem {
  imageSrc: string;
  imageAlt: string;
  isSelected: boolean;
  setSelectedItem: any;
}

export const ImageItem = ({ imageSrc, imageAlt, isSelected, setSelectedItem }: IImgaeItem) => {
  const [isHidden, setIsHidden] = useState(isSelected);
  const handleSelectedItem = () => {
    console.log(isHidden);
    if (isHidden) {
      setIsHidden(false);
      setSelectedItem(null);
    }
  };
  return (
    <div>
      <img
        onClick={() => handleSelectedItem()}
        src={imageSrc}
        alt={imageAlt}
        loading="lazy"
        className={`h-60 w-60 object-cover rounded-lg ${isHidden ? 'p-0' : 'p-2'}`}
      />
    </div>
  );
};
