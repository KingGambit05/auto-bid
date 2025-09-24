// app/privacy/page.tsx - Privacy Policy Page
import React from "react";
import { Shield, Eye, Lock, UserCheck, FileText, Clock, Mail, Phone } from "lucide-react";

export default function PrivacyPage() {
  const lastUpdated = "January 15, 2025";

  const sections = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: Eye,
      content: [
        {
          subtitle: "Personal Information",
          text: "When you create an account, we collect personal information such as your name, email address, phone number, and billing information. This information is necessary to provide our auction services and comply with legal requirements."
        },
        {
          subtitle: "Vehicle Information",
          text: "For sellers, we collect detailed information about vehicles being auctioned, including VIN numbers, specifications, condition reports, and photographs."
        },
        {
          subtitle: "Usage Data",
          text: "We automatically collect information about how you interact with our platform, including IP addresses, browser types, pages visited, and auction activity."
        },
        {
          subtitle: "Communications",
          text: "We maintain records of communications between users through our platform, including messages, bids, and customer support interactions."
        }
      ]
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      icon: UserCheck,
      content: [
        {
          subtitle: "Service Provision",
          text: "We use your information to provide auction services, process transactions, verify identities, and facilitate communication between buyers and sellers."
        },
        {
          subtitle: "Security and Fraud Prevention",
          text: "Your information helps us detect and prevent fraudulent activities, unauthorized access, and other security threats to protect all users."
        },
        {
          subtitle: "Platform Improvement",
          text: "We analyze usage data to improve our platform, develop new features, and enhance user experience."
        },
        {
          subtitle: "Legal Compliance",
          text: "We use information as required by law, including for tax reporting, regulatory compliance, and responding to legal requests."
        }
      ]
    },
    {
      id: "information-sharing",
      title: "Information Sharing",
      icon: FileText,
      content: [
        {
          subtitle: "Between Users",
          text: "Certain information is shared between auction participants, including seller information for successful bidders and necessary details for transaction completion."
        },
        {
          subtitle: "Service Providers",
          text: "We share information with trusted third-party providers who help us operate our platform, including payment processors, shipping companies, and inspection services."
        },
        {
          subtitle: "Legal Requirements",
          text: "We may disclose information when required by law, court order, or government request, or to protect our rights and safety."
        },
        {
          subtitle: "Business Transfers",
          text: "In the event of a merger, acquisition, or sale of assets, user information may be transferred as part of that transaction."
        }
      ]
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: Lock,
      content: [
        {
          subtitle: "Encryption",
          text: "All sensitive data is encrypted both in transit and at rest using industry-standard encryption protocols."
        },
        {
          subtitle: "Access Controls",
          text: "We implement strict access controls and authentication measures to ensure only authorized personnel can access user data."
        },
        {
          subtitle: "Regular Audits",
          text: "Our security practices are regularly audited by third-party security firms to identify and address potential vulnerabilities."
        },
        {
          subtitle: "Incident Response",
          text: "We maintain a comprehensive incident response plan to quickly address any security breaches and notify affected users as required."
        }
      ]
    },
    {
      id: "user-rights",
      title: "Your Rights",
      icon: Shield,
      content: [
        {
          subtitle: "Access and Portability",
          text: "You have the right to access your personal information and receive a copy in a portable format."
        },
        {
          subtitle: "Correction and Updates",
          text: "You can update or correct your personal information through your account settings or by contacting our support team."
        },
        {
          subtitle: "Deletion",
          text: "You may request deletion of your personal information, subject to legal and contractual obligations."
        },
        {
          subtitle: "Marketing Opt-out",
          text: "You can opt out of marketing communications at any time through your account settings or unsubscribe links."
        }
      ]
    },
    {
      id: "data-retention",
      title: "Data Retention",
      icon: Clock,
      content: [
        {
          subtitle: "Account Data",
          text: "We retain account information for as long as your account remains active, plus 7 years after closure for legal and tax compliance purposes."
        },
        {
          subtitle: "Transaction Records",
          text: "Auction and transaction data is retained for 10 years to comply with financial regulations and provide ongoing support."
        },
        {
          subtitle: "Communications",
          text: "Messages and communications are retained for 3 years after the last interaction to resolve disputes and provide customer support."
        },
        {
          subtitle: "Usage Data",
          text: "Anonymous usage and analytics data may be retained indefinitely for platform improvement and research purposes."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              Your privacy is important to us. This policy explains how we collect, 
              use, and protect your personal information.
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-lg shadow-sm text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2" />
              Last updated: {lastUpdated}
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-semibold text-black mb-4">Table of Contents</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <Icon className="h-5 w-5 text-gray-600 mr-3 flex-shrink-0" />
                  <span className="text-gray-800 hover:text-black">{section.title}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Welcome to AutoBID. We are committed to protecting your privacy and ensuring 
              the security of your personal information. This Privacy Policy describes how we 
              collect, use, disclose, and safeguard your information when you use our online 
              car auction platform.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              By using AutoBID, you consent to the data practices described in this policy. 
              If you do not agree with our policies and practices, please do not use our services.
            </p>
          </div>
        </div>
      </section>

      {/* Main Sections */}
      {sections.map((section, index) => {
        const Icon = section.icon;
        return (
          <section key={section.id} id={section.id} className={`py-12 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center mb-8">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-black text-white rounded-lg mr-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold text-black">{section.title}</h2>
              </div>

              <div className="space-y-8">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    <h3 className="text-xl font-semibold text-black mb-4">{item.subtitle}</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Cookies Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-black text-white rounded-lg mr-4">
              <FileText className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold text-black">Cookies and Tracking</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-black mb-4">Essential Cookies</h3>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                We use essential cookies that are necessary for the operation of our platform. 
                These cookies enable core functionality such as security, network management, 
                and accessibility.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-black mb-4">Analytics Cookies</h3>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                We use analytics cookies to understand how visitors interact with our website. 
                This helps us improve our services and user experience. You can opt out of 
                analytics tracking in your browser settings.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-black mb-4">Marketing Cookies</h3>
              <p className="text-gray-700 leading-relaxed text-lg mb-4">
                With your consent, we may use marketing cookies to personalize advertisements 
                and measure the effectiveness of our marketing campaigns. You can manage these 
                preferences in your account settings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* International Users */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black mb-8">International Users</h2>
          
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed text-lg">
              AutoBID operates globally and may transfer your information to countries 
              outside your residence. We ensure that such transfers comply with applicable 
              data protection laws and implement appropriate safeguards.
            </p>

            <div className="bg-white p-6 rounded-xl border">
              <h3 className="text-xl font-semibold text-black mb-4">GDPR Compliance</h3>
              <p className="text-gray-700 leading-relaxed">
                For users in the European Union, we comply with the General Data Protection 
                Regulation (GDPR). You have additional rights under GDPR, including the right 
                to data portability, the right to be forgotten, and the right to lodge complaints 
                with supervisory authorities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border">
              <h3 className="text-xl font-semibold text-black mb-4">CCPA Compliance</h3>
              <p className="text-gray-700 leading-relaxed">
                For California residents, we comply with the California Consumer Privacy Act (CCPA). 
                You have the right to know what personal information we collect, to delete personal 
                information, and to opt-out of the sale of personal information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black mb-8">Contact Our Privacy Team</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-700 leading-relaxed text-lg mb-6">
                If you have any questions about this Privacy Policy, our data practices, 
                or your rights regarding your personal information, please contact us:
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-gray-800">privacy@autobid.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="text-gray-800">1-800-PRIVACY (1-800-774-8229)</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-black mb-4">Privacy Rights Requests</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                To exercise your privacy rights, including data access, correction, or deletion 
                requests, please use our dedicated privacy portal or contact our privacy team directly.
              </p>
              <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300">
                Privacy Request Portal
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Changes to Policy */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-black mb-6">Changes to This Policy</h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            We may update this Privacy Policy from time to time to reflect changes in our 
            practices or for other operational, legal, or regulatory reasons. We will notify 
            you of any material changes by posting the new Privacy Policy on this page and 
            updating the &quot;Last Updated&quot; date.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            We encourage you to review this Privacy Policy periodically to stay informed 
            about how we protect your information. Your continued use of our services after 
            any modifications indicates your acceptance of the updated Privacy Policy.
          </p>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Questions About Privacy?</h2>
          <p className="text-gray-300 mb-6">
            Our privacy team is here to help. Contact us anytime with questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:privacy@autobid.com"
              className="inline-flex items-center px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-colors duration-300"
            >
              <Mail className="mr-2 h-5 w-5" />
              Email Privacy Team
            </a>
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-white text-white rounded-lg hover:bg-white hover:text-black transition-all duration-300"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}