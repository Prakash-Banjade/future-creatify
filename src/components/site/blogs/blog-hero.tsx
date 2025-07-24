import CloudinaryImage from "@/components/ui/cloudinary-image";
import { TBlog } from "../../../../types/blog.types";
import { getReadingTimeInMinutes } from "@/lib/utils";

export default function BlogHero({
    title,
    publishedAt,
    coverImage,
    length
}: TBlog) {
    return (
        <div className="relative -mt-[10.4rem] flex items-end">
            <div className="container z-10 relative pb-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl font-medium text-shadow-md">{title}</h1>
                    <div className="flex flex-col md:flex-row gap-4 md:gap-16">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <p className="text-sm">Author</p>
                                <p className="font-medium">Prakash Banjade</p>
                            </div>
                        </div>
                        {publishedAt && (
                            <div className="flex flex-col gap-1">
                                <p className="text-sm">Date Published</p>

                                <time
                                    dateTime={new Date(publishedAt).toDateString()}
                                    className="font-medium"
                                >
                                    {new Date(publishedAt).toDateString()}
                                </time>
                            </div>
                        )}
                        <div className="flex flex-col gap-1">
                            <p className="text-sm">Read Time</p>
                            <p className="font-medium">{getReadingTimeInMinutes(length)} min</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="min-h-[80vh] select-none">
                {coverImage && (
                    <CloudinaryImage
                        fill
                        priority
                        src={coverImage}
                        alt={title}
                        className="object-cover"
                    />
                )}
                <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-background to-transparent" />
            </div>
        </div>
    )
}