import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Feather, Globe, Shield } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            About BlogSphere
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
            A platform designed for writers and readers passionate about sharing ideas and stories.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8">
              BlogSphere was created with a simple but powerful mission: to democratize publishing and elevate voices from all walks of life. We believe that everyone has a story worth telling and ideas worth sharing.
            </p>
            <p className="text-lg text-gray-600">
              Our platform provides the tools and community for writers to express themselves, connect with readers, and engage in meaningful conversations that expand horizons and deepen understanding.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">What Makes Us Different</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-blue-900 mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Community-First Approach</h3>
              </div>
              <p className="text-gray-600">
                We're building more than just a blogging platform; we're cultivating a community of thoughtful writers and engaged readers who inspire each other to create and connect.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <Feather className="h-8 w-8 text-blue-900 mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Design for Writers</h3>
              </div>
              <p className="text-gray-600">
                Our platform is designed with writers in mind. From our clean, distraction-free editor to our thoughtful formatting options, we've created a space where your words take center stage.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <Globe className="h-8 w-8 text-blue-900 mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Global Perspective</h3>
              </div>
              <p className="text-gray-600">
                We celebrate diverse viewpoints and strive to amplify voices from around the world. Our categories and discovery features help readers find content that expands their worldview.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-blue-900 mr-3" />
                <h3 className="text-xl font-bold text-gray-800">Safe and Respectful</h3>
              </div>
              <p className="text-gray-600">
                We're committed to maintaining a platform where writers feel safe sharing their thoughts and readers can engage in civil, constructive discourse. Our community guidelines ensure respect for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Meet Our Team</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img 
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300" 
                alt="CEO Portrait" 
                className="rounded-full w-32 h-32 object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">Alex Thompson</h3>
              <p className="text-blue-900 mb-3">Founder & CEO</p>
              <p className="text-gray-600">
                Former journalist with a passion for democratizing publishing and giving voice to diverse perspectives.
              </p>
            </div>

            <div className="text-center">
              <img 
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300" 
                alt="CTO Portrait" 
                className="rounded-full w-32 h-32 object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">Sophia Chen</h3>
              <p className="text-blue-900 mb-3">CTO</p>
              <p className="text-gray-600">
                Tech innovator focused on creating intuitive, writer-friendly experiences that make publishing accessible to all.
              </p>
            </div>

            <div className="text-center">
              <img 
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300" 
                alt="CCO Portrait" 
                className="rounded-full w-32 h-32 object-cover mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">Marcus Johnson</h3>
              <p className="text-blue-900 mb-3">Chief Community Officer</p>
              <p className="text-gray-600">
                Community building expert dedicated to fostering meaningful connections between writers and readers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Be part of a growing community of writers and readers passionate about sharing ideas and stories that matter.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/signup"
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-full transition"
            >
              Create Account
            </Link>
            <Link
              to="/about/contact"
              className="bg-transparent hover:bg-white/10 text-white border border-white font-medium py-3 px-6 rounded-full transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;