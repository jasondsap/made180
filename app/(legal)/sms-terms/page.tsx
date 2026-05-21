import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SMS Terms of Service | MADE180 Digital Solutions',
  description: 'Terms governing participation in MADE180 SMS messaging programs, including opt-in, opt-out, message frequency, and crisis disclaimers.',
  alternates: { canonical: 'https://www.made180.com/sms-terms' },
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

export default function SmsTermsPage() {
  return (
    <article>
      <h1 className="text-4xl font-bold mb-3" style={{ color: 'var(--navy)' }}>SMS Terms of Service</h1>
      <p className="text-sm mb-1" style={{ color: 'var(--text-light)', fontFamily: 'var(--mono)' }}>
        <strong>Effective Date:</strong> May 21, 2026
      </p>
      <p className="text-sm mb-8" style={{ color: 'var(--text-light)', fontFamily: 'var(--mono)' }}>
        <strong>Last Updated:</strong> May 21, 2026
      </p>

      <P>
        These SMS Terms of Service (&ldquo;Terms&rdquo;) govern your participation in any text messaging (SMS) program operated by MADE180 (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), including SMS programs that MADE180 operates on behalf of our clients (each, a &ldquo;Program Sponsor&rdquo;).
      </P>
      <P>
        By opting in to a MADE180 SMS program, you agree to these Terms. If you do not agree, do not opt in, or reply STOP at any time to opt out.
      </P>

      <HR />

      <H2>1. Description of Service</H2>
      <P>MADE180 SMS programs deliver program-related text messages to participants who have opted in. Depending on the specific program, messages may include:</P>
      <UL>
        <li>Appointment and check-in reminders</li>
        <li>Invitations to complete self-assessment forms via secure web links</li>
        <li>Program milestone notifications</li>
        <li>Care coordination updates</li>
        <li>Program status updates</li>
        <li>Responses to your HELP and STOP requests</li>
      </UL>
      <P>The specific purpose, sender, and content of messages depends on the program you have opted into. Active programs are listed at the bottom of these Terms.</P>

      <HR />

      <H2>2. Eligibility</H2>
      <P>
        You must be <strong>18 years of age or older</strong> to opt in to a MADE180 SMS program on your own behalf. Participants aged 13–17 may receive messages only with verifiable consent of a parent or legal guardian, or where authorized by court order or program sponsor. We do not knowingly send messages to children under 13.
      </P>
      <P>
        You must have the legal authority to consent to receive SMS at the mobile phone number you provide, and the mobile phone number must be a number you regularly use and control.
      </P>

      <HR />

      <H2>3. Opt-In</H2>
      <P>You opt in to a MADE180 SMS program by one or more of the following methods, depending on the program:</P>
      <UL>
        <li>Signing a written consent form at program intake</li>
        <li>Completing a web form on a Program Sponsor&rsquo;s intake portal</li>
        <li>Other opt-in methods specifically disclosed by the program at the time of enrollment</li>
      </UL>
      <P>
        Your opt-in confirms that you authorize MADE180 (and the applicable Program Sponsor) to send you SMS messages at the mobile number you provided, and that you have read and agree to these Terms and the{' '}
        <Link href="/sms-privacy" className="underline" style={{ color: 'var(--teal)' }}>SMS Privacy Policy</Link>.
      </P>

      <HR />

      <H2>4. Opt-Out (STOP)</H2>
      <P>You may opt out of receiving messages at any time by replying <strong>STOP</strong> to any message you receive from a MADE180 SMS program.</P>
      <P>When you reply STOP:</P>
      <UL>
        <li>You will receive a single confirmation message acknowledging your opt-out</li>
        <li>You will not receive further messages from that SMS program</li>
        <li>Your opt-out is honored within the timeframe required by applicable law and carrier rules (typically immediately)</li>
      </UL>
      <P>
        If you opt out and later wish to receive messages again, you must re-enroll through the program&rsquo;s intake process. Replying START or UNSTOP is not sufficient to re-enroll.
      </P>
      <P>
        <strong>Important:</strong> Opting out of SMS does not remove you from the underlying program (for example, a court-referred treatment program). If you are enrolled in such a program, contact the Program Sponsor for non-SMS communication options. Opting out of SMS reminders may affect your ability to receive timely notifications about appointments, deadlines, or program requirements.
      </P>

      <HR />

      <H2>5. Help (HELP)</H2>
      <P>For help, reply <strong>HELP</strong> to any message. You will receive a response with contact information for the relevant Program Sponsor and for MADE180.</P>
      <P>
        You may also contact MADE180 directly by email at{' '}
        <a href="mailto:support@made180.com" className="underline" style={{ color: 'var(--teal)' }}>support@made180.com</a>.
      </P>

      <HR />

      <H2>6. Message Frequency</H2>
      <P>
        Message frequency depends on the program and your individual status within that program. For most MADE180 SMS programs, participants receive <strong>1–4 messages per week</strong>. Some programs may send messages less frequently. Refer to the row in the &ldquo;Active SMS Programs&rdquo; table at the bottom of these Terms for the specific frequency disclosure for your program.
      </P>

      <HR />

      <H2>7. Message and Data Rates</H2>
      <P>
        <strong>Message and data rates may apply.</strong> Your mobile carrier may charge you for sending or receiving text messages, including STOP and HELP messages, depending on the terms of your mobile plan. MADE180 and the Program Sponsor are not responsible for these charges. Contact your mobile carrier for information about your plan.
      </P>

      <HR />

      <H2>8. NOT FOR EMERGENCIES</H2>
      <P>
        <strong>MADE180 SMS programs are not monitored 24/7 and are not intended for emergencies.</strong>
      </P>
      <P>If you are experiencing a medical emergency, mental health crisis, or are in immediate danger, do not use SMS to seek help. Instead:</P>
      <UL>
        <li><strong>Call 911</strong> for any life-threatening emergency</li>
        <li><strong>Call or text 988</strong> (Suicide and Crisis Lifeline) if you are experiencing a mental health crisis, including thoughts of suicide or self-harm</li>
        <li><strong>Call SAMHSA&rsquo;s National Helpline at 1-800-662-4357</strong> for substance use treatment referral and information (free, confidential, 24/7)</li>
        <li>Go to your nearest emergency room</li>
      </UL>
      <P>Replies you send to SMS messages may not be read or responded to in real time. Do not rely on SMS for urgent matters.</P>

      <HR />

      <H2>9. Accuracy of Information</H2>
      <P>
        You agree to provide accurate, current mobile phone number information when opting in and to notify the Program Sponsor promptly if your mobile phone number changes. You agree not to opt in using a mobile phone number that does not belong to you or that you do not have authorization to use.
      </P>
      <P>
        If you change or relinquish your mobile phone number, you agree to opt out before doing so to avoid sending messages to a subsequent holder of that number.
      </P>

      <HR />

      <H2>10. Carrier Disclaimer</H2>
      <P>
        Mobile carriers are not liable for delayed, undelivered, or failed messages. Message delivery depends on the operation of mobile networks and is not guaranteed. MADE180 and the Program Sponsor are not responsible for delays or failures caused by your mobile carrier or your mobile device.
      </P>
      <P>Supported carriers may change without notice. Most major U.S. carriers are supported.</P>

      <HR />

      <H2>11. Limitation of Liability</H2>
      <P>
        To the maximum extent permitted by law, MADE180 and the Program Sponsor are not liable for any indirect, incidental, special, consequential, or punitive damages arising from your participation in a MADE180 SMS program, including but not limited to damages arising from delayed, undelivered, or failed messages, or from reliance on the content of any message.
      </P>
      <P>Nothing in these Terms limits liability that cannot be limited under applicable law.</P>

      <HR />

      <H2>12. Service Modifications</H2>
      <P>
        MADE180 and Program Sponsors reserve the right to modify, suspend, or discontinue any SMS program at any time, with or without notice. We will provide reasonable notice of material changes to active participants where practicable.
      </P>

      <HR />

      <H2>13. Changes to These Terms</H2>
      <P>
        We may update these Terms from time to time. Material changes will be communicated to active participants via SMS or other reasonable means. Your continued participation in the SMS program after a change indicates your acceptance of the updated Terms. The &ldquo;Last Updated&rdquo; date at the top reflects the most recent revision.
      </P>

      <HR />

      <H2>14. Governing Law</H2>
      <P>
        These Terms are governed by the laws of the Commonwealth of Kentucky, without regard to its conflict of laws principles. Any dispute arising from these Terms or your participation in a MADE180 SMS program shall be resolved in the state or federal courts located in Kentucky, and you consent to the personal jurisdiction of those courts.
      </P>

      <HR />

      <H2>15. Contact</H2>
      <P>
        <strong>MADE180</strong><br />
        Email: <a href="mailto:support@made180.com" className="underline" style={{ color: 'var(--teal)' }}>support@made180.com</a><br />
        Privacy: <a href="mailto:privacy@made180.com" className="underline" style={{ color: 'var(--teal)' }}>privacy@made180.com</a>
      </P>
      <P>For program-specific questions, contact the Program Sponsor listed in the &ldquo;Active SMS Programs&rdquo; table below.</P>

      <HR />

      <H2>Active SMS Programs</H2>
      <P>
        The following SMS programs are currently operated by MADE180 and governed by these Terms. To request information about a specific program, contact the listed sponsor.
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
        See also the <Link href="/sms-privacy" className="underline" style={{ color: 'var(--teal)' }}>SMS Privacy Policy</Link>.
      </P>
    </article>
  );
}
