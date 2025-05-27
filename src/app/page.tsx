import BlogCard from "@/components/site/blogs/blog-card";
import ContactForm from "@/components/site/contact-form";
import ContactFormWrapper from "@/components/site/home/contact-form-wrapper";
import GetInTouchWrapper from "@/components/site/home/get-in-touch-wrapper";
import HeroLeftWrapper from "@/components/site/home/hero-left-wrapper";
import HeroRightWrapper from "@/components/site/home/hero-right-wrapper";
import MissionCardWrapper from "@/components/site/home/mission-card-wrapper";
import SiteLayout from "@/components/site/site-layout";
import TestimonialCard from "@/components/site/testimonials/testimonial-card";
import { Button, LinkButton } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { featuredBlogs } from "@/data/blogs-data";
import { testimonials } from "@/data/testimonialData";
import { ArrowRight, BookOpen, Calendar, Mail, MapPin, Users } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <SiteLayout>
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-cream">
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-2 items-center gap-12">
            <HeroLeftWrapper>
              <span className="text-primary font-semibold">Future Creatify</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-3 mb-6 text-shadow-lg">
                Empowering Educators for a <span className="text-primary">Creative Future</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8">
                We train, facilitate, and design innovative programs through
                project-based integrated pedagogy to shape the minds and futures of students.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button type="button" asChild className="px-7 py-6 text-base">
                  <Link href="/about">
                    Learn More
                  </Link>
                </Button>
                <Button type="button" variant={'outline'} asChild className="group !px-7 py-6 text-base text-primary border-primary border-2 bg-transparent hover:bg-primary/5 hover:text-primary">
                  <Link href="/blogs">
                    Read Our Blogs
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform ease-in-out duration-300" />
                  </Link>
                </Button>
              </div>
            </HeroLeftWrapper>

            <HeroRightWrapper>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/3769714/pexels-photo-3769714.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Education Innovation"
                  className="rounded-xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="bg-primary text-white p-2 rounded-md">
                      <BookOpen size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">100+</p>
                      <p className="text-sm text-slate-500">Programs Created</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="bg-secondary p-2 rounded-md">
                      <Users size={20} />
                    </div>
                    <div>
                      <p className="font-semibold">5000+</p>
                      <p className="text-sm text-slate-500">Educators Trained</p>
                    </div>
                  </div>
                </div>
              </div>
            </HeroRightWrapper>
          </div>
        </div>

        {/* Abstract shapes */}
        <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-primary/10 rounded-tl-full -z-0" />
        <div className="absolute left-0 top-0 w-1/4 h-1/4 bg-accent/10 rounded-br-full -z-0" />
      </section >

      {/* Mission Section */}
      <section className="section bg-white" >
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-semibold">Our Mission</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
              Making a Difference in Education
            </h2>
            <p className="text-slate-600">
              At Future Creatify, we believe in the power of education to transform lives.
              Our mission is to empower educators with innovative teaching methodologies
              and resources to create meaningful learning experiences.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovative Pedagogy",
                description: "Developing cutting-edge teaching methods that inspire creativity and critical thinking in students.",
                icon: <BookOpen className="text-primary" size={32} />,
                delay: 0.1
              },
              {
                title: "Educator Support",
                description: "Providing resources, training, and community for educators to excel in their noble profession.",
                icon: <Users className="text-primary" size={32} />,
                delay: 0.2
              },
              {
                title: "Project-Based Learning",
                description: "Facilitating hands-on, engaging projects that make learning relevant and memorable for students.",
                icon: <Calendar className="text-primary" size={32} />,
                delay: 0.3
              }
            ].map((item, index) => (
              <MissionCardWrapper index={index + 1} key={index}>
                <Card className="gap-1 hover:shadow-2xs transition-all">  
                  <CardHeader className="!pb-0">
                    <span className="mb-4">{item.icon}</span>
                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-2">{item.description}</p>
                  </CardContent>
                </Card>
              </MissionCardWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blogs Section */}
      <section className="section bg-cream" >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <span className="text-primary font-semibold">Recent Blogs</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                Educational Insights & Resources
              </h2>
            </div>
            <LinkButton href="/blogs">
              View All Blogs
            </LinkButton>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 staggered-fade-in">
            {
              featuredBlogs.map((blog, index) => (
                <BlogCard key={blog.id} blog={blog} index={index} />
              ))
            }
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-white" >
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-semibold">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
              What Our Community Says
            </h2>
            <p className="text-slate-600">
              Don&apos;t just take our word for it. Hear from the educators and institutions
              who have partnered with us and experienced transformative results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {
              testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  testimonial={testimonial}
                  index={index}
                />
              ))
            }
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section bg-cream">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <GetInTouchWrapper>
              <span className="text-primary font-semibold">Get In Touch</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                Let&apos;s Connect and Collaborate
              </h2>
              <p className="text-slate-600 mb-8">
                Whether you&apos;re an educator looking for resources, a school interested in
                our programs, or just want to learn more about what we do, we&apos;d love to hear from you.
              </p>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-md mr-4">
                    <MapPin className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Our Location</h4>
                    <p className="text-slate-600">123 Education Street, Knowledge City, 10001</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-primary/10 p-3 rounded-md mr-4">
                    <Mail className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Email Us</h4>
                    <p className="text-slate-600">info@futurecreatify.com</p>
                  </div>
                </div>
              </div>
            </GetInTouchWrapper>

            <ContactFormWrapper>
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
                <ContactForm />
              </div>
            </ContactFormWrapper>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
