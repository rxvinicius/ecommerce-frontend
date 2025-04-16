"use client";

import { useState } from "react";
import { useDeleteProduct } from "@/hooks/useProductActions";
import { Product } from "@/types/product";

export default function useProductDelete() {
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct();

  const handleOpenModal = (product: Product) => {
    setProductToDelete(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setProductToDelete(null);
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (!productToDelete) return;
    deleteProduct(productToDelete.id, {
      onSuccess: () => handleCloseModal(),
    });
  };

  return {
    isModalOpen,
    isDeleting,
    productToDelete,
    handleOpenModal,
    handleCloseModal,
    handleDeleteConfirm,
  };
}
