import { useListProjects, getListProjectsQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Projects() {
  const { data: projects, isLoading } = useListProjects(undefined, {
    query: {
      queryKey: getListProjectsQueryKey()
    }
  });

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-card/30">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Selected Work.
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="overflow-hidden border-border bg-background">
                <Skeleton className="h-64 w-full rounded-none" />
                <CardHeader>
                  <Skeleton className="h-8 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                    <Skeleton className="h-6 w-14 rounded-full" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            projects?.map((project) => (
              <Card key={project.id} className="group overflow-hidden border-border/50 bg-background hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 flex flex-col h-full">
                <div className="relative h-64 md:h-72 overflow-hidden bg-secondary">
                  {project.imageUrl ? (
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                      <span className="text-4xl font-heading font-bold text-foreground/20">{project.title.charAt(0)}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform">
                        <ArrowUpRight className="w-6 h-6" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-background flex items-center justify-center text-foreground hover:scale-110 transition-transform">
                        <Github className="w-6 h-6" />
                      </a>
                    )}
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-accent text-accent-foreground text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                      Featured
                    </div>
                  )}
                </div>
                <CardHeader className="flex-none">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <div className="text-sm text-primary font-medium mb-2">{project.category}</div>
                      <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">{project.title}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </CardContent>
                <CardFooter className="pt-4 border-t border-border/50">
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-secondary/50 hover:bg-secondary text-secondary-foreground font-medium">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
