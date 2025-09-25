import { cn } from "@/lib/utils";
import { EHeroLayoutTypes } from "../../../../../types/page.types";
import { RenderHeroProps } from "../render-hero";
import { RichTextPreview } from "@/components/editor/blocks/editor-x/rich-text-preview";
import Image from "next/image";
import CMSLink from "@/components/ui/cms-link";
import CloudinaryImage from "@/components/ui/cloudinary-image";
export default function SplitHero({ hero }: RenderHeroProps) {
  console.log("split hero", hero);
  const layoutType = hero.layout.type;
  if (layoutType !== EHeroLayoutTypes.Split_Hero) return null;

  const imagePosition = hero.layout.imagePosition;
  const imageUrl = hero.image?.secure_url;

  return (
    <section
      className={cn("bg-cream  lg:p-14 p-6 sm:p-8 mb-12 flex justify-center")}
      style={{ minHeight: "80vh", maxHeight: 800 }}
    >
      <div
        className={cn(
          "mx-auto container flex flex-col py-12 md:flex-row items-center gap-8 md:gap-10",
          imagePosition === "left" ? "md:flex-row" : "md:flex-row-reverse"
        )}
      >
        {imageUrl && (
          <div className="flex p-24 justify-center items-center w-full md:flex-1 mb-6 md:mb-0">
            <CloudinaryImage
              className="w-full rounded-2xl h-auto object-cover"
              src={imageUrl}
              width={500}
              height={500}
              alt={hero.image?.alt || "Image"}
            />
          </div>
        )}

        <div className="w-full space-y-12 md:flex-1">
          <RichTextPreview className="mb-8" html={hero.headline.html} />
          {Array.isArray(hero.cta) && hero.cta.length > 0 && (
            <ul className="flex gap-4">
              {hero.cta.map((cta, index) => (
                <li key={index}>
                  <CMSLink
                    size={"lg"}
                    {...cta}
                    className={cn(
                      "px-10 py-5",
                      cta.variant === "outline" &&
                        "bg-transparent  border-2 border-primary text-primary  "
                    )}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
