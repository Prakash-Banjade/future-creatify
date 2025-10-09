import { RefItemBlockDto } from "@/schemas/page.schema";
import { ERefRelation } from "../../../../../types/global.types";
import { serverFetch } from "@/lib/data-access.ts/server-fetch";

import Link from "next/link";
import CloudinaryImage from "@/components/ui/cloudinary-image";
import { TeamResponse_Public } from "../../../../../types/team.type";
import { getSocialLogo } from "../../footer";

export default async function TeamsBlock({
  limit,
  order,
  selected,
}: RefItemBlockDto & { refRelation: ERefRelation.Teams }) {
  const urlSearchParams = new URLSearchParams({
    limit: limit?.toString(),
    order: order,
  });

  if (selected?.length)
    urlSearchParams.set("ids", selected.map((s) => s.value)?.join(","));

  const res = await serverFetch("/teams" + `?${urlSearchParams.toString()}`, {
    next: { revalidate: parseInt(process.env.DATA_REVALIDATE_SEC!) },
  });



  if (!res.ok) return null;

  const teams: TeamResponse_Public = await res.json();
  return (
    <>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.data.map((b) => {
          return <TeamCard key={b.id} member={b} />;
        })}
      </section>
      <div className="flex justify-center">
        <Link className="text-primary w-fit flex justify-center" href={"/teams"}>
          View All Teams
        </Link>
      </div>
    </>
  );
}

const TeamCard = ({ member }: { member: TeamResponse_Public[`data`][0] }) => {
  return (
    <div className="card overflow-hidden hover-scale group">
      <div className="relative">
        {member.image && (
          <CloudinaryImage
            src={member.image?.secure_url}
            alt={member.name}
            className="w-full h-80 object-cover"
            width={500}
            height={500}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
            {member.socialLinks && member.socialLinks?.map((s, idx) => (
              <a
                key={idx}
                href={s.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-primary/80 p-2 rounded-full  hover:text-primary transition-colors"
              >
                {getSocialLogo(s.link)}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold">{member.name}</h3>
        <p className="text-primary">{member.role}</p>
        <p className="mt-3 text-slate-600 line-clamp-3">{member.description}</p>
      </div>
    </div>
  );
};
