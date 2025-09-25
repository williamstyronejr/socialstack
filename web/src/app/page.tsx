import LandingHeader from "@/components/landing/LandingHeader";
import LandingFooter from "@/components/landing/Footer";
import { Link } from "lucide-react";

export default function Home() {
  return (
    <>
      <LandingHeader />

      <section className="relative overflow-hidden py-20 md:py-32 max-w-7xl mx-auto">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-black tracking-tight text-balance md:text-6xl lg:text-7xl">
              Manage Your Social Media{" "}
              <span className="text-accent">Like a Pro</span>
            </h1>

            <p className="mb-8 text-lg text-muted-foreground text-pretty md:text-xl lg:text-2xl">
              Join forces with your team to create captivating content.
              Streamline your social media management across all platforms with
              powerful collaboration tools designed for creators.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/signup"
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8"
              >
                Start Your Free Trial
              </Link>
              <Link href="/demo" className="">
                Watch Demo
              </Link>
            </div>

            <div className="mt-12 text-sm text-muted-foreground">
              No credit card required • 14-day free trial • Cancel anytime
            </div>
          </div>

          <div className="mt-16 relative">
            <div className="mx-auto max-w-5xl">
              <div className="relative rounded-xl border bg-card p-2 shadow-2xl">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-background/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-accent/5 max-w-7xl mx-auto">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-black tracking-tight text-balance md:text-4xl lg:text-5xl mb-6">
              Ready to elevate your{" "}
              <span className="text-accent">social media game?</span>
            </h2>
            <p className="text-lg text-muted-foreground text-pretty mb-8 md:text-xl">
              Join thousands of creators who are already using CreatorHub to
              streamline their social media management and grow their audience
              faster than ever.
            </p>

            {/* <div className="flex flex-wrap justify-center gap-6 mb-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div> */}

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/signup"
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8"
              >
                Start Your Free Trial
              </Link>

              <Link href="/demo" className="text-base px-8 bg-transparent">
                Schedule a Demo
              </Link>
            </div>

            <p className="mt-6 text-sm text-muted-foreground">
              Over 10,000+ creators trust CreatorHub with their social media
              management
            </p>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-muted/30 max-w-7xl mx-auto">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-black tracking-tight text-balance md:text-4xl lg:text-5xl">
              Everything you need to{" "}
              <span className="text-accent">scale your presence</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground text-pretty">
              Powerful features designed to help creators and teams manage their
              social media more effectively.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))} */}
          </div>
        </div>
      </section>

      <LandingFooter />
    </>
  );
}
