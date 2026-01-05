import React, { useCallback, useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageDropzoneProps {
    onImagesSelected: (files: File[]) => void;
    maxFiles?: number;
}

export function ImageDropzone({ onImagesSelected, maxFiles = 5 }: ImageDropzoneProps) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const files = Array.from(e.dataTransfer.files).filter(file =>
                file.type.startsWith('image/')
            );
            if (files.length > 0) {
                onImagesSelected(files.slice(0, maxFiles));
            }
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const files = Array.from(e.target.files).filter(file =>
                file.type.startsWith('image/')
            );
            if (files.length > 0) {
                onImagesSelected(files.slice(0, maxFiles));
            }
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div
            onClick={handleClick}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`
        relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragging
                    ? 'border-amber-500 bg-amber-50'
                    : 'border-gray-300 hover:border-amber-400 bg-gray-50'
                }
      `}
        >
            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
            />

            <div className="flex flex-col items-center justify-center space-y-3">
                <div className={`
          p-3 rounded-full 
          ${isDragging ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-400'}
        `}>
                    <Upload className="h-8 w-8" />
                </div>
                <div className="text-gray-600">
                    <span className="font-medium text-amber-600">Cliquez pour téléverser</span>
                    {' '}ou glissez-déposez vos images ici
                </div>
                <p className="text-xs text-gray-500">
                    PNG, JPG, JPEG jusqu'à 5MB
                </p>
            </div>
        </div>
    );
}

interface ImagePreviewProps {
    images: File[];
    onRemove: (index: number) => void;
}

export function ImagePreview({ images, onRemove }: ImagePreviewProps) {
    if (images.length === 0) return null;

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {images.map((file, index) => (
                <div key={index} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover"
                    />
                    <button
                        type="button"
                        onClick={() => onRemove(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}
