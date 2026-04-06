import type { Metadata } from "next";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Service | RegardsKim",
  description: "The terms governing your use of RegardsKim.",
};

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service" updatedAt="April 6, 2026">
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to and use of the
        RegardsKim website, application, and related services.
      </p>
      <p>
        RegardsKim is an AI email support agent for Shopify stores. It connects to your Shopify
        account and your email account, reads incoming customer support emails, drafts replies
        using order data, tracking details, and store policies, and places those drafts in a
        queue for your approval before they are sent.
      </p>
      <p>
        By accessing or using RegardsKim, you agree to these Terms. If you do not agree, do not
        use the service.
      </p>

      <h2>1. About RegardsKim</h2>
      <p>RegardsKim is operated by Vitality Industries in Australia.</p>
      <p>
        The service is designed to help merchants manage customer support more efficiently by
        preparing AI-assisted email drafts for human review. RegardsKim does not replace your
        responsibility to review communications sent to your customers.
      </p>

      <h2>2. Eligibility and Business Use</h2>
      <p>You may use RegardsKim only if:</p>
      <ul>
        <li>You are at least 18 years old</li>
        <li>You have the legal authority to enter into these Terms</li>
        <li>You are using the service for a legitimate business purpose</li>
        <li>
          You have authority to connect the Shopify, Gmail, Outlook, and other third-party
          accounts you link to the service
        </li>
      </ul>
      <p>
        If you use RegardsKim on behalf of a company or other entity, you represent that you
        have authority to bind that entity to these Terms.
      </p>

      <h2>3. Account Registration and Responsibilities</h2>
      <p>
        To use RegardsKim, you may need to create an account and connect third-party services
        such as Shopify, Gmail, or Outlook. You are responsible for:
      </p>
      <ul>
        <li>Providing accurate and current account information</li>
        <li>Keeping your login credentials secure</li>
        <li>Maintaining the security of connected accounts</li>
        <li>
          Ensuring you have the rights and permissions needed to connect your store and email
          systems
        </li>
        <li>Reviewing AI-generated drafts before approving or sending them</li>
        <li>All activity that occurs under your account</li>
      </ul>
      <p>
        You must notify us promptly at <strong>support@regardskim.com</strong> if you become
        aware of unauthorised access, misuse, or a security issue involving your account.
      </p>

      <h2>4. Description of the Service</h2>
      <p>RegardsKim provides software that:</p>
      <ul>
        <li>Connects to your Shopify store and supported email account</li>
        <li>Reads inbound customer support emails</li>
        <li>
          Uses relevant order, tracking, product, and policy information to generate response
          drafts
        </li>
        <li>Presents drafts for your review and approval</li>
        <li>Supports subscription management, usage monitoring, and related account functions</li>
      </ul>
      <p>We may add, remove, or change features over time as we improve the service.</p>

      <h2>5. Free Trial</h2>
      <p>
        We may offer a <strong>7-day free trial</strong>. No credit card is required to start
        the trial unless we state otherwise at the time of signup. By starting a free trial, you
        agree that:
      </p>
      <ul>
        <li>The trial lasts for 7 days from activation, unless ended earlier</li>
        <li>
          At the end of the trial, your account may convert to a paid subscription if you choose
          to continue using the service
        </li>
        <li>
          If payment details are required before continuation, you must provide valid billing
          information before your paid subscription begins
        </li>
        <li>
          We may modify or withdraw trial offers at any time, to the extent permitted by law
        </li>
        <li>
          We may limit eligibility for trials, including preventing repeat or abusive trial use
        </li>
      </ul>

      <h2>6. Billing and Payments</h2>
      <p>
        RegardsKim is offered on a subscription basis. As of the date above, pricing is:
      </p>
      <ul>
        <li><strong>$49/month</strong> on a monthly plan</li>
        <li><strong>$37/month billed annually</strong> on an annual plan</li>
      </ul>
      <p>All pricing is subject to change in the future with notice.</p>

      <h3>6.1 Payment Processor</h3>
      <p>
        We use <strong>Stripe</strong> to process payments, subscriptions, invoices, and related
        billing functions. By subscribing, you authorise Stripe and us to charge the applicable
        fees using your selected payment method.
      </p>

      <h3>6.2 Recurring Billing</h3>
      <p>If you purchase a subscription:</p>
      <ul>
        <li>You agree to recurring billing for the plan you select</li>
        <li>
          Your subscription will renew automatically at the end of each billing period unless
          cancelled before renewal
        </li>
        <li>
          You authorise us and our payment processor to charge the applicable subscription fees,
          taxes, and any other disclosed charges
        </li>
      </ul>

      <h3>6.3 Taxes</h3>
      <p>
        Unless stated otherwise, fees may exclude applicable taxes, duties, levies, or government
        charges. You are responsible for any applicable taxes associated with your use of the
        service, other than taxes based on our net income.
      </p>

      <h3>6.4 Failed Payments</h3>
      <p>
        If a payment fails, we may retry the charge, suspend access to paid features, or cancel
        your subscription until payment is resolved.
      </p>

      <h2>7. Cancellation and Refunds</h2>
      <p>
        You may cancel your subscription at any time through your account settings, if available,
        or by contacting <strong>support@regardskim.com</strong>.
      </p>
      <p>Unless required by law or expressly stated otherwise:</p>
      <ul>
        <li>Cancellation stops future renewals</li>
        <li>Fees already paid are generally <strong>non-refundable</strong></li>
        <li>
          We do not provide partial or prorated refunds for unused time in a billing period
        </li>
        <li>
          You may continue to access paid features until the end of the current billing period,
          unless your account is suspended or terminated earlier under these Terms
        </li>
      </ul>
      <p>
        Nothing in these Terms limits any non-excludable rights you may have under applicable
        consumer law.
      </p>

      <h2>8. Acceptable Use</h2>
      <p>You agree not to use RegardsKim to:</p>
      <ul>
        <li>Break any law or regulation</li>
        <li>Infringe another person&apos;s rights</li>
        <li>
          Transmit unlawful, fraudulent, defamatory, harassing, abusive, or misleading content
        </li>
        <li>Process or send spam or unauthorised commercial messages</li>
        <li>Upload malware or interfere with the service&apos;s operation or security</li>
        <li>
          Attempt to gain unauthorised access to systems, accounts, or data
        </li>
        <li>
          Use the service in a way that could damage, disable, overburden, or impair the platform
        </li>
        <li>Use the service to exploit or harm minors</li>
        <li>
          Use the service for content or activities involving illegal goods, scams, hate,
          violence, or other clearly abusive conduct
        </li>
      </ul>
      <p>
        We may investigate suspected misuse and suspend or terminate accounts that violate these
        Terms.
      </p>

      <h2>9. AI-Generated Content Disclaimer</h2>
      <p>RegardsKim uses AI to generate suggested support replies. You understand and agree that:</p>
      <ul>
        <li>AI-generated drafts are <strong>suggestions only</strong></li>
        <li>
          Drafts may be incomplete, inaccurate, inappropriate, or unsuitable in some cases
        </li>
        <li>
          You are responsible for reviewing and approving drafts before they are sent
        </li>
        <li>
          You remain responsible for all communications sent to your customers through or in
          connection with the service
        </li>
        <li>
          We do not guarantee that AI-generated output will be accurate, error-free, legally
          compliant, or fit for your specific business needs
        </li>
      </ul>
      <p>
        AI can be useful, but it should still be reviewed by a human. That is a core part of
        how RegardsKim is intended to be used.
      </p>

      <h2>10. Third-Party Services</h2>
      <p>RegardsKim depends on third-party services, including:</p>
      <ul>
        <li>Shopify</li>
        <li>Gmail and/or Outlook</li>
        <li>OpenAI</li>
        <li>Stripe</li>
        <li>Vercel</li>
        <li>Railway</li>
      </ul>
      <p>
        Your use of those third-party services may also be subject to their own terms and privacy
        policies. We are not responsible for third-party products or services, including outages,
        policy changes, access restrictions, or decisions made by those providers.
      </p>

      <h2>11. Intellectual Property</h2>
      <p>
        We retain all rights, title, and interest in RegardsKim, including the software, design,
        branding, text, features, and underlying technology, excluding content and data that you
        or your customers provide.
      </p>
      <p>
        Subject to these Terms, we grant you a limited, non-exclusive, non-transferable,
        revocable right to use RegardsKim for your internal business purposes during your
        subscription term. You must not:
      </p>
      <ul>
        <li>
          Copy, modify, or create derivative works of the service except as permitted by law
        </li>
        <li>
          Reverse engineer, decompile, or attempt to extract source code, except where
          applicable law cannot prohibit it
        </li>
        <li>Remove proprietary notices or branding</li>
        <li>
          Resell, lease, sublicense, or commercially exploit the service except with our written
          permission
        </li>
      </ul>
      <p>
        You retain your rights in the business data, customer content, and materials you provide
        to RegardsKim.
      </p>

      <h2>12. Feedback</h2>
      <p>
        If you send us suggestions, ideas, or feedback about RegardsKim, you agree that we may
        use that feedback without restriction or payment to you.
      </p>

      <h2>13. Service Availability</h2>
      <p>
        We aim to provide a reliable service, but RegardsKim is offered on a{" "}
        <strong>best effort</strong> basis. We do not guarantee:
      </p>
      <ul>
        <li>Continuous or uninterrupted availability</li>
        <li>Error-free operation</li>
        <li>That the service will always be secure or free of bugs</li>
        <li>That drafts will always be generated correctly or on time</li>
        <li>That integrations with third-party services will always remain available</li>
      </ul>
      <p>
        We may perform maintenance, updates, fixes, or changes that temporarily affect
        availability.
      </p>

      <h2>14. Limitation of Liability</h2>
      <p>To the maximum extent permitted by law:</p>
      <ul>
        <li>
          RegardsKim is provided on an <strong>&quot;as is&quot;</strong> and{" "}
          <strong>&quot;as available&quot;</strong> basis
        </li>
        <li>
          We disclaim all warranties not expressly stated in these Terms, including implied
          warranties of merchantability, fitness for a particular purpose, and non-infringement
        </li>
        <li>
          We are not liable for indirect, incidental, special, consequential, or punitive
          damages, or for loss of profits, revenue, business, goodwill, data, or anticipated
          savings
        </li>
        <li>
          Our total liability for any claim arising out of or relating to the service will not
          exceed the total amount you paid us for RegardsKim in the{" "}
          <strong>12 months</strong> before the event giving rise to the claim
        </li>
      </ul>
      <p>
        This section does not exclude liability that cannot be excluded under applicable law,
        including certain rights under Australian consumer law or liability for fraud, wilful
        misconduct, or personal injury where exclusion is not permitted.
      </p>

      <h2>15. Indemnity</h2>
      <p>
        You agree to indemnify and hold harmless Vitality Industries and its officers, employees,
        contractors, and affiliates from claims, liabilities, damages, losses, and costs arising
        out of:
      </p>
      <ul>
        <li>Your use or misuse of RegardsKim</li>
        <li>Your violation of these Terms</li>
        <li>Your violation of any law or third-party right</li>
        <li>Content, data, or communications processed or sent through your account</li>
      </ul>

      <h2>16. Suspension and Termination</h2>
      <p>
        We may suspend or terminate your access to RegardsKim immediately or on notice if:
      </p>
      <ul>
        <li>You breach these Terms</li>
        <li>Your use poses a security, legal, or operational risk</li>
        <li>We are required to do so by law or by a third-party provider</li>
        <li>Payment is overdue or cannot be processed</li>
        <li>We decide to discontinue the service, in whole or in part</li>
      </ul>
      <p>You may stop using the service and cancel your subscription at any time.</p>
      <p>Upon termination:</p>
      <ul>
        <li>Your right to use RegardsKim ends</li>
        <li>Access to your account or certain data may be removed or limited</li>
        <li>
          We may delete account data in accordance with our Privacy Policy and legal obligations
        </li>
        <li>
          Any provisions that by their nature should survive termination will continue to apply,
          including payment obligations accrued before termination, intellectual property
          provisions, limitations of liability, and dispute-related terms
        </li>
      </ul>

      <h2>17. Privacy</h2>
      <p>
        Our handling of personal information is described in our Privacy Policy. By using
        RegardsKim, you acknowledge that we may collect, use, and disclose information as
        described there.
      </p>

      <h2>18. Changes to These Terms</h2>
      <p>
        We may update these Terms from time to time. If we make material changes, we may provide
        notice by updating the Terms on our website, emailing you, notifying you inside the
        product, or using another reasonable method. Your continued use of RegardsKim after the
        updated Terms take effect means you accept the revised Terms.
      </p>
      <p>If you do not agree to the updated Terms, you should stop using the service.</p>

      <h2>19. Governing Law</h2>
      <p>
        These Terms are governed by the laws of <strong>Queensland, Australia</strong>, without
        regard to conflict of law principles. You agree that the courts of Queensland, Australia
        will have jurisdiction over disputes arising out of or relating to these Terms or your
        use of RegardsKim, subject to any rights you may have under applicable law.
      </p>

      <h2>20. Contact</h2>
      <p>
        If you have questions about these Terms, billing, or the service, contact:{" "}
        <strong>support@regardskim.com</strong>
      </p>
    </LegalPageLayout>
  );
}
