import { useListSkills, getListSkillsQueryKey } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

export function Skills() {
  const { data: skills, isLoading } = useListSkills({
    query: {
      queryKey: getListSkillsQueryKey()
    }
  });

  const categories = skills ? Array.from(new Set(skills.map(s => s.category))) : [];

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Technical Arsenal.
          </h2>
          <div className="h-1 w-20 bg-accent rounded-full" />
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-12">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-6">
                <Skeleton className="h-8 w-32" />
                <div className="space-y-6">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="space-y-2">
                      <div className="flex justify-between">
                        <Skeleton className="h-5 w-24" />
                        <Skeleton className="h-5 w-8" />
                      </div>
                      <Skeleton className="h-2 w-full rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
            {categories.map((category) => (
              <div key={category} className="space-y-8 p-8 rounded-3xl bg-card border border-border">
                <h3 className="text-xl font-bold font-heading text-foreground flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {category.charAt(0)}
                  </div>
                  {category}
                </h3>
                <div className="space-y-6">
                  {skills?.filter(s => s.category === category).map((skill) => (
                    <div key={skill.id} className="space-y-3 group">
                      <div className="flex justify-between items-center text-sm font-medium">
                        <span className="text-foreground flex items-center gap-2">
                          {skill.iconUrl && (
                            <img src={skill.iconUrl} alt="" className="w-4 h-4 object-contain" />
                          )}
                          {skill.name}
                        </span>
                        <span className="text-muted-foreground group-hover:text-primary transition-colors">{skill.proficiency}%</span>
                      </div>
                      <Progress value={skill.proficiency} className="h-2 bg-secondary" indicatorClassName="bg-gradient-to-r from-primary to-accent" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
