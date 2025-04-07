"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner, Trash, X } from "@/components/ui/icons";

interface DeleteConfirmationModalProps {
  open: boolean;
  isLoading?: boolean;
  name?: string;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteConfirmationModal = ({
  open,
  isLoading = false,
  name,
  onClose,
  onConfirm,
}: DeleteConfirmationModalProps) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="max-w-sm [&_[data-dialog-close]]:cursor-pointer">
      <DialogHeader className="items-center">
        <DialogTitle className="flex items-center gap-2 text-destructive">
          <Trash className="h-5 w-5" />
          Excluir produto
        </DialogTitle>
        <DialogDescription className="pt-2 text-sm text-muted-foreground flex flex-col items-center">
          <span>
            Tem certeza que deseja excluir o produto{" "}
            <span className="font-bold">{name}</span>?
          </span>
          <span>Essa ação é permanente e não pode ser desfeita.</span>
        </DialogDescription>
      </DialogHeader>

      <DialogFooter className="pt-4">
        <Button
          variant="outline"
          onClick={onClose}
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          Cancelar
        </Button>
        <Button
          variant="destructive"
          onClick={onConfirm}
          disabled={isLoading}
          className="w-full sm:w-auto"
        >
          {isLoading ? (
            <>
              <Spinner className="h-5 w-5 animate-spin" /> "Excluindo..."
            </>
          ) : (
            "Confirmar"
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default DeleteConfirmationModal;
