/* eslint-disable @next/next/no-img-element */

"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useGetProductById } from "@/hooks/useProductActions";
import useProductDelete from "@/hooks/useProductDelete";
import useCart from "@/hooks/useCart";
import useAuth from "@/hooks/useAuth";

import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  Spinner,
  Trash,
} from "@/components/ui/icons";
import { DeleteConfirmationModal, QuantityInput } from "@/components/shared";

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const { data: product, isLoading, isError } = useGetProductById(id as string);
  const { isAdmin, authLoaded } = useAuth();
  const {
    isModalOpen,
    isDeleting,
    productToDelete,
    handleOpenModal,
    handleCloseModal,
    handleDeleteConfirm,
  } = useProductDelete();
  const { addToCart } = useCart();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (isLoading || !authLoaded) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Spinner className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="text-center text-destructive mt-10">
        <p>Erro ao carregar produto.</p>
      </div>
    );
  }

  function handleTransitionChange(action: () => void) {
    setIsTransitioning(true);
    setTimeout(() => {
      action();
      setIsTransitioning(false);
    }, 200);
  }

  const handleThumbnailClick = (index: number) => {
    handleTransitionChange(() => setCurrentImageIndex(index));
  };

  const handlePrev = () => {
    handleTransitionChange(() =>
      setCurrentImageIndex((prev) =>
        prev === 0 ? product.images.length - 1 : prev - 1
      )
    );
  };

  const handleNext = () => {
    handleTransitionChange(() =>
      setCurrentImageIndex((prev) =>
        prev === product.images.length - 1 ? 0 : prev + 1
      )
    );
  };

  const handleProductDeleted = () => {
    handleDeleteConfirm();
    router.push("/products");
  };

  const handleAddToCart = () => addToCart(product, quantity);

  const handleCheckout = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <div className="relative w-full h-[400px] border rounded-lg overflow-hidden">
            <img
              key={currentImageIndex} // to force re-render of the image
              src={product.images[currentImageIndex]}
              alt={product.name}
              className={`object-contain w-full h-full rounded-lg transition-opacity duration-200 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {product.images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-1 rounded-full"
                >
                  <ChevronLeft className="w-5 h-5 text-muted-foreground cursor-pointer" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-1 rounded-full"
                >
                  <ChevronRight className="w-5 h-5 text-muted-foreground cursor-pointer" />
                </button>
              </>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`w-20 h-20 border rounded-md overflow-hidden cursor-pointer ${
                    currentImageIndex === index
                      ? "border-primary"
                      : "border-muted"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-foreground leading-tight">
            {product.name}
          </h1>

          <p className="text-lg text-muted-foreground">{product.description}</p>

          <p className="text-2xl font-semibold text-primary">
            R$ {product.price.toFixed(2)}
          </p>

          <div className="flex items-center gap-4">
            <span className="text-muted-foreground text-sm">Quantidade:</span>
            <QuantityInput
              value={quantity}
              onIncrement={() => setQuantity((prev) => prev + 1)}
              onDecrement={() =>
                setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
              }
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            {isAdmin ? (
              <>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() =>
                    router.push(`/admin/products/${product.id}/edit`)
                  }
                >
                  <Edit className="h-4 w-4" />
                  Editar
                </Button>
                <Button
                  size="lg"
                  variant="destructive"
                  className="w-full sm:w-auto"
                  onClick={() => handleOpenModal(product)}
                >
                  <Trash className="h-4 w-4" />
                  Excluir
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  size="lg"
                  onClick={handleAddToCart}
                >
                  Adicionar ao carrinho
                </Button>
                <Button
                  className="w-full sm:w-auto"
                  size="lg"
                  onClick={handleCheckout}
                >
                  Comprar agora
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {isAdmin && (
        <DeleteConfirmationModal
          open={isModalOpen}
          isLoading={isDeleting}
          name={productToDelete?.name}
          onClose={handleCloseModal}
          onConfirm={handleProductDeleted}
        />
      )}
    </div>
  );
}
