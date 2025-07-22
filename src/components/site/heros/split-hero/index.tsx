import { RenderHeroProps } from "../render-hero";

export default function SplitHero({ hero }: RenderHeroProps) {
  return (
    <div>{hero.headline.html}</div>
  )
}