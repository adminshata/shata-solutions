import Link from 'next/link';
import React from 'react';

const BP = "/templates/supermarket-5/preview";

function FooterTwo() {
  return (
    <div>
      <>
        <div className="rts-footer-area-two">
          <div className="container-2">
            <div className="row">
              <div className="coll-lg-12">
                <div className="footer-two-main-wrapper">
                  <div className="footer-single-wixed-two start">
                    <Link href={BP} className="logo-area">
                      <span style={{ fontWeight: 700, fontSize: '22px', color: 'var(--color-primary)' }}>VividMart</span>
                    </Link>
                    <p className="disc">What&apos;s inside: New Arrivals, Exclusive Sales, News &amp; More</p>
                    <form action="#">
                      <input type="email" placeholder="Email Address" />
                      <button className="rts-btn btn-primary"><i className="fa-light fa-arrow-right" /></button>
                    </form>
                    <div className="social-style-dash">
                      <ul>
                        {["fa-facebook-f","fa-twitter","fa-linkedin-in","fa-youtube","fa-instagram"].map((icon, i) => (
                          <li key={i}><a href="#"><i className={`fa-brands ${icon}`} /></a></li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="single-footer-wized mid">
                    <h3 className="footer-title">Our Stores</h3>
                    <div className="footer-nav">
                      <ul>
                        <li><a href="#">Delivery Information</a></li>
                        <li><Link href={`${BP}/privacy-policy`}>Privacy Policy</Link></li>
                        <li><Link href={`${BP}/terms-condition`}>Terms &amp; Conditions</Link></li>
                        <li><a href="#">Support Center</a></li>
                        <li><a href="#">Careers</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="single-footer-wized mid">
                    <h3 className="footer-title">Shop Categories</h3>
                    <div className="footer-nav">
                      <ul>
                        <li><Link href={`${BP}/contact`}>Contact Us</Link></li>
                        <li><a href="#">Information</a></li>
                        <li><Link href={`${BP}/about`}>About Us</Link></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">VividMart Stories</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="single-footer-wized">
                    <h3 className="footer-title">Need Help? / Contact Us</h3>
                    <div className="contact-information">
                      <div className="single-contact-information-area">
                        <div className="icon-area"><img src="/templates/supermarket5/icons/11.svg" alt="icons" /></div>
                        <div className="information-area"><p className="disc">258 Daniel Street, 2589 Phones Line <br />Berlin, Germany</p></div>
                      </div>
                      <div className="single-contact-information-area">
                        <div className="icon-area"><img src="/templates/supermarket5/icons/12.svg" alt="icons" /></div>
                        <div className="information-area"><p className="disc">Call us between 8:00 AM - 12PM <br /><a href="#">+25896 3158 3228</a></p></div>
                      </div>
                      <div className="single-contact-information-area">
                        <div className="icon-area"><img src="/templates/supermarket5/icons/13.svg" alt="icons" /></div>
                        <div className="information-area"><p className="disc">Live Chat <br /><span>Chat With an Expert</span></p></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rts-copyright-area-two">
          <div className="container-2">
            <div className="row">
              <div className="col-lg-12">
                <div className="copyright-arae-two-wrapper">
                  <p className="disc">Copyright 2025 <a href="#">©VividMart</a>. All rights reserved.</p>
                  <div className="payment-processw-area">
                    <span>Payment Accepts:</span>
                    <img src="/templates/supermarket5/payment/04.png" alt="payment" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
export default FooterTwo;
