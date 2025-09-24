import { cn } from "@/lib/utils";
import { EHeroLayoutTypes } from "../../../../../types/page.types";
import { RenderHeroProps } from "../render-hero";
import { RichTextPreview } from "@/components/editor/blocks/editor-x/rich-text-preview";
import Image from "next/image";
import CMSLink from "@/components/ui/cms-link";
export default function SplitHero({ hero }: RenderHeroProps) {
  console.log("split hero",hero)
  const layoutType = hero.layout.type;
  if (layoutType !== EHeroLayoutTypes.Split_Hero) return null;

  const imagePosition = hero.layout.imagePosition;
  const imageUrl = hero.image?.secure_url;

  return (
    <section
      className={cn(
        "bg-cream xl:p-20 lg:p-16 p-6 sm:p-8 mb-12 flex justify-center"
      )}
      style={{ minHeight: "80vh", maxHeight: 800 }}
    >
      <div
        className={cn(
          "w-full max-w-7xl flex flex-col md:flex-row items-center gap-8 md:gap-10",
          imagePosition === "left" ? "md:flex-row" : "md:flex-row-reverse"
        )}
      >
        {imageUrl && (
          <div className="flex justify-center items-center w-full md:flex-1 mb-6 md:mb-0">
            <Image
              width={500}
              height={600}
              src={imageUrl}
              alt={hero.image?.alt || ""}
              className="w-full h-auto max-w-[320px] sm:max-w-[400px] rounded-xl object-cover"
              style={{ maxHeight: 400 }}
            />
          </div>
        )}
        <div className="w-full md:flex-1">
          <RichTextPreview className="mb-6" html={hero.headline.html} />
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
