import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SMS Privacy Policy | MADE180 Digital Solutions',
  description: 'How MADE180 collects, uses, and protects information related to its SMS messaging programs.',
  alternates: { canonical: 'https://www.made180.com/sms-privacy' },
};

const H2 = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-bold mt-10 mb-3" style={{ color: 'var(--navy)' }}>{children}</h2>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="leading-relaxed mb-4" style={{ color: 'var(--text-mid)' }}>{children}</p>
);
const UL = ({ children }: { children: React.ReactNode }) => (
  <ul className="list-disc pl-6 space-y-1.5 mb-4" style={{ color: 'var(--text-mid)' }}>{children}</ul>
);
const HR = () => <hr className="my-10" style={{ borderColor: 'rgba(11,29,46,0.08)' }} />;

export default function SmsPrivacyPage() {
  return (
    <article>
      <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--navy)' }}>SMS Privacy Policy</h1>
      <p className="text-sm mb-1" style={{ color: 'var(--text-light)', fontFamily: 'var(--mono)' }}>
        <strong>Effective Date:</strong> May 21, 2026
      </p>
      <p className="text-sm mb-8" style={{ color: 'var(--text-light)', fontFamily: 'var(--mono)' }}>
        <strong>Last Updated:</strong> May 21, 2026
      </p>

      <P>
        This SMS Privacy Policy describes how MADE180 (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) collects, uses, and protects information when you receive text messages (SMS) from MADE180 or from a program operated by MADE180 on behalf of one of our clients.
      </P>
      <P>
        This policy applies to <strong>all SMS messaging programs</strong> operated by MADE180. Specific programs are listed in the &ldquo;Active SMS Programs&rdquo; section below.
      </P>

      <HR />

      <H2>1. Mobile Information Non-Sharing</H2>
      <P>
        <strong>Mobile phone numbers and SMS opt-in data collected through any MADE180 SMS program will not be sold, shared, rented, or transferred to third parties or affiliates for marketing, promotional, or any unrelated purposes.</strong>
      </P>
      <P>We share mobile information only with:</P>
      <UL>
        <li><strong>Service providers strictly necessary to deliver the messages you have opted into</strong>, such as our SMS gateway provider (Twilio Inc.), which is contractually bound to use the information solely to deliver messages on our behalf.</li>
        <li><strong>The program sponsor for whom MADE180 operates the SMS program</strong> (for example, in the case of a healthcare or behavioral health program, the sponsoring agency or provider), to enable program operations such as care coordination, scheduling, and case management.</li>
        <li><strong>Law enforcement, courts, or government agencies</strong> only when required by valid legal process or when necessary to protect the safety of program participants.</li>
      </UL>
      <P>We do not use mobile information for any marketing or promotional purpose outside the program you have opted into.</P>

      <HR />

      <H2>2. Information We Collect</H2>
      <P>When you opt in to a MADE180 SMS program, we may collect:</P>
      <UL>
        <li>Your mobile phone number</li>
        <li>Your first and last name</li>
        <li>The date, time, and content of messages exchanged</li>
        <li>Your responses to messages (including opt-out requests)</li>
        <li>Information you submit through links contained in our messages (such as self-assessment forms, appointment confirmations, or web portal logins)</li>
        <li>Information provided by the program sponsor as part of your enrollment in the underlying program</li>
      </UL>
      <P>We do not collect mobile information from minors without parental or legal guardian consent where required by law.</P>

      <HR />

      <H2>3. How We Use Your Information</H2>
      <P>We use the information we collect to:</P>
      <UL>
        <li>Send you the messages you have opted into (appointment reminders, program notifications, self-assessment invitations, care coordination updates, and similar program-related communications)</li>
        <li>Operate the underlying program on behalf of the sponsor</li>
        <li>Respond to your requests for help (HELP keyword) and opt-out (STOP keyword)</li>
        <li>Maintain records of consent and communication as required by law</li>
        <li>Detect and prevent fraud, abuse, or violations of our Terms of Service</li>
        <li>Comply with legal obligations, court orders, and regulatory requirements</li>
      </UL>

      <HR />

      <H2>4. Message Frequency</H2>
      <P>
        Message frequency varies by program and by your individual status within that program. For most MADE180 SMS programs, participants receive between <strong>1 and 4 messages per week</strong>. Some programs may send messages less frequently. Refer to the program-specific row in the &ldquo;Active SMS Programs&rdquo; table below for the frequency disclosure for your program.
      </P>
      <P>
        <strong>Message and data rates may apply.</strong> Your mobile carrier may charge you for sending or receiving text messages depending on your mobile plan. MADE180 is not responsible for these charges.
      </P>

      <HR />

      <H2>5. How to Opt Out</H2>
      <P>
        You may opt out of receiving messages at any time by replying <strong>STOP</strong> to any message you receive from a MADE180 SMS program. Once you opt out, you will receive a confirmation message and will not receive further messages from that program.
      </P>
      <P>You may also opt out by contacting us using the information in Section 11.</P>
      <P>For help, reply <strong>HELP</strong> to any message you receive, or contact us using the information in Section 11.</P>
      <P>
        Opting out of SMS does not opt you out of the underlying program. If you are enrolled in a court-referred or treatment program operated through a MADE180 SMS service, opting out of SMS may affect your ability to receive timely reminders and notifications, but does not remove you from the program itself. Contact the program sponsor for questions about non-SMS communication options.
      </P>

      <HR />

      <H2>6. Data Security</H2>
      <P>
        We use commercially reasonable administrative, technical, and physical safeguards to protect mobile information from unauthorized access, disclosure, alteration, and destruction. These safeguards include encryption in transit, access controls, and routine security review of our systems and vendors.
      </P>
      <P>
        No system is perfectly secure. By opting in to SMS, you acknowledge that no electronic transmission or storage method can be guaranteed 100% secure.
      </P>

      <HR />

      <H2>7. Data Retention</H2>
      <P>We retain mobile information for as long as you are an active participant in the relevant program, plus the period required by:</P>
      <UL>
        <li>Applicable federal, state, and local laws (including healthcare and court record retention requirements where applicable)</li>
        <li>The sponsoring agency&rsquo;s record retention policies</li>
        <li>Our legitimate operational and audit needs</li>
      </UL>
      <P>When retention is no longer required, mobile information is deleted or de-identified using industry-standard methods.</P>

      <HR />

      <H2>8. Your Rights</H2>
      <P>Depending on your jurisdiction, you may have the right to:</P>
      <UL>
        <li><strong>Access</strong> the mobile information we hold about you</li>
        <li><strong>Correct</strong> inaccurate mobile information</li>
        <li><strong>Request deletion</strong> of mobile information (subject to legal retention requirements)</li>
        <li><strong>Withdraw consent</strong> to SMS communication at any time (see Section 5)</li>
      </UL>
      <P>To exercise any of these rights, contact us using the information in Section 11. We will respond within the timeframe required by applicable law.</P>

      <HR />

      <H2>9. Children&rsquo;s Privacy</H2>
      <P>
        MADE180 SMS programs are not directed to children under 13. We do not knowingly collect mobile information from children under 13 without verifiable parental or legal guardian consent. If you believe a child under 13 has provided mobile information to a MADE180 SMS program without proper consent, contact us using the information in Section 11 and we will delete it promptly.
      </P>
      <P>
        Some MADE180 SMS programs may serve minors aged 13 and older with parental or legal guardian consent, or where authorized by court order or program sponsor.
      </P>

      <HR />

      <H2>10. Third-Party Service Providers</H2>
      <P>We use the following third-party providers to operate our SMS programs:</P>
      <UL>
        <li>
          <strong>Twilio Inc.</strong> — SMS message delivery and A2P 10DLC compliance (
          <a href="https://www.twilio.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: 'var(--teal)' }}>Twilio Privacy Notice</a>
          )
        </li>
        <li><strong>Amazon Web Services</strong> — secure hosting and storage of program data</li>
        <li>Additional vendors as required by individual program sponsors, disclosed to participants at intake</li>
      </UL>
      <P>These providers are contractually obligated to handle mobile information only as necessary to deliver services on our behalf and in compliance with applicable privacy laws.</P>

      <HR />

      <H2>11. Contact Us</H2>
      <P>Questions, requests, or concerns about this SMS Privacy Policy or about mobile information you have provided:</P>
      <P>
        <strong>MADE180</strong><br />
        Email: <a href="mailto:privacy@made180.com" className="underline" style={{ color: 'var(--teal)' }}>privacy@made180.com</a>
      </P>
      <P>For program-specific questions, contact the program sponsor listed in the &ldquo;Active SMS Programs&rdquo; table below.</P>

      <HR />

      <H2>12. Changes to This Policy</H2>
      <P>
        We may update this SMS Privacy Policy from time to time. Material changes will be communicated to active participants via SMS or other reasonable means. The &ldquo;Last Updated&rdquo; date at the top of this policy reflects the most recent revision.
      </P>

      <HR />

      <H2>Active SMS Programs</H2>
      <P>
        The following SMS programs are currently operated by MADE180 and covered by this Privacy Policy. To request information about a specific program, contact the listed sponsor.
      </P>

      <div className="overflow-x-auto my-6">
        <table className="w-full text-sm border-collapse" style={{ color: 'var(--text-mid)' }}>
          <thead>
            <tr style={{ background: 'var(--warm-dark)' }}>
              <th className="text-left p-3 border" style={{ color: 'var(--navy)', borderColor: 'rgba(11,29,46,0.08)' }}>Program</th>
              <th className="text-left p-3 border" style={{ color: 'var(--navy)', borderColor: 'rgba(11,29,46,0.08)' }}>Sponsor</th>
              <th className="text-left p-3 border" style={{ color: 'var(--navy)', borderColor: 'rgba(11,29,46,0.08)' }}>Description</th>
              <th className="text-left p-3 border" style={{ color: 'var(--navy)', borderColor: 'rgba(11,29,46,0.08)' }}>Frequency</th>
              <th className="text-left p-3 border" style={{ color: 'var(--navy)', borderColor: 'rgba(11,29,46,0.08)' }}>Sponsor Contact</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-3 border align-top" style={{ borderColor: 'rgba(11,29,46,0.08)' }}>
                <strong>Behavioral Health Conditional Dismissal Program (BHCDP)</strong>
              </td>
              <td className="p-3 border align-top" style={{ borderColor: 'rgba(11,29,46,0.08)' }}>
                Fletcher Group, Inc. (FGI)
              </td>
              <td className="p-3 border align-top" style={{ borderColor: 'rgba(11,29,46,0.08)' }}>
                Court-referred behavioral health program serving participants in Kentucky. SMS used for appointment reminders, self-assessment invitations, milestone notifications, and care coordination.
              </td>
              <td className="p-3 border align-top" style={{ borderColor: 'rgba(11,29,46,0.08)' }}>
                1–4 messages per week per participant
              </td>
              <td className="p-3 border align-top" style={{ borderColor: 'rgba(11,29,46,0.08)' }}>
                <a href="mailto:info@fletchergroup.org" className="underline" style={{ color: 'var(--teal)' }}>info@fletchergroup.org</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <P>
        See also the <Link href="/sms-terms" className="underline" style={{ color: 'var(--teal)' }}>SMS Terms of Service</Link>.
      </P>
    </article>
  );
}
