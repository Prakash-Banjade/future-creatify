import { cn } from "@/lib/utils";
import { EHeroLayoutTypes } from "../../../../types/page.types";
import { EAlignment } from "../../../../types/global.types";
import { RichTextPreview } from "@/components/rich-text-preview";
import { THeroSectionDto } from "@/schemas/hero-section.schema";
import CloudinaryImage from "@/components/ui/cloudinary-image";
import RenderHeroCMSLink from "../render-hero-cms-link";

export default function JumboTron({ hero }: { hero: THeroSectionDto }) {
  const layoutType = hero.layout.type;
  if (layoutType !== EHeroLayoutTypes.Jumbotron) return null;

  const alignment = hero.layout.alignment;

  return (
    <section
      className={cn(
        "sm:h-[80vh] sm:max-h-[400px]",
        hero.image?.secure_url && "h-[80vh] max-h-[600px]",
      )}
      aria-label="Hero section"
      style={{ backgroundColor: hero.backgroundColor }}
    >
      {hero.image?.secure_url && (
        <>
          <CloudinaryImage
            src={hero.image.secure_url}
            fill
            alt={hero.image.alt || "Hero background"}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            priority
            fetchPriority="high"
            aria-hidden="true"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
        </>
      )}
      <section
        className={cn(
          "relative z-10 h-full container mx-auto flex flex-col justify-center py-10",
          alignment === EAlignment.Left
            ? "items-start"
            : alignment === EAlignment.Center
              ? "items-center"
              : "items-end"
        )}
      >
        <RichTextPreview className="hero__rich_text hero__rich_text--jumbotron mb-6" html={hero.headline.html} />
        <RenderHeroCMSLink ctas={hero.cta} />
      </section>
    </section>
  );
}
