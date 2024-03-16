import { ImageItem } from "../items/ImageItem";
import { UploadImage } from "../items/UploadImage";

function CollectionScreen() {
  const products: any = [
    {
      id: 1,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
      imageAlt:
        "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
    },
    {
      id: 2,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
      imageAlt:
        "Olive drab green insulated bottle with flared screw lid and flat top.",
    },
    {
      id: 3,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
      imageAlt:
        "Person using a pen to cross a task off a productivity paper card.",
    },
    {
      id: 4,
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
      imageAlt:
        "Hand holding black machined steel mechanical pencil with brass tip and top.",
    },
  ];
  return (
    <div className="mx-auto max-w-2xl p-6 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
      <div>
        <p className="mb-4 text-pretty text-lg font-semibold">
          Upload new images
        </p>
        <UploadImage />
      </div>

      <div className="my-10">
        <p className="mb-4 text-pretty text-lg font-semibold">Your images</p>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ImageItem
              key={product.id}
              imageSrc={product.imageSrc}
              imageAlt={product.imageAlt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default CollectionScreen;
