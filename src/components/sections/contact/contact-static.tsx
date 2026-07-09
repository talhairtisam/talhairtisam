import { profile, socialLinks } from "@/data";
import { SocialIcon } from "@/components/icons/social-icon";
import { StaticButton } from "@/components/ui/static-button";

export function ContactStatic() {
  return (
    <>
      <div className="mt-8 flex justify-center">
        <StaticButton variant="secondary" href={`mailto:${profile.email}`}>
          {profile.email}
        </StaticButton>
      </div>

      <p className="mt-8 hidden font-mono text-xs text-text-muted lg:block">
        Social links are on the left rail — or connect below
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3 lg:mt-4 lg:scale-95 lg:opacity-70">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 font-mono text-xs text-text-muted transition-all hover:border-accent-violet/50 hover:text-text"
          >
            <SocialIcon name={link.name} size={14} />
            {link.name}
          </a>
        ))}
      </div>
    </>
  );
}
