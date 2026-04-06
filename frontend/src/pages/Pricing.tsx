import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PRICING_PLANS = [
  {
    name: "Free Plan",
    price: "0",
    features: [
      { text: "Access to selected free courses.", included: true },
      { text: "Limited course materials and resources.", included: true },
      { text: "Basic community support.", included: true },
      { text: "No certification upon completion.", included: true },
      { text: "Ad-supported platform.", included: true },
      { text: "Access to exclusive Pro Plan community forums.", included: false },
      { text: "Early access to new courses and updates.", included: false },
    ]
  },
  {
    name: "Pro Plan",
    price: "79",
    features: [
      { text: "Unlimited access to all courses.", included: true },
      { text: "Unlimited course materials and resources.", included: true },
      { text: "Priority support from instructors.", included: true },
      { text: "Course completion certificates.", included: true },
      { text: "Ad-free experience.", included: true },
      { text: "Access to exclusive Pro Plan community forums.", included: true },
      { text: "Early access to new courses and updates.", included: true },
    ]
  }
];

const FAQS = [
  {
    question: "Can I enroll in multiple courses at once?",
    answer: "Absolutely! You can enroll in multiple courses simultaneously and access them at your convenience."
  },
  {
    question: "What kind of support can I expect from instructors?",
    answer: "Our instructors are available to answer your questions and provide guidance throughout your learning journey."
  },
  {
    question: "Are the courses self-paced or do they have specific start and end dates?",
    answer: "Most of our courses are self-paced, allowing you to learn at your own speed and on your own schedule."
  },
  {
    question: "Are there any prerequisites for the courses?",
    answer: "Prerequisites vary by course. Check the course details page for specific requirements."
  },
  {
    question: "Can I download the course materials for offline access?",
    answer: "Yes, many of our courses offer downloadable materials for offline study."
  }
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white-97 pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16 border-b border-white-95 pb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-grey-15">
                Our Pricings
              </h1>
            </div>
            <div className="md:w-1/2">
              <p className="text-grey-35 text-sm leading-relaxed">
                Welcome to Digital Sikshya's Pricing Plan page, where we offer two comprehensive options to cater to your needs: Free and Pro. We believe in providing flexible and affordable pricing options for our services. Whether you're an individual looking to enhance your skills or a business seeking professional development solutions, we have a plan that suits you. Explore our pricing options below and choose the one that best fits your requirements.
              </p>
            </div>
          </div>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-2 rounded-xl border border-white-95 flex gap-2">
            <button 
              onClick={() => setBillingCycle('monthly')}
              className={`px-8 py-3 rounded-lg text-sm font-medium transition-all ${
                billingCycle === 'monthly' 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-grey-35 hover:bg-white-97'
              }`}
            >
              Monthly
            </button>
            <button 
              onClick={() => setBillingCycle('yearly')}
              className={`px-8 py-3 rounded-lg text-sm font-medium transition-all ${
                billingCycle === 'yearly' 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-grey-35 hover:bg-white-97'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Pricing Cards Container */}
        <div className="bg-white p-6 md:p-12 lg:p-20 rounded-[2rem] border border-white-95 mb-24">
          <div className="grid md:grid-cols-2 gap-8">
            {PRICING_PLANS.map((plan, idx) => (
              <div key={idx} className="bg-white-97 p-8 lg:p-12 rounded-2xl border border-white-95 flex flex-col h-full">
                <div className="bg-orange-97 border border-orange-90 rounded-lg py-3 px-6 text-center mb-10">
                  <span className="text-grey-15 font-semibold">{plan.name}</span>
                </div>
                
                <div className="flex items-baseline justify-center gap-1 mb-10">
                  <span className="text-6xl font-bold text-grey-15">
                    ${billingCycle === 'monthly' ? plan.price : (plan.name === 'Free Plan' ? '0' : '59')}
                  </span>
                  <span className="text-grey-35 font-medium">/month</span>
                </div>

                <div className="bg-white rounded-2xl border border-white-95 p-8 flex-grow mb-10">
                  <h3 className="text-lg font-bold text-grey-15 text-center mb-8">Available Features</h3>
                  <div className="space-y-4">
                    {plan.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-3 p-3 border border-white-95 rounded-lg">
                        <div className={`mt-0.5 p-1 rounded ${feature.included ? 'bg-orange-95' : 'border border-white-95'}`}>
                          {feature.included ? (
                            <Check className="w-4 h-4 text-primary" />
                          ) : (
                            <X className="w-4 h-4 text-grey-35" />
                          )}
                        </div>
                        <span className="text-sm text-grey-35 leading-tight">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link to="/signup" className="w-full btn-primary !rounded-b-2xl !rounded-t-none !py-5 text-lg font-bold text-center">
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white p-6 md:p-12 lg:p-20 rounded-[2rem] border border-white-95">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-bold text-grey-15 mb-4">Frequently Asked Questions</h2>
              <p className="text-grey-35 mb-8 leading-relaxed">
                Still have any questions? Contact our Team via hello@digitalsikshya.com
              </p>
              <Link to="/contact" className="btn-secondary !px-8 !rounded-xl inline-flex">
                See All FAQ's
              </Link>
            </div>

            <div className="lg:col-span-2 space-y-6">
              {FAQS.map((faq, i) => (
                <div key={i} className="border border-white-95 rounded-2xl p-6 lg:p-8">
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full flex items-center justify-between text-left group"
                  >
                    <span className="text-lg font-bold text-grey-15 group-hover:text-primary transition-colors">
                      {faq.question}
                    </span>
                    <div className="p-2 bg-orange-95 rounded-lg transition-colors">
                      {activeFaq === i ? (
                        <X className="w-5 h-5 text-grey-15" />
                      ) : (
                        <Plus className="w-5 h-5 text-grey-15" />
                      )}
                    </div>
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, marginTop: 0 }}
                        animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
                        exit={{ height: 0, opacity: 0, marginTop: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-6 border-t border-white-95">
                          <p className="text-grey-35 leading-relaxed mb-8">
                            {faq.answer}
                          </p>
                          <Link to="/courses" className="bg-white-97 p-4 rounded-xl flex items-center justify-between border border-white-95 hover:border-primary transition-colors group/link">
                            <span className="font-semibold text-grey-15">Enrollment Process for Different Courses</span>
                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-white-95 shadow-sm group-hover/link:bg-primary group-hover/link:text-white transition-all">
                              <ArrowRight className="w-5 h-5" />
                            </div>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
