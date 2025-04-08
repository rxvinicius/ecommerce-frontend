"use client";

import { useCallback, useState, useRef, useEffect } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { ImagePlus, Spinner, Check } from "@/components/ui/icons";
import RemoveButton from "./RemoveButton";

type FileUploaderProps = {
  onChange: (files: File[]) => void;
  disabled?: boolean;
  maxFiles?: number;
};

const MAX_FILES = 6;
const MAX_FILE_SIZE_MB = 2;
const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export default function FileUploader({
  onChange,
  disabled,
  maxFiles = MAX_FILES,
}: FileUploaderProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Keep maxFiles up to date without having to re-execute the onDrop hook
  const maxFilesRef = useRef(maxFiles);

  useEffect(() => {
    maxFilesRef.current = maxFiles;
  }, [maxFiles]);

  const validateFiles = (incomingFiles: File[]) => {
    const validFiles: File[] = [];
    for (const file of incomingFiles) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError("Tipo de arquivo inválido");
        return [];
      }
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setError("Arquivo muito grande (máx. 2MB)");
        return [];
      }
      validFiles.push(file);
    }
    setError(null);
    return validFiles;
  };

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setIsLoading(true);
      const totalFiles = [...files, ...acceptedFiles];
      if (totalFiles.length > maxFilesRef.current) {
        setError(`Limite de ${maxFilesRef.current} imagens excedido`);
        setIsLoading(false);
        return;
      }

      const valid = validateFiles(acceptedFiles);
      if (valid.length === 0) {
        setIsLoading(false);
        return;
      }

      const newPreviews = valid.map((file) => URL.createObjectURL(file));
      const updatedFiles = [...files, ...valid];
      const updatedPreviews = [...previews, ...newPreviews];

      setFiles(updatedFiles);
      setPreviews(updatedPreviews);
      onChange(updatedFiles);
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1500);
    },
    [files, previews, onChange]
  );

  const removeImage = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
    onChange(updatedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
    disabled,
  });

  return (
    <div className="grid gap-2">
      <div
        {...getRootProps()}
        className={cn(
          "border border-input rounded-md p-4 text-center cursor-pointer transition-colors bg-white dark:bg-input/30",
          disabled && "opacity-50 cursor-not-allowed",
          error && "border-destructive",
          success && "border-green-500"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
          {isLoading ? (
            <Spinner className="w-5 h-5 animate-spin" />
          ) : success ? (
            <Check className="w-5 h-5 text-green-500" />
          ) : (
            <ImagePlus className="w-5 h-5" />
          )}
          <p className="text-sm">
            Clique ou arraste as imagens aqui ({files.length}/{maxFiles})
          </p>
        </div>
      </div>

      {error && <p className="text-sm text-destructive text-center">{error}</p>}

      {previews.length === 0 && !error && (
        <p className="text-xs text-muted-foreground text-center">
          Nenhuma imagem selecionada
        </p>
      )}

      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mt-2">
          {previews.map((src, i) => (
            <div
              key={i}
              className="relative w-full h-32 border border-input rounded overflow-hidden"
            >
              <Image
                src={src}
                alt={`preview-${i}`}
                fill
                className="object-contain h-32 w-full"
              />
              <RemoveButton onClick={() => removeImage(i)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
