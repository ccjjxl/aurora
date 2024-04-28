import Link from "next/link";

type CardProps = {
  title: string;
  description?: string;
  link: string;
};

const Card = ({title, description, link}: CardProps) => {
  return (
    <div className="text-white flex flex-col justify-center items-center hover:-translate-y-2">
      <div>
        <img
          width={200}
          height={200}
          className="border-2 rounded-lg"
          src="/assets/images/podcast/cover.jpg"
          alt=""
        />
      </div>

      <p>
        {" "}
        <Link href={link}>{title} </Link>
      </p>
    </div>
  );
};

const modules = [
  {
    title: "dashboard",
    description: "dashboard",
    link: "/dashboard",
  },
  {
    title: "podcast",
    description: "podcast",
    link: "/dashboard/podcast",
  },
];

export default function Home() {
  return (
    <main className="flex min-h-screen bg-[#151c2c] items-center justify-center p-24">
      <div className="grid grid-cols-2 gap-5">
        {modules.map((item) => (
          <Card {...item} key={item.title} />
        ))}
      </div>
    </main>
  );
}
