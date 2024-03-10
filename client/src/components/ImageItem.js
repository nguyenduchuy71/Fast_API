import React from "react";

function ItemImage({ product }) {
  return (
    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
      <img
        src={product.imageSrc}
        alt={product.imageAlt}
        className="h-full w-full object-cover object-center group-hover:opacity-90"
      />
    </div>
  );
}

export default ItemImage;
