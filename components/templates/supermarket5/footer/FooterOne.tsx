import Link from "next/link";

const BP = "/templates/supermarket-5/preview";

export default function FooterOne() {
  return (
    <>
      <div className="rts-footer-area pt--80 bg_light-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="footer-main-content-wrapper pb--70 pb_sm--30">
                <div className="single-footer-wized">
                  <h3 className="footer-title">About Company</h3>
                  <div className="call-area">
                    <div className="icon"><i className="fa-solid fa-phone-rotary" /></div>
                    <div className="info">
                      <span>Have Question? Call Us 24/7</span>
                      <a href="tel:+15553692569" className="number">+1 (555) 369-2569</a>
                    </div>
                  </div>
                  <div className="opening-hour">
                    <div className="single"><p>Monday - Friday: <span>8:00am - 6:00pm</span></p></div>
                    <div className="single"><p>Saturday: <span>8:00am - 6:00pm</span></p></div>
                    <div className="single"><p>Sunday: <span>Service Close</span></p></div>
                  </div>
                </div>
                <FooterLinks title="Our Stores" links={[["Delivery Information", "/track-order"], ["Privacy Policy", "/privacy-policy"], ["Terms & Conditions", "/terms-condition"], ["Support Center", "/contact"], ["Careers", "/about"]]} />
                <FooterLinks title="Shop Categories" links={[["Contact Us", "/contact"], ["Information", "/store"], ["About Us", "/about"], ["Vendors", "/vendors"], ["VividMart Stories", "/blog"]]} />
                <FooterLinks title="Useful Links" links={[["Cancellation & Returns", "/terms-condition"], ["Report Infringement", "/contact"], ["Payments", "/checkout"], ["Shipping", "/track-order"], ["FAQ", "/contact"]]} />
                <div className="single-footer-wized">
                  <h3 className="footer-title">Our Newsletter</h3>
                  <p className="disc-news-letter">Subscribe to receive updates on new arrivals and other discounts</p>
                  <form className="footersubscribe-form" action="#">
                    <input type="email" placeholder="Your email address" required />
                    <button className="rts-btn btn-primary">Subscribe</button>
                  </form>
                  <p className="dsic">I would like to receive news and special offer</p>
                </div>
              </div>
              <div className="social-and-payment-area-wrapper">
                <div className="social-one-wrapper">
                  <span>Follow Us:</span>
                  <ul>
                    {["fa-facebook-f", "fa-twitter", "fa-youtube", "fa-whatsapp", "fa-instagram"].map((icon) => (
                      <li key={icon}><a href="#" aria-label={icon}><i className={`fa-brands ${icon}`} /></a></li>
                    ))}
                  </ul>
                </div>
                <div className="payment-access">
                  <span>Payment Accepts:</span>
                  <img src="/templates/supermarket5/payment/01.png" alt="Payment methods" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rts-copyright-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="copyright-between-1">
                <p className="disc">Copyright 2026 <Link href={BP}>©VividMart</Link>. All rights reserved.</p>
                <a href="#" className="playstore-app-area">
                  <span>Download App</span>
                  <img src="/templates/supermarket5/payment/02.png" alt="App Store" />
                  <img src="/templates/supermarket5/payment/03.png" alt="Google Play" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function FooterLinks({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="single-footer-wized">
      <h3 className="footer-title">{title}</h3>
      <div className="footer-nav">
        <ul>
          {links.map(([label, href]) => (
            <li key={label}><Link href={`${BP}${href}`}>{label}</Link></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
