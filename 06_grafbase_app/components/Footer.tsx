import React from "react";
import Image from "next/image";
import { footerLinks } from "@/constants";
import Link from "next/link";

type ColumnProps = {
  title: string;
  links: string[];
};

const FooterColumn = ({ title, links }: ColumnProps) => (
  <div className="footer_column">
    <h4 className="font-semibold">{title}</h4>
    <ul className="flex flex-col gap-2 font-normal">
      {links.map((link) => (
        <Link href="/" key={link}>
          {link}
        </Link>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className="flexStart footer">
      <div className="flex flex-col gap-12 w-full">
        <div className="flex items-start flex-col">
          <Image src="/logo-purple.svg" alt="logo" width={115} height={38} />
          <p className="text-start text-sm font-normal mt-5 max-w-xs">
            Flexible is the worlds leading community for creatives to share,
            grow, and get hired.
          </p>
        </div>
        <div className="flex flex-wrap gap-12">
          <FooterColumn
            title={footerLinks[0].title}
            links={footerLinks[0].links}
          />
          <FooterColumn
            title={footerLinks[1].title}
            links={footerLinks[1].links}
          />
          <FooterColumn
            title={footerLinks[2].title}
            links={footerLinks[2].links}
          />
          <FooterColumn
            title={footerLinks[3].title}
            links={footerLinks[3].links}
          />
          <FooterColumn
            title={footerLinks[4].title}
            links={footerLinks[4].links}
          />
        </div>
      </div>
    </footer>
  );
};
export default Footer;
