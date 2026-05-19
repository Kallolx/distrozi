import { RiSoundModuleLine, RiArrowRightUpLine } from "react-icons/ri";

import Button from "../ui/Button";

const navLinks = ["Discover", "Distribution", "Analytics", "Pricing"];

export default function Navbar() {
  return (
    <header className="w-full">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-strong border border-subtle">
            <RiSoundModuleLine className="text-primary" size={20} />
          </span>
          <span className="text-lg font-semibold text-foreground">Company X</span>
        </div>

        <div className="hidden items-center gap-8 text-sm font-medium text-foreground md:flex">
          {navLinks.map((item) => (
            <a key={item} href="#" className="transition-opacity hover:opacity-70">
              {item}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button as="a" href="#" variant="secondary" size="md">
            Get Started
            <RiArrowRightUpLine size={18} />
          </Button>
        </div>
      </nav>
    </header>
  );
}
