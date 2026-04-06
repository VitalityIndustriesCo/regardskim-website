import type { ReactNode } from "react";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  meta: string;
  image?: string;
  content: ReactNode;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "customer-support-solo-shopify-founder",
    title: "How to Handle Customer Support as a Solo Shopify Founder",
    date: "March 15, 2026",
    image: "/blog/solo-founder.png",
    meta:
      "Practical tips for solo Shopify founders who are handling every customer email themselves and need a saner support routine.",
    content: (
      <>
        <p>
          Running a Shopify store by yourself sounds exciting until the inbox starts running your day.
        </p>
        <p>
          You wake up to twelve emails. Two people want tracking updates. One wants to change a shipping
          address. Someone else is upset their discount code did not work. Another customer is asking if a
          product will be restocked. Before you have packed orders, checked ads, or touched anything
          important, you have already spent an hour replying.
        </p>
        <p>That is the part nobody talks about enough.</p>
        <p>
          For a lot of small store owners, customer support is not a separate job. It is mixed in with
          everything else. You are the founder, marketer, buyer, packer, and support rep. That is
          manageable at the very start, but once orders pick up, email becomes a tax on your whole business.
        </p>
        <p>
          The good news is you do not need to become a support expert overnight. You just need a simple
          system that keeps customer replies moving without eating your whole day.
        </p>

        <h2>First, stop checking support all day</h2>
        <p>This is the biggest trap.</p>
        <p>
          If your inbox is always open, every new email feels urgent. You answer one message, then another,
          then another, and suddenly your whole day is gone in little pieces.
        </p>
        <p>Instead, pick two or three support blocks each day.</p>
        <p>A simple version could look like this:</p>
        <ul>
          <li>9:00 am: first inbox pass</li>
          <li>1:00 pm: second inbox pass</li>
          <li>4:30 pm: final check for anything urgent</li>
        </ul>
        <p>
          That alone makes a difference. Customers still get replies. You get your brain back.
        </p>
        <p>
          If you are worried about seeming slow, add an auto-reply that sets expectations. Something simple
          works:
        </p>
        <blockquote>
          <p>
            Thanks for reaching out — we check support a few times each day and usually reply within one
            business day.
          </p>
        </blockquote>
        <p>
          That does two things. It buys you time, and it makes your business feel more organized.
        </p>

        <h2>Next, sort your emails into buckets</h2>
        <p>Most support emails are not unique.</p>
        <p>They usually fall into a handful of categories:</p>
        <ul>
          <li>Where is my order?</li>
          <li>Can I change or cancel my order?</li>
          <li>How do returns work?</li>
          <li>Is this product coming back?</li>
          <li>Which size should I buy?</li>
          <li>My discount code is not working</li>
        </ul>
        <p>
          Once you notice the pattern, stop writing every reply from scratch.
        </p>
        <p>
          Create saved replies for your top 5 to 10 email types. Keep them short, friendly, and easy to
          edit. Think of them as a first draft, not a script.
        </p>
        <p>For example, a shipping reply might say:</p>
        <blockquote>
          <p>
            Hey {"{{name}}"}, thanks for reaching out. I checked your order and it looks like it shipped on
            {"{{date}}"}. Your tracking link is here: {"{{tracking_link}}"}. If it does not update within the
            next 24–48 hours, reply here and I’ll look into it for you.
          </p>
        </blockquote>
        <p>
          That kind of message is helpful, clear, and fast to send.
        </p>

        <h2>Put the answer where customers can find it before they email</h2>
        <p>
          If you keep getting the same questions, the problem is not just the inbox. It is often the customer
          experience around it.
        </p>
        <p>Look at your most common support emails and ask:</p>
        <ul>
          <li>Is this information easy to find on the site?</li>
          <li>Is it clear in the order confirmation email?</li>
          <li>Is it explained in the shipping or returns policy?</li>
          <li>Are customers getting enough updates after they buy?</li>
        </ul>
        <p>
          If people constantly ask when their order will ship, your shipping page may be vague. If they keep
          asking about returns, your returns policy may be too hard to find or too hard to understand. If
          they are asking for tracking links, your post-purchase emails may be weak.
        </p>
        <p>
          A few small fixes here can cut email volume more than people expect.
        </p>

        <h2>Create a “good enough” support standard</h2>
        <p>
          Solo founders often make support harder than it needs to be because they want every reply to be
          perfect.
        </p>
        <p>
          It does not need to be perfect. It needs to be clear, kind, and useful.
        </p>
        <p>A good support reply usually does three things:</p>
        <ol>
          <li>Answers the question</li>
          <li>Says what happens next</li>
          <li>Gives the customer an easy next step if they still need help</li>
        </ol>
        <p>That is it.</p>
        <p>
          You do not need long explanations. You do not need polished brand theater in every email.
          Customers mostly want a real answer and some sense that someone is paying attention.
        </p>

        <h2>Know which emails deserve your personal attention</h2>
        <p>Not every message should be treated the same.</p>
        <p>Some emails are simple admin. Some matter more.</p>
        <p>These deserve extra care:</p>
        <ul>
          <li>Angry customers</li>
          <li>Missing or damaged orders</li>
          <li>Refund disputes</li>
          <li>VIP or repeat customers</li>
          <li>Situations where your store made a mistake</li>
        </ul>
        <p>Those are worth a thoughtful, human reply.</p>
        <p>
          But if someone is just asking for a tracking link, that should not cost you ten minutes.
        </p>
        <p>
          The trick is to save your energy for the emails where your judgment actually matters.
        </p>

        <h2>Use your store data, not your memory</h2>
        <p>
          A lot of support feels stressful because founders try to keep everything in their heads.
        </p>
        <p>Do not do that.</p>
        <p>
          When replying, work from actual order details, tracking info, shipping policies, and product pages.
          The more you can ground your reply in real store data, the faster and more accurate you will be.
        </p>
        <p>
          This is also where tools can help. For example, RegardsKim is built for Shopify stores and can
          draft customer email replies using order details, tracking information, and your policies, then
          queue them for your approval before anything gets sent. That kind of setup is useful when you are
          answering the same types of questions over and over but still want the final say.
        </p>
        <p>
          Even if you do not use a tool like that, the principle is the same: build your support process
          around facts, not memory.
        </p>

        <h2>Keep a living support note</h2>
        <p>Start one simple document with:</p>
        <ul>
          <li>Saved replies</li>
          <li>Links to your key policies</li>
          <li>Common edge cases</li>
          <li>Refund rules</li>
          <li>Shipping timeframes</li>
          <li>Any answers you find yourself reusing</li>
        </ul>
        <p>This becomes your support playbook.</p>
        <p>
          It does not need to be fancy. A messy but useful note is better than reinventing every answer each
          morning.
        </p>
        <p>
          And if you hire help later, you already have the beginnings of a real support system.
        </p>

        <h2>Fix the root causes once a week</h2>
        <p>
          Support gets lighter when you stop treating every email as a one-off event.
        </p>
        <p>Once a week, spend 20 minutes reviewing what came in.</p>
        <p>Ask:</p>
        <ul>
          <li>What questions came up the most?</li>
          <li>What caused confusion?</li>
          <li>Which emails could have been prevented?</li>
          <li>What page, email, or policy should I improve?</li>
        </ul>
        <p>This is where support starts helping the business instead of just interrupting it.</p>
        <p>
          Maybe you update a shipping page. Maybe you add a better size chart. Maybe you change your order
          confirmation email. Maybe you make your returns window clearer.
        </p>
        <p>Those small changes stack up.</p>

        <h2>A simple support routine that actually works</h2>
        <p>If you want a basic system, start here:</p>
        <p><strong>Daily</strong></p>
        <ul>
          <li>Check support 2–3 times</li>
          <li>Use saved replies for repeat questions</li>
          <li>Flag any issue that needs a thoughtful follow-up</li>
        </ul>
        <p><strong>Weekly</strong></p>
        <ul>
          <li>Review your top support questions</li>
          <li>Update one page, email, or policy to reduce repeat questions</li>
          <li>Add any new useful reply to your saved response bank</li>
        </ul>
        <p>
          That is enough to create order without turning support into a giant project.
        </p>

        <h2>Final thought</h2>
        <p>
          If you are a solo Shopify founder, the goal is not to answer emails faster and faster forever.
        </p>
        <p>
          The goal is to build a support setup that does not depend on you being glued to your inbox all day.
        </p>
        <p>
          Start with response blocks. Write saved replies. Fix the pages that create confusion. Use tools
          where they help. Keep the human touch for the moments that need it.
        </p>
        <p>
          Customer support matters, but it should support your business, not swallow it.
        </p>
      </>
    ),
  },
  {
    slug: "reduce-where-is-my-order-emails",
    title: "How to Reduce 'Where Is My Order?' Emails in Your Shopify Store",
    date: "March 22, 2026",
    image: "/blog/wismo.png",
    meta:
      "Tired of constant ‘Where is my order?’ emails? Here are practical ways Shopify stores can cut WISMO support questions.",
    content: (
      <>
        <p>
          If you run a Shopify store, there is a good chance one question shows up more than any other:
        </p>
        <p>Where is my order?</p>
        <p>
          These emails are so common there is even a nickname for them: WISMO.
        </p>
        <p>
          They are not usually angry emails. Most customers just want reassurance. They placed an order,
          money left their account, and now they want to know what is happening.
        </p>
        <p>The problem is volume.</p>
        <p>
          When you get a few WISMO emails a day, it is annoying. When you get dozens, it becomes a real drag
          on the business. You end up spending time copying tracking links, repeating delivery windows, and
          calming people down one by one.
        </p>
        <p>The good news is that most WISMO emails are preventable.</p>
        <p>
          Customers ask because they are missing information, confused by timing, or not confident they can
          trust the process. If you fix those gaps, the inbox gets quieter.
        </p>

        <h2>Why customers ask where their order is</h2>
        <p>Usually it comes down to one of these:</p>
        <ul>
          <li>They did not realize processing takes a few days</li>
          <li>They got an order confirmation but no clear shipping timeline</li>
          <li>Tracking has not updated yet</li>
          <li>The tracking page is confusing</li>
          <li>Delivery is taking longer than expected</li>
          <li>They do not know where to look for updates</li>
        </ul>
        <p>
          In other words, customers are often not asking because something is wrong. They are asking because
          the silence feels wrong.
        </p>
        <p>Your job is to replace that silence with useful updates.</p>

        <h2>Be painfully clear about shipping times</h2>
        <p>
          A lot of stores bury shipping info in a policy page nobody reads.
        </p>
        <p>That is not enough.</p>
        <p>Customers should see your shipping expectations in multiple places:</p>
        <ul>
          <li>On the product page</li>
          <li>In the cart if needed</li>
          <li>In the order confirmation email</li>
          <li>On your shipping policy page</li>
          <li>In shipping update emails after purchase</li>
        </ul>
        <p>Be specific.</p>
        <p>“Ships soon” is vague. “Orders ship in 2–4 business days” is clear.</p>
        <p>
          If you sell handmade, made-to-order, or pre-order products, say that plainly. Many WISMO emails
          happen because customers assume Amazon speed unless you tell them otherwise.
        </p>

        <h2>Send a better order confirmation email</h2>
        <p>
          Most order confirmations focus on the receipt. They confirm the purchase but do not reduce anxiety.
        </p>
        <p>
          A better confirmation email answers the next question before the customer asks it.
        </p>
        <p>Include:</p>
        <ul>
          <li>Their order number</li>
          <li>What they ordered</li>
          <li>Your current processing timeline</li>
          <li>When they should expect a tracking email</li>
          <li>A link to your shipping policy</li>
          <li>A support contact if something is wrong</li>
        </ul>
        <p>For example:</p>
        <blockquote>
          <p>
            We’ve received your order and our team is getting it ready. Orders are currently shipping within
            2–4 business days. As soon as your package goes out, we’ll email your tracking link.
          </p>
        </blockquote>
        <p>
          That one paragraph can prevent a lot of unnecessary follow-ups.
        </p>

        <h2>Make tracking easy to find</h2>
        <p>Do not make customers dig through old emails to find a tracking link.</p>
        <p>
          When the order ships, the shipping confirmation email should be simple and obvious. The tracking
          button should be hard to miss.
        </p>
        <p>Also, check the actual tracking experience.</p>
        <p>
          If the carrier page is confusing, delayed, or ugly on mobile, customers may still email you even if
          you technically sent the link.
        </p>
        <p>
          Some stores use branded tracking pages for this reason. Even a basic, clean page with plain
          language can make customers feel more informed.
        </p>

        <h2>Explain the tracking delay before it happens</h2>
        <p>This is a big one.</p>
        <p>
          A customer gets the shipping email, clicks the tracking link, and sees “label created” or no
          movement yet. Now they think nothing is happening.
        </p>
        <p>That is when the WISMO email lands.</p>
        <p>
          You can stop a lot of that by setting expectations in the shipping email itself:
        </p>
        <blockquote>
          <p>
            Your tracking link may take 24–48 hours to update after your order is scanned by the carrier.
          </p>
        </blockquote>
        <p>That one sentence saves a surprising amount of support time.</p>

        <h2>Add a shipping status section to your FAQ</h2>
        <p>Your FAQ should answer real questions, not just generic store info.</p>
        <p>A good shipping FAQ includes:</p>
        <ul>
          <li>How long processing takes</li>
          <li>How long shipping usually takes</li>
          <li>When tracking updates appear</li>
          <li>What to do if a package seems stuck</li>
          <li>What happens if the order is marked delivered but not received</li>
        </ul>
        <p>Write it the way a customer would ask it.</p>
        <p>
          Instead of “Fulfillment timelines,” say “When will my order ship?” Instead of “Carrier tracking
          exceptions,” say “Why has my tracking not updated?”
        </p>
        <p>Use customer language, not internal language.</p>

        <h2>Send proactive updates when delays happen</h2>
        <p>
          Customers are usually more patient when you tell them what is going on before they have to ask.
        </p>
        <p>
          If there is a delay because of a busy sales period, warehouse issue, supplier hold-up, or carrier
          slowdown, email affected customers early.
        </p>
        <p>Keep it simple:</p>
        <ul>
          <li>What is delayed</li>
          <li>Why</li>
          <li>What the new timing looks like</li>
          <li>What they can do if they have concerns</li>
        </ul>
        <p>This does not need to be perfect. It just needs to be honest.</p>
        <p>Silence creates more frustration than bad news delivered clearly.</p>

        <h2>Look for preventable patterns</h2>
        <p>If WISMO emails keep flooding in, do not just answer them. Study them.</p>
        <p>Ask:</p>
        <ul>
          <li>Are they clustered around certain products?</li>
          <li>Do they spike after sales or launches?</li>
          <li>Are international orders creating confusion?</li>
          <li>Is one shipping carrier causing most of the concern?</li>
          <li>Are customers unclear on your processing times?</li>
        </ul>
        <p>Once you see the pattern, fix the source.</p>
        <p>
          Maybe your product page needs a shipping note. Maybe your confirmation email needs one stronger
          sentence. Maybe your tracking email should explain delays better. Maybe you need a clearer shipping
          policy.
        </p>
        <p>Small changes can cut support volume fast.</p>

        <h2>Use templates for the rest</h2>
        <p>
          Even with better communication, you will still get some WISMO emails. That is normal.
        </p>
        <p>Have a few saved replies ready for common cases:</p>
        <ul>
          <li>Order is still in processing</li>
          <li>Tracking link sent, waiting for update</li>
          <li>Package is in transit but delayed</li>
          <li>Marked delivered but customer cannot find it</li>
        </ul>
        <p>These should be friendly and specific enough to feel human.</p>
        <p>For example:</p>
        <blockquote>
          <p>
            Hey {"{{name}}"}, thanks for checking in. I looked at your order and it’s currently in transit.
            Here’s your tracking link: {"{{tracking_link}}"}. Sometimes tracking takes a little time to update
            between scans, but if you don’t see movement in the next 2 business days, reply here and I’ll
            take a closer look.
          </p>
        </blockquote>
        <p>Fast, reassuring, and easy to personalize.</p>

        <h2>Where a tool like Kim fits</h2>
        <p>
          If WISMO questions are eating your day, this is the kind of task that should not depend on you
          manually writing every reply.
        </p>
        <p>
          RegardsKim can read incoming support emails, pull in order and tracking details from your Shopify
          store, draft the reply, and leave it for you to approve before it goes out. That means repetitive
          support can move faster without losing control.
        </p>
        <p>
          But even if you never use a tool, the same lesson applies: the best fix for WISMO is better
          communication before the customer has to ask.
        </p>

        <h2>Final thought</h2>
        <p>Most “Where is my order?” emails are not really about the order.</p>
        <p>They are about uncertainty.</p>
        <p>
          If customers know what to expect, where to look, and when to worry, they email less. That means
          less time spent copying tracking links and more time spent actually growing the store.
        </p>
        <p>Start with the basics:</p>
        <ul>
          <li>Clear shipping timelines</li>
          <li>Better order confirmation emails</li>
          <li>Easy-to-find tracking</li>
          <li>A note about tracking delays</li>
          <li>Proactive updates when things go wrong</li>
        </ul>
        <p>
          That is how you reduce WISMO emails without becoming a full-time customer support desk.
        </p>
      </>
    ),
  },
  {
    slug: "scale-customer-support-without-hiring",
    title: "How to Scale Customer Support Without Hiring a Team",
    date: "March 29, 2026",
    image: "/blog/scale-support.png",
    meta:
      "Learn how Shopify store owners can handle more customer support without hiring a full team or spending all day in the inbox.",
    content: (
      <>
        <p>
          There comes a point in a growing Shopify store where support starts feeling heavier than it should.
        </p>
        <p>
          You are getting more orders, which is good. But you are also getting more questions, more
          follow-ups, more return requests, more shipping issues, and more “quick” emails that are never
          actually quick.
        </p>
        <p>At that stage, many founders assume there are only two options:</p>
        <ol>
          <li>Keep doing it all yourself and stay overwhelmed</li>
          <li>Hire someone</li>
        </ol>
        <p>But there is a middle ground.</p>
        <p>
          You can often handle a lot more support without adding payroll right away. The answer is not
          working faster. It is building a better system.
        </p>

        <h2>First, accept that growth creates support by default</h2>
        <p>More orders means more customer contact. That part is normal.</p>
        <p>
          What matters is whether those extra emails require more human work, or whether your systems absorb
          most of the load.
        </p>
        <p>
          If every extra order creates extra manual support, your store becomes harder to run as it grows.
        </p>
        <p>
          If the common questions are handled by clear policies, good customer emails, and reusable replies,
          you can support more customers without support taking over the business.
        </p>
        <p>That is the real goal.</p>

        <h2>Start by measuring what is actually coming in</h2>
        <p>Before you fix anything, spend a week categorizing your support emails.</p>
        <p>Keep it simple. Use buckets like:</p>
        <ul>
          <li>Shipping status</li>
          <li>Order changes</li>
          <li>Returns and exchanges</li>
          <li>Product questions</li>
          <li>Discount questions</li>
          <li>Damaged or missing items</li>
          <li>General complaints</li>
        </ul>
        <p>At the end of the week, you will usually see something obvious:</p>
        <ul>
          <li>A few categories make up most of the volume</li>
          <li>Many replies are nearly identical</li>
          <li>Some emails could have been prevented entirely</li>
        </ul>
        <p>That gives you a roadmap.</p>
        <p>Do not try to improve everything at once. Fix the biggest repeat problems first.</p>

        <h2>Cut the easy questions at the source</h2>
        <p>The cheapest support ticket is the one that never gets sent.</p>
        <p>
          A lot of repetitive customer emails happen because the information exists, but customers cannot
          find it or do not notice it at the right moment.
        </p>
        <p>Look at the top questions and ask where the answer should live:</p>
        <ul>
          <li>Product page</li>
          <li>Cart page</li>
          <li>FAQ</li>
          <li>Shipping page</li>
          <li>Returns page</li>
          <li>Order confirmation email</li>
          <li>Shipping confirmation email</li>
        </ul>
        <p>
          If people keep asking when an item will ship, make that clearer before purchase. If they keep
          asking about returns, rewrite the policy in plain English. If customers ask where the tracking link
          is, improve the shipping email.
        </p>
        <p>These changes are not glamorous, but they work.</p>

        <h2>Use saved replies for anything you answer twice</h2>
        <p>If you have written basically the same email more than twice, save it.</p>
        <p>A good saved reply should:</p>
        <ul>
          <li>Sound like a real person</li>
          <li>Be easy to edit</li>
          <li>Include the next step clearly</li>
          <li>Avoid long blocks of text</li>
        </ul>
        <p>
          This is one of the fastest ways to reduce support time without hiring anyone.
        </p>
        <p>Saved replies are especially useful for:</p>
        <ul>
          <li>Shipping updates</li>
          <li>Return instructions</li>
          <li>Exchange requests</li>
          <li>Discount code questions</li>
          <li>Address changes</li>
          <li>Restock questions</li>
        </ul>
        <p>You are not being lazy. You are avoiding pointless repetition.</p>

        <h2>Separate simple support from exception cases</h2>
        <p>Not all emails deserve the same amount of time.</p>
        <p>Some are routine. Some need judgment.</p>
        <p>Routine:</p>
        <ul>
          <li>Tracking requests</li>
          <li>Return instructions</li>
          <li>Order status checks</li>
          <li>Basic product questions</li>
        </ul>
        <p>Needs more attention:</p>
        <ul>
          <li>Upset customers</li>
          <li>Lost packages</li>
          <li>Refund disputes</li>
          <li>Wrong item received</li>
          <li>High-value customer issues</li>
        </ul>
        <p>
          The mistake many founders make is giving every email equal energy.
        </p>
        <p>That burns time fast.</p>
        <p>
          Instead, build a system where routine emails are handled quickly and consistently, and your energy
          goes toward the situations that actually need a human brain.
        </p>

        <h2>Create a lightweight support playbook</h2>
        <p>You do not need a giant operations manual.</p>
        <p>A simple support playbook can live in one document and include:</p>
        <ul>
          <li>Your saved replies</li>
          <li>Refund and return rules</li>
          <li>Shipping timeframes</li>
          <li>Escalation notes for tricky cases</li>
          <li>Links to your policy pages</li>
          <li>Brand tone examples</li>
        </ul>
        <p>
          This helps even if you are still doing support alone. And if you bring on part-time help later, you
          are not starting from zero.
        </p>
        <p>Think of it as reducing decision fatigue.</p>

        <h2>Improve your post-purchase emails</h2>
        <p>
          A surprising amount of support comes from silence after someone places an order.
        </p>
        <p>Customers want reassurance. They want to know:</p>
        <ul>
          <li>Did the order go through?</li>
          <li>When will it ship?</li>
          <li>Where will I find tracking?</li>
          <li>What if something goes wrong?</li>
        </ul>
        <p>
          If your post-purchase emails answer those questions well, your inbox gets lighter.
        </p>
        <p>
          This matters because post-purchase communication scales better than one-by-one replies. A clear
          email can help every customer. A manual response helps one.
        </p>

        <h2>Set support windows instead of being always available</h2>
        <p>
          Being reachable all day feels responsible, but it usually makes support more chaotic.
        </p>
        <p>Set response windows and stick to them.</p>
        <p>For example:</p>
        <ul>
          <li>Morning inbox block</li>
          <li>Early afternoon inbox block</li>
          <li>End-of-day urgent check</li>
        </ul>
        <p>
          That gives customers timely replies without letting support interrupt everything else.
        </p>
        <p>
          If needed, use an auto-reply that tells people when to expect a response.
        </p>
        <p>Customers usually handle waiting better when they know what the wait is.</p>

        <h2>Use automation carefully</h2>
        <p>
          There is a reason founders get turned off by support automation. Bad automation feels cold,
          repetitive, and wrong.
        </p>
        <p>
          But good automation is different. Good automation handles the repeat work and leaves the edge cases
          to you.
        </p>
        <p>That could mean:</p>
        <ul>
          <li>Auto-sending order and shipping updates</li>
          <li>Using a help desk with saved replies</li>
          <li>Routing emails by topic</li>
          <li>Drafting responses using store data</li>
        </ul>
        <p>
          This is where a tool like RegardsKim can make sense for a growing Shopify store. Kim reads incoming
          customer emails, drafts replies using order info, tracking, and store policies, and puts those
          drafts in front of you for approval. That is useful when you want faster handling of repetitive
          support without handing the whole customer experience over to a black box.
        </p>
        <p>The key is control. Automation should reduce busywork, not create new mess.</p>

        <h2>Know when hiring is actually the right move</h2>
        <p>Not every store should avoid hiring forever.</p>
        <p>A hire starts making sense when:</p>
        <ul>
          <li>Support issues are complex and high-touch</li>
          <li>Volume is high across many channels</li>
          <li>You are missing sales or operational work because of the inbox</li>
          <li>Support quality is slipping because you are stretched thin</li>
        </ul>
        <p>
          But many stores hire too early because the inbox feels messy when the real problem is missing
          systems.
        </p>
        <p>Fix the systems first. Then you will know whether you truly need another person.</p>

        <h2>A practical order of operations</h2>
        <p>If you want to scale support without hiring, do it in this order:</p>
        <ol>
          <li>Track your top support categories</li>
          <li>Improve the pages and emails causing repeat questions</li>
          <li>Create saved replies for common issues</li>
          <li>Set support time blocks</li>
          <li>Build a simple support playbook</li>
          <li>Add tools or automation for repetitive email handling</li>
          <li>Reassess whether hiring is still necessary</li>
        </ol>
        <p>
          That approach keeps costs low and gives you a cleaner operation either way.
        </p>

        <h2>Final thought</h2>
        <p>
          You do not need a support team just because your store is getting busier.
        </p>
        <p>
          What you need is a setup that handles routine questions consistently, gives customers the right
          information earlier, and saves your attention for the problems that actually need you.
        </p>
        <p>
          That is how small stores grow without the founder getting trapped in the inbox.
        </p>
        <p>
          And if you reach the point where you do hire, those systems still pay off. They make your next
          support person better on day one.
        </p>
      </>
    ),
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
