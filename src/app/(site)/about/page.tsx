import AboutStoryLeftWrapper from "@/components/site/about/story-left-wrapper"
import AboutStoryRightWrapper from "@/components/site/about/story-right-wrapper"
import AboutValuesCardWrapper from "@/components/site/about/values-card-wrapper"
import AboutVisionWrapper from "@/components/site/about/vision-wrapper"
import HeroWrapper from "@/components/site/hero-wrapper"
import { Award, BookOpen, Heart, Users } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-cream">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <HeroWrapper>
              <span className="text-primary font-semibold">About Us</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-3 mb-6 text-shadow-lg">
                Our Journey in <span className="text-primary">Educational Innovation</span>
              </h1>
              <p className="text-lg text-slate-600">
                We&apos;re passionate about transforming education through innovative pedagogy and
                empowering educators to make a difference in shaping the minds and futures of students.
              </p>
            </HeroWrapper>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AboutStoryLeftWrapper>
              <section className="relative">
                <Image
                  src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Our Story"
                  className="rounded-xl shadow-xl"
                  width={800}
                  height={800}
                />
                <div className="absolute -bottom-6 -right-6 bg-primary text-white p-6 rounded-xl shadow-lg hidden md:block">
                  <p className="text-3xl font-bold">10+</p>
                  <p>Years of Experience</p>
                </div>
              </section>
            </AboutStoryLeftWrapper>

            <AboutStoryRightWrapper>
              <span className="text-primary font-semibold">Our Story</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                How Future Creatify Began
              </h2>
              <p className="text-muted-foreground mb-4">
                Future Creatify was founded in 2015 by a group of passionate educators who
                recognized the need for innovation in teaching methodologies. What started
                as a small initiative has grown into a comprehensive education hub serving
                thousands of educators worldwide.
              </p>
              <p className="text-muted-foreground mb-8">
                Our journey has been defined by a commitment to excellence, a passion for
                creativity, and a belief in the transformative power of education. Through
                our work, we aim to inspire a new generation of educators who approach teaching
                with innovation, compassion, and a focus on student-centered learning.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-cream p-4 rounded-lg">
                  <p className="text-3xl font-bold text-primary">5000+</p>
                  <p className="text-slate-700">Educators Trained</p>
                </div>
                <div className="bg-cream p-4 rounded-lg">
                  <p className="text-3xl font-bold text-primary">100+</p>
                  <p className="text-slate-700">Programs Created</p>
                </div>
                <div className="bg-cream p-4 rounded-lg">
                  <p className="text-3xl font-bold text-primary">30+</p>
                  <p className="text-slate-700">Countries Reached</p>
                </div>
                <div className="bg-cream p-4 rounded-lg">
                  <p className="text-3xl font-bold text-primary">200+</p>
                  <p className="text-slate-700">Partnerships</p>
                </div>
              </div>
            </AboutStoryRightWrapper>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="section bg-cream">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-primary font-semibold">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-slate-600">
              Our core values guide everything we do at Future Creatify. They shape our
              programs, inform our interactions, and inspire our innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Innovation",
                description: "We constantly evolve our methods and embrace new ideas to stay at the forefront of educational excellence.",
                icon: <BookOpen className="text-primary" size={32} />,
                delay: 0.1
              },
              {
                title: "Excellence",
                description: "We strive for the highest standards in all our programs, resources, and interactions with our community.",
                icon: <Award className="text-primary" size={32} />,
              },
              {
                title: "Collaboration",
                description: "We believe in the power of working together, sharing knowledge, and learning from diverse perspectives.",
                icon: <Users className="text-primary" size={32} />,
              },
              {
                title: "Compassion",
                description: "We approach education with empathy, understanding that each learner and educator has unique needs and challenges.",
                icon: <Heart className="text-primary" size={32} />,
              }
            ].map((value, index) => (
              <AboutValuesCardWrapper index={index} key={index}>
                <section className="card p-8 text-center hover-scale">
                  <div className="mx-auto mb-4 bg-primary/10 p-4 rounded-full inline-block">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-slate-600">{value.description}</p>
                </section>
              </AboutValuesCardWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="relative section bg-[#fcfcfc] overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <AboutVisionWrapper>
              <span className="text-primary font-semibold">Our Vision</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">
                Looking to the Future
              </h2>
              <p className="text-lg mb-8 text-muted-foreground">
                We envision a world where every educator is empowered with the tools,
                knowledge, and support to create transformative learning experiences.
                A world where education is not just about imparting knowledge but about
                inspiring curiosity, fostering creativity, and nurturing holistic development.
              </p>
              <p className="text-lg font-serif italic">
                &quot;How do we, as educators, make a difference every day in shaping the minds
                and futures of our students? This question guides our work every day at Future Creatify.&quot;
              </p>
            </AboutVisionWrapper>
          </div>
        </div>

        {/* Abstract design elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-primary translate-x-[-30%] translate-y-[-30%]"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent translate-x-[30%] translate-y-[30%]"></div>
        </div>
      </section>
    </>
  )
}