import { motion } from "motion/react";

export function TermsOfService() {
  return (
    <div className="pt-32 pb-20 min-h-screen px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-8 border-b border-white/10 pb-6">
          Terms of Service
        </h1>

        <div className="prose prose-invert prose-lg max-w-none space-y-8 text-gray-300">
          <section>
            <h2 className="text-xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p>
              By downloading, installing, accessing, or using the Annpurna General Store platform, website, mobile application, or any related services, you agree that you have read, understood, and agreed to be bound by these Terms of Service. If you do not agree, you must not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">2. Description of Services</h2>
            <p>
              Annpurna General Store provides a technology platform bringing together consumers looking for premium groceries, household essentials, and daily items with delivery partners. We utilize AI technology to enhance product discovery, manage inventory, and optimize delivery times (aiming for ultra-fast deliveries, subject to logistical feasibility).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">3. User Accounts & Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-400">
              <li>You must be at least 18 years old to create an account and use our services.</li>
              <li>You agree to provide accurate, current, and complete information during the registration process.</li>
              <li>You are entirely responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You must notify us immediately of any unauthorized use of your account.</li>
              <li>We reserve the right to suspend or terminate accounts that violate our terms or engage in fraudulent activities.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">4. Pricing and Orders</h2>
            <p>
              All prices listed on the platform are subject to change without notice. While we strive for accuracy, errors in pricing or product descriptions may occur. In the event of an error, we reserve the right to cancel any orders placed for incorrectly priced items. AI-driven "dynamic pricing" or personalized discounts may result in different prices for different users.
            </p>
            <p className="mt-4">
              Your order is considered accepted only when the goods are dispatched from our dark stores or fulfilled by a partner. We reserve the right to decline or cancel any order for any reason.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">5. Delivery Policy</h2>
            <p>
              We strive to deliver orders within the estimated timeframe shown at checkout (e.g., "10 minutes"). However, delivery times are estimates and not guarantees. Delays may occur due to weather, traffic, high demand, or other unforeseen circumstances. We are not liable for any delays in delivery.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">6. Returns and Refunds</h2>
            <p>
              If there's an issue with your order (e.g., damaged, missing, or incorrect items), you must report it through the platform within 24 hours of delivery. We will facilitate a refund, replacement, or issue credits at our sole discretion based on our assessment of the issue.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">7. Intellectual Property</h2>
            <p>
              All content on the platform, including text, graphics, logos, images, AI models, software, and the compilation thereof, is the property of Annpurna General Store or its suppliers and is protected by copyright, trademark, and other intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-4">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Annpurna General Store shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.
            </p>
          </section>

          <section className="text-sm text-gray-500 pt-8 mt-12 border-t border-white/5">
            Last Updated: May 7, 2026
          </section>
        </div>
      </motion.div>
    </div>
  );
}
