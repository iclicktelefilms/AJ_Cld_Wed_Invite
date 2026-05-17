"use client";

import { useBuilderStore } from "@/store/builderStore";
import { Upload, Trash2, GripVertical } from "lucide-react";
import { GalleryImage } from "@/types";
import Image from "next/image";

export default function GalleryStep() {
  const { invitation, updateInvitation } = useBuilderStore();
  const gallery = invitation.gallery ?? [];

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newImages: GalleryImage[] = Array.from(files).map((file, i) => ({
      id: Math.random().toString(36).slice(2),
      url: URL.createObjectURL(file),
      sort_order: gallery.length + i,
    }));
    updateInvitation({ gallery: [...gallery, ...newImages] });
  };

  const removeImage = (id: string) => {
    updateInvitation({ gallery: gallery.filter((img) => img.id !== id) });
  };

  return (
    <div className="max-w-xl">
      <div className="mb-8">
        <h2 className="text-xl font-bold text-neutral-900 mb-1">Photo Gallery</h2>
        <p className="text-sm text-neutral-500">Upload pre-wedding or candid photos to showcase.</p>
      </div>

      {/* Upload area */}
      <label className="block mb-6 cursor-pointer group">
        <div className="border-2 border-dashed border-neutral-200 group-hover:border-neutral-400 rounded-2xl p-10 text-center transition-colors">
          <Upload className="h-8 w-8 text-neutral-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-neutral-700 mb-1">Drop photos here or click to upload</p>
          <p className="text-xs text-neutral-400">JPG, PNG, WebP — up to 10MB each</p>
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      </label>

      {/* Gallery grid */}
      {gallery.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {gallery.map((image, i) => (
            <div key={image.id} className="relative group aspect-square rounded-xl overflow-hidden bg-neutral-100">
              <Image
                src={image.url}
                alt={`Gallery ${i + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => removeImage(image.id)}
                  className="p-2 bg-white/90 rounded-lg"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
              <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <GripVertical className="h-4 w-4 text-white drop-shadow-md" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
