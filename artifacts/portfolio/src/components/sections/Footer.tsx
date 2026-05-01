import { useGetAbout, getGetAboutQueryKey } from "@workspace/api-client-react";
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function Footer() {
  const { data: about, isLoading } = useGetAbout({
    query: {
      queryKey: getGetAboutQueryKey()
    }
  });

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
            <span className="font-heading font-bold text-primary">V</span>
          </div>
          <span className="font-heading font-bold tracking-tight">
            {isLoading ? <Skeleton className="h-5 w-20" /> : about?.name || "Vinod."}
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          {about?.githubUrl && (
            <a href={about.githubUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github size={20} />
            </a>
          )}
          {about?.linkedinUrl && (
            <a href={about.linkedinUrl} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin size={20} />
            </a>
          )}
          {about?.email && (
            <a href={`mailto:${about.email}`} className="text-muted-foreground hover:text-foreground transition-colors">
              <Mail size={20} />
            </a>
          )}
        </div>

        <p className="text-sm text-muted-foreground flex items-center gap-1">
          © {currentYear} Built with <Heart className="w-4 h-4 text-destructive mx-1 fill-current" /> by {isLoading ? "Vinod" : about?.name?.split(' ')[0] || "Vinod"}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
