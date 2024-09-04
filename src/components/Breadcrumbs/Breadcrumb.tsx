import Link from "next/link";

interface LinkProps {
  link: string;
  name: string;
}

interface BreadcrumbProps {
  previousPages: LinkProps[];
  pageName: string;
}
const Breadcrumb = ({ previousPages, pageName }: BreadcrumbProps) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <nav>
        <ol className="flex items-center gap-2">
          {previousPages.map((page) => (
            <li>
              <Link className="font-medium" href={`/${page.link}`}>
                {page.name} /
              </Link>
            </li>
          ))}
          <li className="font-medium text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
