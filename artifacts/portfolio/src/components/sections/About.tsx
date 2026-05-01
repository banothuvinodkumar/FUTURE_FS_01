import { useGetAbout, getGetAboutQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Briefcase, Code, GraduationCap } from "lucide-react";

export function About() {
  const { data: about, isLoading } = useGetAbout({
    query: {
      queryKey: getGetAboutQueryKey()
    }
  });

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-card/50">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 gap-8">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              About Me.
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full" />
            <div className="text-muted-foreground text-lg leading-relaxed pt-4">
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-5/6" />
                  <Skeleton className="h-5 w-4/6" />
                </div>
              ) : (
                about?.bio || "I'm a full-stack developer passionate about building scalable, user-centric applications. With a strong foundation in modern web technologies, I bridge the gap between elegant interfaces and robust backend systems."
              )}
            </div>
          </div>
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4 md:gap-6 w-full md:w-auto shrink-0">
            <div className="p-6 rounded-2xl bg-background border border-border/50 flex flex-col gap-2">
              <MapPin className="w-6 h-6 text-primary" />
              <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Location</span>
              <span className="font-medium text-foreground">
                {isLoading ? <Skeleton className="h-6 w-24" /> : about?.location || "India"}
              </span>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border/50 flex flex-col gap-2">
              <Briefcase className="w-6 h-6 text-accent" />
              <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Experience</span>
              <span className="font-medium text-foreground">
                {isLoading ? <Skeleton className="h-6 w-16" /> : `${about?.yearsExperience || 0}+ Years`}
              </span>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border/50 flex flex-col gap-2">
              <Code className="w-6 h-6 text-primary" />
              <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Focus</span>
              <span className="font-medium text-foreground">Full Stack</span>
            </div>
            <div className="p-6 rounded-2xl bg-background border border-border/50 flex flex-col gap-2">
              <GraduationCap className="w-6 h-6 text-accent" />
              <span className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Status</span>
              <span className="font-medium text-foreground">
                {isLoading ? <Skeleton className="h-6 w-24" /> : about?.availability || "Available"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
