import { cn } from "@/lib/utils";
import { EHeroLayoutTypes } from "../../../../types/page.types";
import { RichTextPreview } from "@/components/rich-text-preview";
import { EAlignmentExcludeCenter } from "../../../../types/global.types";
import { THeroSectionDto } from "@/schemas/hero-section.schema";
import RenderHeroCMSLink from "../render-hero-cms-link";
import CloudinaryImage__Server from "@/components/ui/cloudinary-image-server";

export default function SplitHero({ hero }: { hero: THeroSectionDto }) {
  const layoutType = hero.layout.type;
  if (layoutType !== EHeroLayoutTypes.Split_Hero) return null;

  const imagePosition = hero.layout.imagePosition;
  const heroImage = hero.image;

  return (
    <section
      className={cn("relative md:py-36 py-20 overflow-hidden")}
      style={{ backgroundColor: hero.backgroundColor }}
      aria-label="Hero section"
    >
      <div
        className={cn(
          "mx-auto container flex flex-col xl:flex-row items-center gap-10",
        )}
      >
        {heroImage && (
          <div className={cn(
            "flex justify-center items-center w-full md:flex-1 mb-6 md:mb-0",
            imagePosition === EAlignmentExcludeCenter.Right && "order-2"
          )}>
            <CloudinaryImage__Server
              publicId={heroImage.public_id}
              src={heroImage.secure_url}
              width={heroImage.width}
              height={heroImage.height}
              alt={heroImage.alt || "Hero background"}
              className="w-full rounded-2xl h-auto object-cover"
              loading="eager"
              priority
              fetchPriority="high"
            />
          </div>
        )}

        <div className="w-full space-y-12 md:flex-1">
          <RichTextPreview className="hero__rich_text hero__rich_text--split-hero mb-8" html={hero.headline.html} />
          <RenderHeroCMSLink ctas={hero.cta} />
        </div>
      </div>
    </section>
  );
}
