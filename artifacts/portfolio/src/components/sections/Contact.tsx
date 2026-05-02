import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSendContactMessage } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Send } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export function Contact() {
  const { toast } = useToast();
  const sendMessage = useSendContactMessage();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    sendMessage.mutate({ data }, {
      onSuccess: () => {
        toast({
          title: "Message Sent",
          description: "Thanks for reaching out! I'll get back to you soon.",
        });
        form.reset();
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Something went wrong. Please try again later.",
        });
      }
    });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                Let's Work Together.
              </h2>
              <div className="h-1 w-20 bg-accent rounded-full" />
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              Have a project in mind or want to explore an opportunity? Drop me a message and let's build something extraordinary.
            </p>

            <div className="p-8 rounded-3xl bg-card border border-border flex flex-col gap-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Direct Contact</h3>
                <p className="text-muted-foreground mb-4">Prefer direct email? Reach out at:</p>
                <a href="mailto:itsvinodkumarcse@gmail.com" className="text-xl font-medium text-foreground hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4">
                  {Email Me}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-card p-8 md:p-10 rounded-[2.5rem] border border-border shadow-2xl shadow-black/5">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase text-xs font-bold tracking-wider">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" className="bg-background border-border focus-visible:ring-primary h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-muted-foreground uppercase text-xs font-bold tracking-wider">Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" type="email" className="bg-background border-border focus-visible:ring-primary h-12" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground uppercase text-xs font-bold tracking-wider">Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Project Inquiry" className="bg-background border-border focus-visible:ring-primary h-12" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-muted-foreground uppercase text-xs font-bold tracking-wider">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell me about your project..." 
                          className="min-h-[150px] resize-none bg-background border-border focus-visible:ring-primary" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full group h-14 text-base"
                  disabled={sendMessage.isPending}
                >
                  {sendMessage.isPending ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
