import type { Metadata } from "next";
import LegalPageLayout from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | RegardsKim",
  description: "How RegardsKim collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" updatedAt="April 6, 2026">
      <p>
        This Privacy Policy explains how RegardsKim collects, uses, stores, and protects personal
        information when you use our website, app, and services.
      </p>
      <p>
        RegardsKim is an AI email support agent for Shopify stores. It connects to your Shopify
        account and your email account (such as Gmail or Outlook), reads incoming customer support
        emails, drafts replies using relevant store information, and places those drafts in a queue
        for your approval before anything is sent.
      </p>
      <p>By using RegardsKim, you agree to the practices described in this Privacy Policy.</p>

      <h2>1. Who We Are</h2>
      <p>RegardsKim is operated by Vitality Industries in Australia.</p>
      <p>
        If you have questions about this Privacy Policy or your personal information, you can
        contact us at <strong>support@regardskim.com</strong>.
      </p>

      <h2>2. What Information We Collect</h2>
      <p>
        We collect information you provide directly, information we receive through connected
        services, and information generated through your use of RegardsKim.
      </p>

      <h3>2.1 Account Information</h3>
      <p>When you create an account, start a trial, or subscribe, we may collect:</p>
      <ul>
        <li>Your name</li>
        <li>Email address</li>
        <li>Business or store name</li>
        <li>Account login details</li>
        <li>Billing-related details</li>
        <li>Plan selection and subscription status</li>
      </ul>

      <h3>2.2 Shopify Store Data</h3>
      <p>
        When you connect your Shopify store, we may access and process data needed to provide the
        service, such as:
      </p>
      <ul>
        <li>Store name and store URL</li>
        <li>Order details</li>
        <li>Fulfillment and shipping status</li>
        <li>Tracking information</li>
        <li>Customer names and contact details included in order records</li>
        <li>Product details</li>
        <li>Store policies or support-related content you make available to us</li>
      </ul>
      <p>
        We only access Shopify data that is reasonably necessary to help generate support reply
        drafts and operate the service.
      </p>

      <h3>2.3 Email and Support Content</h3>
      <p>
        When you connect Gmail, Outlook, or another supported email provider, we may access and
        process:
      </p>
      <ul>
        <li>Incoming customer emails</li>
        <li>Email metadata such as sender, subject line, and timestamps</li>
        <li>Draft replies created by RegardsKim</li>
        <li>Reply approval and sending status</li>
      </ul>
      <p>
        Because RegardsKim is built to help with customer support, this content may include
        personal information provided by your customers, such as names, email addresses, order
        details, and message content.
      </p>

      <h3>2.4 Usage and Device Information</h3>
      <p>We may automatically collect limited usage data, including:</p>
      <ul>
        <li>Log data</li>
        <li>IP address</li>
        <li>Browser type</li>
        <li>Device information</li>
        <li>Pages or features used</li>
        <li>Dates and times of access</li>
        <li>Actions taken within the product</li>
        <li>Error and performance data</li>
      </ul>
      <p>
        This helps us keep the service running, troubleshoot issues, and improve performance.
      </p>

      <h2>3. How We Use Information</h2>
      <p>
        We use the information we collect to operate, maintain, and improve RegardsKim.
        Specifically, we use information to:
      </p>
      <ul>
        <li>Connect with your Shopify store and email provider</li>
        <li>Read incoming support emails and prepare suggested replies</li>
        <li>
          Use order, tracking, and policy data to make draft replies more accurate and useful
        </li>
        <li>Queue drafts for your review and approval</li>
        <li>Provide account access and customer support</li>
        <li>Manage subscriptions, trials, billing, and payment records</li>
        <li>Monitor usage, detect misuse, and maintain security</li>
        <li>Fix bugs, improve reliability, and refine product features</li>
        <li>Comply with legal obligations and enforce our terms</li>
      </ul>

      <h2>4. What We Do Not Do</h2>
      <p>We believe privacy should be straightforward. In particular:</p>
      <ul>
        <li>
          We <strong>do not sell</strong> your personal information or your customers' personal
          information
        </li>
        <li>
          We <strong>do not use your data to train general AI models</strong>
        </li>
        <li>
          We{" "}
          <strong>
            do not share your data with third parties except where needed to operate the service
          </strong>
          , process payments, host infrastructure, provide AI functionality, or comply with legal
          obligations
        </li>
        <li>
          We{" "}
          <strong>do not send replies automatically without your approval</strong> based on the
          current product design described here
        </li>
      </ul>

      <h2>5. Legal Basis and Your Control</h2>
      <p>Where applicable, we process personal information because:</p>
      <ul>
        <li>it is necessary to provide the service you requested;</li>
        <li>
          it is necessary for our legitimate interests in operating and improving RegardsKim;
        </li>
        <li>it is necessary to comply with legal obligations; or</li>
        <li>
          you have given consent, such as by connecting third-party accounts.
        </li>
      </ul>
      <p>
        If you connect third-party services, you are responsible for making sure you have the
        right to use those services and data with RegardsKim.
      </p>

      <h2>6. Third-Party Services We Use</h2>
      <p>
        We rely on trusted third-party service providers to operate RegardsKim. These providers
        may receive or process data only as needed for their role.
      </p>

      <h3>6.1 OpenAI</h3>
      <p>
        We use OpenAI to process relevant support content and generate draft replies. Data that
        may be processed by OpenAI includes:
      </p>
      <ul>
        <li>Customer email content</li>
        <li>Order and tracking context</li>
        <li>Store policy context</li>
        <li>Draft instructions and related prompt data</li>
      </ul>

      <h3>6.2 Shopify</h3>
      <p>
        We connect to the Shopify API to access store and order data needed to draft support
        replies. Data that may be received from Shopify includes:
      </p>
      <ul>
        <li>Order information</li>
        <li>Shipping and tracking details</li>
        <li>Customer information contained in order records</li>
        <li>Product and policy-related store information</li>
      </ul>

      <h3>6.3 Gmail and Outlook</h3>
      <p>
        We connect to Gmail and/or Outlook to access incoming support emails and draft reply
        workflows. Data that may be processed includes:
      </p>
      <ul>
        <li>Email message content</li>
        <li>Sender details</li>
        <li>Email metadata</li>
        <li>Draft and approval status</li>
      </ul>

      <h3>6.4 Stripe</h3>
      <p>
        We use Stripe to manage payments, subscriptions, and billing. Data that may be processed
        by Stripe includes:
      </p>
      <ul>
        <li>Billing name</li>
        <li>Billing email</li>
        <li>Payment method details</li>
        <li>Subscription and invoice records</li>
      </ul>
      <p>We do not store full payment card details on our own servers.</p>

      <h3>6.5 Vercel and Railway</h3>
      <p>
        We use Vercel and Railway to host parts of our website, application, and backend
        infrastructure. These providers may process:
      </p>
      <ul>
        <li>Application data</li>
        <li>Logs</li>
        <li>Performance data</li>
        <li>Account and operational metadata</li>
      </ul>

      <h2>7. Data Sharing</h2>
      <p>We share information only in limited circumstances:</p>
      <ul>
        <li>With service providers that help us operate RegardsKim</li>
        <li>
          If required by law, regulation, legal process, or lawful government request
        </li>
        <li>
          To protect the rights, property, or safety of RegardsKim, our users, or others
        </li>
        <li>
          As part of a business transfer, merger, acquisition, or sale of assets, subject to
          appropriate confidentiality protections where possible
        </li>
      </ul>
      <p>
        We do not share your information for unrelated advertising or data-broker purposes.
      </p>

      <h2>8. Cookies and Analytics</h2>
      <p>We may use cookies and similar technologies to:</p>
      <ul>
        <li>Keep you signed in</li>
        <li>Remember preferences</li>
        <li>Understand how people use our website and product</li>
        <li>Measure performance and improve the service</li>
        <li>Support security and fraud prevention</li>
      </ul>
      <p>
        You can usually control cookies through your browser settings. Some parts of the service
        may not function properly if certain cookies are disabled.
      </p>

      <h2>9. Data Storage and Security</h2>
      <p>
        We take reasonable technical and organisational measures to protect personal information
        from loss, misuse, unauthorised access, disclosure, alteration, or destruction. These
        measures may include:
      </p>
      <ul>
        <li>Access controls and authentication requirements</li>
        <li>Encrypted connections (such as HTTPS/TLS)</li>
        <li>Secure hosting infrastructure</li>
        <li>Limited internal access to data</li>
        <li>Logging and monitoring for security and reliability</li>
        <li>Prompt investigation of suspected security issues</li>
      </ul>
      <p>
        No system is completely secure, and we cannot guarantee absolute security. But we work to
        use safeguards appropriate to the nature of the data we handle.
      </p>

      <h2>10. Data Retention and Deletion</h2>
      <p>
        We keep information only for as long as reasonably necessary to provide the service,
        comply with legal obligations, resolve disputes, enforce agreements, and maintain
        legitimate business records.
      </p>
      <ul>
        <li>Active account data is retained while your account is open and the service is in use</li>
        <li>
          Billing and transaction records may be retained for accounting, tax, and legal
          compliance purposes
        </li>
        <li>
          Logs and backups may be retained for a limited period for security and operational
          continuity
        </li>
      </ul>
      <p>
        If you close your account, we will delete or de-identify your data within a reasonable
        period, except where we need to retain certain information for legal, tax, fraud
        prevention, security, or legitimate record-keeping purposes.
      </p>
      <p>
        If you want your data deleted, contact us at <strong>support@regardskim.com</strong>.
      </p>

      <h2>11. International Processing</h2>
      <p>
        We are based in Australia, and some of our service providers may process data in other
        countries. By using RegardsKim, you understand that your information may be transferred
        to and processed outside your jurisdiction, subject to appropriate safeguards where
        required.
      </p>

      <h2>12. Your Rights</h2>
      <p>
        Depending on where you are located, you may have rights regarding your personal
        information, including the right to:
      </p>
      <ul>
        <li>Request access to the personal information we hold about you</li>
        <li>Request correction of inaccurate or incomplete information</li>
        <li>Request deletion of your information</li>
        <li>Object to or restrict certain processing in some circumstances</li>
        <li>Withdraw consent where processing is based on consent</li>
      </ul>
      <p>
        To make a privacy request, email <strong>support@regardskim.com</strong>. We may need to
        verify your identity before completing your request.
      </p>

      <h2>13. Children&apos;s Privacy</h2>
      <p>
        RegardsKim is not intended for children or anyone under 18 years of age. We do not
        knowingly collect personal information directly from children under 18. If you believe a
        child has provided personal information to us, please contact us and we will take
        appropriate steps to delete it.
      </p>

      <h2>14. Third-Party Links and Services</h2>
      <p>
        Our website or product may contain links to third-party websites or services. This
        Privacy Policy does not apply to those third parties, and we are not responsible for
        their privacy practices. We encourage you to review their privacy policies separately.
      </p>

      <h2>15. Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time to reflect changes to our service,
        legal obligations, or data practices. When we do, we will post the updated version and
        revise the &quot;Last updated&quot; date above. If changes are material, we may also
        provide additional notice where appropriate.
      </p>

      <h2>16. Contact Us</h2>
      <p>
        If you have questions, concerns, or requests relating to this Privacy Policy or your
        information, contact: <strong>support@regardskim.com</strong>
      </p>
    </LegalPageLayout>
  );
}
