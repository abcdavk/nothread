"use client";

import React from "react";
import {
  FaXTwitter,
  FaGithub,
  FaInstagram,
} from "react-icons/fa6";

import { FaDiscord } from "react-icons/fa";
import { TbBrandFiverr } from "react-icons/tb";
import { socialLinks } from "../config";

const YEAR = new Date().getFullYear();

interface ISocialLink {
  href: string
  icon: any
}

function SocialLink({ href, icon: Icon }: ISocialLink) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white">
      <Icon />
    </a>
  );
}

export function SocialLinks() {
  return (
    <div className="flex text-lg gap-3.5 float-right transition-opacity duration-300 hover:opacity-90">
      <SocialLink href={socialLinks.discord} icon={FaDiscord} />
      <SocialLink href={socialLinks.github} icon={FaGithub} />
      <SocialLink href={socialLinks.instagram} icon={FaInstagram} />
      <SocialLink href={socialLinks.twitter} icon={FaXTwitter} />
      <SocialLink href={socialLinks.fiverr} icon={TbBrandFiverr} />
      {/* <SocialLink href={socialLinks.linkedin} icon={FaLinkedinIn} /> */}
      {/* <SocialLink href={socialLinks.email} icon={TbMailFilled} /> */}
      {/* <a href="/rss.xml" target="_self">
        <FaRss />
      </a> */}
    </div>
  );
}

export function Footer() {
  return (
    <small className="block lg:mt-24 mt-16 text-[#1C1C1C] dark:text-[#D4D4D4]">
      <time>© {YEAR}</time>{" "}
      <a
        className="no-underline text-white/50 hover:text-white"
        href={socialLinks.instagram}
        target="_blank"
        rel="noopener noreferrer"
      >
        by abcdave
      </a>
      <style jsx>{`
        @media screen and (max-width: 480px) {
          article {
            padding-top: 2rem;
            padding-bottom: 4rem;
          }
        }
      `}</style>
      <SocialLinks />
    </small>
  );
}
