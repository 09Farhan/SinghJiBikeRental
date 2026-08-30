import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and Conditions for Singh Ji\'s Bike Rentals in Siliguri. Read our policies regarding bike rentals, bookings, and customer responsibilities.',
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-[#0a0e1a] min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Terms & Conditions</h1>
        <p className="text-gray-400 mb-12">Last Updated: August 8, 2026</p>

        <div className="space-y-8 text-gray-300 font-body leading-relaxed">
          <section>
            <p className="mb-4">
              Welcome to Singh Ji’s Bike Rentals, a bike and scooter rental service in Siliguri, West Bengal. These Terms & Conditions govern your use of our website and your interaction with our bike, motorcycle, scooter, and two-wheeler rental services.
            </p>
            <p className="mb-4">
              By using this website, contacting us, making a booking, or renting a vehicle from Singh Ji’s Bike Rentals, you agree to comply with these Terms & Conditions.
            </p>
            <p>
              Please read them carefully before making a rental booking.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">1. About Our Services</h2>
            <p className="mb-4">
              Singh Ji’s Bike Rentals provides bike rental and scooter rental services in Siliguri, West Bengal.
            </p>
            <p className="mb-4">
              Information displayed on the website may include vehicle details, photographs, rental prices, availability, service information, and contact options.
            </p>
            <p>
              Vehicle availability and rental prices may change depending on the vehicle, rental period, season, demand, and other applicable conditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">2. Eligibility to Rent</h2>
            <p className="mb-4">
              Customers must meet all applicable legal requirements to rent and operate a motorcycle, scooter, or other two-wheeler.
            </p>
            <p className="mb-4">Customers must:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Meet the legally applicable minimum age requirement</li>
              <li>Hold a valid driving licence appropriate for the vehicle being rented</li>
              <li>Provide valid identification documents when requested</li>
              <li>Provide accurate information during the booking process</li>
              <li>Comply with applicable traffic and motor vehicle laws</li>
            </ul>
            <p>
              Singh Ji’s Bike Rentals may request additional documentation where reasonably necessary for verification or rental purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">3. Booking and Availability</h2>
            <p className="mb-4">
              A booking enquiry does not automatically guarantee vehicle availability.
            </p>
            <p className="mb-4">
              A rental is considered confirmed only after Singh Ji’s Bike Rentals has confirmed the booking and agreed to the applicable rental terms, price, vehicle, and rental period.
            </p>
            <p className="mb-4">Customers should provide accurate information regarding:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Name</li>
              <li>Contact information</li>
              <li>Rentals dates</li>
              <li>Preferred vehicle</li>
              <li>Pickup and return requirements</li>
            </ul>
            <p>
              Vehicle availability may vary, particularly during weekends, holidays, festivals, and peak tourist seasons.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">4. Rentals Charges</h2>
            <p className="mb-4">
              Rentals charges depend on the vehicle and rental period.
            </p>
            <p className="mb-4">
              The applicable rental price will be communicated to the customer before confirmation of the rental.
            </p>
            <p className="mb-4">Additional charges may apply where applicable, including charges relating to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Late return</li>
              <li>Damage</li>
              <li>Loss</li>
              <li>Missing equipment or accessories</li>
              <li>Traffic fines</li>
              <li>Fuel</li>
              <li>Delivery or pickup</li>
              <li>Other agreed services</li>
            </ul>
            <p>
              Any applicable additional charges will be communicated to the customer where reasonably possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">5. Security Deposit</h2>
            <p className="mb-4">
              Where a security deposit is applicable, the amount and conditions will be communicated before or at the time of rental.
            </p>
            <p className="mb-4">
              The deposit may be used to cover applicable charges arising from damage, loss, unpaid rental charges, fines, missing accessories, or other amounts owed under the rental agreement.
            </p>
            <p>
              Any remaining refundable amount will be handled according to the applicable rental and refund terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">6. Required Documents</h2>
            <p className="mb-4">
              Customers may be required to provide valid documents before receiving a rental vehicle.
            </p>
            <p className="mb-4">These may include:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Valid driving licence</li>
              <li>Government-issued identification</li>
              <li>Contact information</li>
              <li>Other documents reasonably required for verification</li>
            </ul>
            <p>
              The customer is responsible for ensuring that all documents provided are genuine, valid, and belong to the customer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">7. Customer Responsibilities</h2>
            <p className="mb-4">
              The customer is responsible for using the rented vehicle safely and lawfully.
            </p>
            <p className="mb-4">Customers must:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Follow all applicable traffic laws</li>
              <li>Ride responsibly</li>
              <li>Wear required safety equipment</li>
              <li>Take reasonable care of the vehicle</li>
              <li>Keep the vehicle secure</li>
              <li>Return the vehicle within the agreed rental period</li>
              <li>Immediately report accidents, damage, theft, or major mechanical problems</li>
              <li>Not allow unauthorized individuals to operate the vehicle where prohibited by the rental agreement</li>
              <li>Not use the vehicle for illegal activities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">8. Prohibited Use</h2>
            <p className="mb-4">Unless expressly agreed otherwise, rented vehicles must not be used:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>For illegal activities</li>
              <li>For racing or speed competitions</li>
              <li>For dangerous or reckless riding</li>
              <li>To transport prohibited goods</li>
              <li>In a manner that violates applicable law</li>
              <li>By an unlicensed or unauthorized rider</li>
              <li>In any activity that may unnecessarily endanger the vehicle, rider, passengers, or members of the public</li>
            </ul>
            <p>
              Additional restrictions may apply depending on the vehicle and rental agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">9. Traffic Fines and Violations</h2>
            <p className="mb-4">
              The customer is responsible for traffic fines, challans, penalties, or other legal consequences resulting from their use of the rented vehicle during the rental period, to the extent permitted by applicable law.
            </p>
            <p>
              Customers must comply with all applicable traffic and motor vehicle regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">10. Vehicle Condition</h2>
            <p className="mb-4">
              The customer should inspect the vehicle before accepting it and report any existing damage or issue to Singh Ji’s Bike Rentals before starting the rental.
            </p>
            <p className="mb-4">
              Customers may be responsible for damage caused during their rental period, subject to the applicable rental agreement and applicable law.
            </p>
            <p>
              Normal wear and tear will be treated differently from damage caused by misuse, negligence, accident, or unauthorized use.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">11. Accidents, Damage, Breakdown and Theft</h2>
            <p className="mb-4">Customers must immediately contact Singh Ji’s Bike Rentals if:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>An accident occurs</li>
              <li>The vehicle is damaged</li>
              <li>The vehicle breaks down</li>
              <li>The vehicle is lost or stolen</li>
              <li>The vehicle becomes unsafe to operate</li>
            </ul>
            <p className="mb-4">
              Customers must not attempt major repairs without authorization unless necessary to prevent immediate danger or further damage.
            </p>
            <p>
              In the event of an accident, customers must also comply with applicable legal requirements and contact emergency services or authorities where necessary.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">12. Fuel</h2>
            <p className="mb-4">
              Fuel requirements will be communicated to the customer at the time of rental.
            </p>
            <p>
              Unless otherwise agreed, the customer is responsible for fuel consumed during the rental period.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">13. Helmets and Safety Equipment</h2>
            <p className="mb-4">
              Where helmets or other safety equipment are provided with the rental, customers must use them responsibly and return them with the vehicle.
            </p>
            <p>
              Customers remain responsible for following applicable helmet and road-safety laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">14. Rentals Period and Late Returns</h2>
            <p className="mb-4">
              The rental period begins and ends according to the time agreed between the customer and Singh Ji’s Bike Rentals.
            </p>
            <p className="mb-4">
              Customers should return the vehicle on time.
            </p>
            <p className="mb-4">
              Late returns may result in additional charges depending on the duration of the delay and the applicable rental terms.
            </p>
            <p>
              Customers should contact us as soon as possible if they expect to be late.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">15. Cancellation and Refunds</h2>
            <p className="mb-4">
              Cancellation and refund conditions depend on the booking and payment terms communicated to the customer.
            </p>
            <p className="mb-4">
              If an advance payment is required, the applicable cancellation and refund conditions should be confirmed before payment.
            </p>
            <p className="mb-4">
              Any refund will be processed according to the applicable cancellation/refund policy.
            </p>
            <p>
              For bookings affected by vehicle availability, operational issues, unforeseen circumstances, or other exceptional situations, Singh Ji’s Bike Rentals may offer an alternative vehicle, alternative date, refund, or other appropriate resolution where applicable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">16. Pickup and Drop-off</h2>
            <p className="mb-4">
              Pickup and drop-off availability, locations, timings, and charges may vary.
            </p>
            <p className="mb-4">
              Any applicable pickup or delivery charges will be communicated before confirmation.
            </p>
            <p>
              Customers must provide accurate pickup and return information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">17. Travel Outside Siliguri</h2>
            <p className="mb-4">
              Customers who intend to travel outside Siliguri, including destinations such as Darjeeling, Kalimpong, Kurseong, or Sikkim, should confirm permission and applicable rental conditions with Singh Ji’s Bike Rentals before starting the journey.
            </p>
            <p className="mb-4">
              Travel restrictions may apply depending on the vehicle, route, local regulations, permits, weather, road conditions, or rental agreement.
            </p>
            <p>
              Customers should not assume that every rented vehicle can be taken to every destination.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">18. Website Information</h2>
            <p className="mb-4">
              We make reasonable efforts to keep information on our website accurate and up to date.
            </p>
            <p className="mb-4">
              However, vehicle availability, prices, specifications, photographs, offers, and other information may change without prior notice.
            </p>
            <p>
              Website photographs may be representative and the actual vehicle may vary depending on availability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">19. Website Availability</h2>
            <p className="mb-4">
              We aim to keep our website available and functioning properly, but we do not guarantee uninterrupted or error-free access.
            </p>
            <p className="mb-4">Temporary unavailability may occur due to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Maintenance</li>
              <li>Technical issues</li>
              <li>Hosting problems</li>
              <li>Internet or network failures</li>
              <li>Security incidents</li>
              <li>Circumstances outside our reasonable control</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">20. Third-Party Services</h2>
            <p className="mb-4">
              Our website may contain links or integrations with third-party services such as WhatsApp, Google Maps, payment services, social media platforms, or other external websites.
            </p>
            <p className="mb-4">
              Singh Ji’s Bike Rentals is not responsible for the availability, content, privacy practices, or terms of third-party services.
            </p>
            <p>
              Customers should review the relevant third-party terms before using those services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">21. Limitation of Liability</h2>
            <p className="mb-4">
              To the extent permitted by applicable law, Singh Ji’s Bike Rentals will not be responsible for losses or damages arising from circumstances outside our reasonable control.
            </p>
            <p className="mb-4">
              Nothing in these Terms & Conditions is intended to exclude or limit any liability that cannot legally be excluded or limited under applicable law.
            </p>
            <p>
              Customers remain responsible for operating rented vehicles safely, legally, and responsibly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">22. Changes to Services and Terms</h2>
            <p className="mb-4">
              Singh Ji’s Bike Rentals may update its services, prices, vehicle availability, website content, and these Terms & Conditions from time to time.
            </p>
            <p>
              The latest version published on this website will apply to future website use and bookings, subject to applicable law and any specific rental agreement already entered into.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">23. Governing Law</h2>
            <p className="mb-4">
              These Terms & Conditions shall be governed by the applicable laws of India.
            </p>
            <p>
              Any dispute arising from the use of our website or rental services shall be handled in accordance with applicable law and the appropriate jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-heading font-semibold text-white mb-4">24. Contact Singh Ji’s Bike Rentals</h2>
            <p className="mb-4">
              For questions regarding these Terms & Conditions, bookings, bike rental, scooter rental, or other services, please contact:
            </p>
            <div className="bg-[#111827] p-6 rounded-xl border border-gray-800">
              <p className="font-semibold text-white mb-2">Singh Ji’s Bike Rentals</p>
              <p>Location: Siliguri, West Bengal, India</p>
              <p>Phone: +91 7365844003</p>
              <p>Email: <a href="mailto:singhjirental@gmail.com" className="text-amber-500 hover:underline">singhjirental@gmail.com</a></p>
              <p>WhatsApp: +91 7365844003</p>
            </div>
          </section>

          <hr className="border-gray-800 my-12" />

          <section className="text-sm pb-8">
            <h3 className="text-lg font-heading font-semibold text-white mb-3">Bike Rentals in Siliguri</h3>
            <p className="mb-4">
              Singh Ji’s Bike Rentals provides convenient bike rental in Siliguri and scooter rental in Siliguri for local customers, tourists, and visitors looking for two-wheeler rental services.
            </p>
            <p className="mb-4">
              Customers can contact Singh Ji’s Bike Rentals to enquire about available bikes and scooters, rental periods, pricing, pickup and return arrangements, and travel requirements.
            </p>
            <p className="text-gray-500">
              For availability and current rental terms, please contact us directly before making your booking.
            </p>
          </section>
        </div>

      </div>
    </div>
  );
}
