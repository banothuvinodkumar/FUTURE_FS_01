import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Menu, X, Github, Linkedin, Mail } from "lucide-react";
import { useGetAbout, getGetAboutQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: about, isLoading } = useGetAbout({
    query: {
      queryKey: getGetAboutQueryKey()
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-border py-4 shadow-sm"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:border-primary transition-colors">
            <span className="font-heading font-bold text-primary text-xl">V</span>
          </div>
          <span className="font-heading font-bold text-lg tracking-tight hidden sm:block">
            {isLoading ? <Skeleton className="h-6 w-24" /> : about?.name || "Vinod."}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 pl-6 border-l border-border">
            <a href="https://github.com/banothuvinodkumar" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github size={18} />
            </a>
            <a href="https://www.linkedin.com/in/vinod-kumar-banothu-559a14325" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin size={18} />
            </a>
            <button 
              onClick={() => scrollTo("contact")}
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors cursor-pointer"
            >
              Hire Me
            </button>
          </div>
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden text-foreground p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <button
                  onClick={() => scrollTo(link.id)}
                  className="text-lg font-medium text-foreground w-full text-left"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4 pt-4 border-t border-border">
            <a href="https://github.com/banothuvinodkumar" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/vinod-kumar-banothu-559a14325" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
