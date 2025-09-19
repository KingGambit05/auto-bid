// app/about/page.tsx - About Page
import React from "react";
import Image from "next/image";
import { 
  Users, 
  Target, 
  Shield, 
  Globe,  
  Heart, 
  Lightbulb,
  CheckCircle,
  Building,
} from "lucide-react";

export default function AboutPage() {
  const milestones = [
    {
      year: "2018",
      title: "Company Founded",
      description: "Started with a vision to revolutionize car auctions"
    },
    {
      year: "2019",
      title: "First 1,000 Users",
      description: "Reached our first major user milestone"
    },
    {
      year: "2020",
      title: "Global Expansion",
      description: "Expanded operations to 15 countries worldwide"
    },
    {
      year: "2021",
      title: "$100M in Sales",
      description: "Crossed $100 million in total auction sales"
    },
    {
      year: "2022",
      title: "Mobile App Launch",
      description: "Launched iOS and Android apps for mobile bidding"
    },
    {
      year: "2023",
      title: "AI Integration",
      description: "Introduced AI-powered vehicle authentication"
    },
    {
      year: "2024",
      title: "50,000+ Users",
      description: "Reached 50,000+ registered users globally"
    }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      image: "/api/placeholder/300/300",
      bio: "Former automotive executive with 15+ years in the industry. Passionate about bringing transparency to car auctions."
    },
    {
      name: "Michael Rodriguez",
      role: "CTO & Co-Founder",
      image: "/api/placeholder/300/300",
      bio: "Technology veteran who previously built auction platforms for major tech companies. Expert in real-time systems."
    },
    {
      name: "Emily Johnson",
      role: "Head of Operations",
      image: "/api/placeholder/300/300",
      bio: "Operations specialist with a background in logistics and marketplace management. Ensures smooth auction processes."
    },
    {
      name: "David Park",
      role: "Head of Trust & Safety",
      image: "/api/placeholder/300/300",
      bio: "Former law enforcement with expertise in fraud prevention and digital security. Keeps our platform safe."
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "Every transaction is secure, verified, and transparent. We believe trust is the foundation of great auctions."
    },
    {
      icon: Heart,
      title: "Passion for Cars",
      description: "We're car enthusiasts ourselves. We understand the emotional connection between people and their vehicles."
    },
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We constantly push boundaries with new technology to improve the auction experience for everyone."
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "We connect car lovers worldwide, breaking down geographical barriers in the automotive market."
    }
  ];

  const stats = [
    { number: "50,000+", label: "Active Users" },
    { number: "15", label: "Countries" },
    { number: "500M+", label: "Total Sales" },
    { number: "99.2%", label: "User Satisfaction" }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-black mb-6">
              About AuctionHub
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We&apos;re revolutionizing the way people buy and sell cars through transparent, 
              secure, and accessible online auctions. Our mission is to create the world&apos;s 
              most trusted automotive marketplace.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-3 py-1 bg-black text-white rounded-full text-sm font-medium mb-6">
                <Target className="h-4 w-4 mr-2" />
                Our Mission
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-black mb-6">
                Making Car Auctions Accessible to Everyone
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We believe that buying and selling cars should be transparent, secure, and exciting. 
                Our platform eliminates the traditional barriers of physical auctions, allowing anyone, 
                anywhere to participate in the automotive market.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Democratize access to premium vehicles worldwide</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Ensure every transaction is secure and transparent</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">Build a global community of automotive enthusiasts</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gray-200 rounded-2xl overflow-hidden">
                {/* <img 
                  src="/api/placeholder/600/450" 
                  alt="Team at work"
                  className="w-full h-full object-cover"
                /> */}
                <Image
                  src="/api/placeholder/600/450" 
                  alt="Team at work"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-6 border">
                <div className="text-2xl font-bold text-black">6</div>
                <div className="text-sm text-gray-600">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-gray-300">
              See how we&apos;re transforming the automotive auction industry.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape the experience we create for our users.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="flex items-start space-x-4 p-6 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-gray-600">
              From startup to industry leader – here&apos;s how we&apos;ve grown.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-0.5 bg-gray-300"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                      <div className="text-sm font-medium text-gray-500 mb-1">{milestone.year}</div>
                      <h3 className="text-xl font-semibold text-black mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-black rounded-full border-4 border-white shadow-md z-10 flex-shrink-0"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate people behind AuctionHub who are dedicated to revolutionizing car auctions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <Image
                    src={member.image} 
                    alt={member.name}
                    width={40}
                    height={40}
                    className="w-48 h-48 bg-gray-300 rounded-xl mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold text-black mb-1">{member.name}</h3>
                <div className="text-sm font-medium text-gray-500 mb-3">{member.role}</div>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Want to Learn More?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We&apos;d love to hear from you. Get in touch with our team to learn more about 
            AuctionHub and how we can help you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-3 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <Building className="mr-2 h-5 w-5" />
              Contact Us
            </a>
            <a
              href="/careers"
              className="inline-flex items-center px-8 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-black transition-all duration-300"
            >
              <Users className="mr-2 h-5 w-5" />
              Join Our Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}