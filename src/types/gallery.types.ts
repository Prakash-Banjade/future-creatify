export type TMediaSelect = {
  id: string;
  name: string;
  originalName: string;
  alt: string;
  caption: string;
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  bytes: number;
  galleryId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type TGallery = {
  id: string;
  categoryId: string;
  category: {
    name: string;
  };
  media: TMediaSelect[];
};

export type TGalleryResponse = TGallery[];