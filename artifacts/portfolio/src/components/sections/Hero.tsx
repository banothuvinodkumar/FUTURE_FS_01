import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { useGetAbout, getGetAboutQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import vinodPhoto from "@assets/IMG_20260207_223225.jpg_1777649007736.jpeg";

export function Hero() {
  const { data: about, isLoading } = useGetAbout({
    query: {
      queryKey: getGetAboutQueryKey()
    }
  });

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="min-h-[100dvh] pt-24 pb-16 md:pt-32 md:pb-24 flex items-center relative overflow-hidden">
      {/* Background visual elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-accent/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNykiLz48L3N2Zz4=')] opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="flex flex-col gap-6 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary w-fit animate-in fade-in slide-in-from-bottom-4 duration-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-semibold tracking-wide uppercase">Available for work</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                Hi, I'm{" "}
                {isLoading ? (
                  <Skeleton className="h-12 md:h-16 w-64 inline-block align-middle" />
                ) : (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-300% animate-gradient">
                    {about?.name?.split(' ')[0] || "Vinod"}
                  </span>
                )}
                .
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-muted-foreground animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                {isLoading ? (
                  <Skeleton className="h-8 md:h-10 w-3/4" />
                ) : (
                  about?.title || "Full Stack Developer"
                )}
              </h2>
            </div>

            <div className="text-base md:text-lg text-muted-foreground/80 leading-relaxed max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-5/6" />
                  <Skeleton className="h-5 w-4/6" />
                </div>
              ) : (
                about?.bio || "I build exceptional digital experiences that are fast, accessible, and visually compelling."
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
              <Button size="lg" className="group" onClick={() => scrollTo("projects")}>
                View My Work
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="group" onClick={() => scrollTo("contact")}>
                Contact Me
              </Button>
              
              {about?.resumeUrl && (
                <Button size="lg" variant="ghost" asChild className="group">
                  <a href={about.resumeUrl} target="_blank" rel="noreferrer">
                    <Download className="mr-2 w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                    Resume
                  </a>
                </Button>
              )}
            </div>

            <div className="flex items-center gap-4 pt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
              <span className="text-sm text-muted-foreground/60 font-medium uppercase tracking-wider">Connect:</span>
              <div className="flex items-center gap-3">
                {about?.githubUrl && (
                  <a href={about.githubUrl} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-card border border-border hover:border-primary/50 hover:text-primary transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {about?.linkedinUrl && (
                  <a href={about.linkedinUrl} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-card border border-border hover:border-primary/50 hover:text-primary transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {about?.email && (
                  <a href={`mailto:${about.email}`} className="p-2 rounded-full bg-card border border-border hover:border-primary/50 hover:text-primary transition-colors">
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="relative mx-auto lg:ml-auto w-full max-w-md lg:max-w-none aspect-[4/5] lg:aspect-square animate-in fade-in zoom-in-95 duration-1000 delay-300">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-[2rem] transform rotate-3 scale-105 transition-transform duration-700 hover:rotate-6"></div>
            <div className="absolute inset-0 bg-background border border-border/50 rounded-[2rem] transform -rotate-3 transition-transform duration-700 hover:-rotate-1 overflow-hidden group">
              <img 
                src={vinodPhoto} 
                alt="Vinod Kumar Banothu" 
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 grayscale-[0.2] group-hover:grayscale-0"
              />
              <div className="absolute inset-0 border-2 border-primary/20 rounded-[2rem] z-10 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none"></div>
            </div>
            
            {/* Floating stats card */}
            {!isLoading && about?.yearsExperience && (
              <div className="absolute -bottom-6 -left-6 bg-card/90 backdrop-blur-md border border-border p-4 rounded-xl shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-primary">{about.yearsExperience}+</span>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Years Exp.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
