interface IImgaeItem {
  imageSrc: string;
  imageAlt: string;
}

export const ImageItem = ({ imageSrc, imageAlt }: IImgaeItem) => {
  return (
    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="h-full w-full object-cover object-center group-hover:opacity-90"
      />
    </div>
  );
};
