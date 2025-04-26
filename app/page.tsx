import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Brain,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { routes } from "@/shared/utils/routes";
import { ModeToggle } from "@/shared/components/ModeToggle";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <nav className="border-b">
        <div className="flex items-center justify-between px-12 py-4">
          <h1 className="text-2xl font-bold">Book Tutor</h1>
          <div className="flex gap-4">
            <ModeToggle />
            <Link href={routes.signup}>
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center py-24 gap-8">
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Your AI-Powered Study Companion
          </h1>
          <p className="text-xl text-muted-foreground">
            Get instant answers, explanations, and guidance for your academic
            questions. Available 24/7.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href={routes.chats}>
            <Button size="lg" className="gap-2">
              Try Now <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t bg-muted/50">
        <div className="py-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Book Tutor?
          </h2>
          <div className="px-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 p-6 bg-background rounded-lg cursor-pointer border-2 border-transparent  hover:border-primary transition-all shadow-lg"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t">
        <div className="py-24 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold">
              Ready to Transform Your Learning?
            </h2>
            <p className="text-muted-foreground mt-4 mb-6">
              Join thousands of students who are already benefiting from
              personalized AI tutoring.
            </p>
            <Link href={routes.chats}>
              <Button size="lg" className="gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="py-8 flex justify-between items-center px-8">
          <p className="text-sm text-muted-foreground">
            © 2024 Book Tutor. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href={routes.signin}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Privacy Policy
            </Link>
            <Link
              href={routes.signin}
              className="text-sm text-muted-foreground hover:text-primary"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: <MessageSquare className="w-6 h-6 text-primary" />,
    title: "24/7 Instant Support",
    description:
      "Get answers to your questions anytime, anywhere. Our AI tutor never sleeps.",
  },
  {
    icon: <Brain className="w-6 h-6 text-primary" />,
    title: "Smart Learning",
    description:
      "Adaptive learning system that understands your pace and adjusts accordingly.",
  },
  {
    icon: <BookOpen className="w-6 h-6 text-primary" />,
    title: "Comprehensive Coverage",
    description:
      "From mathematics to literature, we cover all major academic subjects.",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-primary" />,
    title: "Interactive Experience",
    description:
      "Engage in natural conversations and get detailed explanations.",
  },
  {
    title: "Progress Tracking",
    icon: <MessageSquare className="w-6 h-6 text-primary" />,
    description:
      "Monitor your learning journey with detailed analytics and insights.",
  },
  {
    title: "Personalized Learning",
    icon: <MessageSquare className="w-6 h-6 text-primary" />,
    description:
      "Get customized study plans and recommendations based on your needs.",
  },
];
