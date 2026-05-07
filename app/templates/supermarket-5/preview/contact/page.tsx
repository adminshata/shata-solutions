"use client";
import HeaderTwo from "@/components/templates/supermarket5/header/HeaderTwo";
import FooterTwo from "@/components/templates/supermarket5/footer/FooterTwo";
import BackToTop from "@/components/templates/supermarket5/common/BackToTop";
import Link from "next/link";
const BASE_PATH = "/templates/supermarket-5/preview";
export default function Page() {
  return (
    <div className="demo-one">
      <HeaderTwo />
      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container"><div className="row"><div className="col-lg-12">
          <div className="navigator-breadcrumb-wrapper">
            <Link href={BASE_PATH}>Home</Link>
            <i className="fa-regular fa-chevron-right" />
            <a className="current" href="#">Contact</a>
          </div>
        </div></div></div>
      </div>
      <div className="rts-map-contact-area rts-section-gap2">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-4">
              <div className="contact-left-area-main-wrapper">
                <h2 className="title">You can ask us questions!</h2>
                <p className="disc">Contact us for all your questions and opinions.</p>
                {[{city:"Berlin Germany Store",addr:"259 Daniel Road, FKT 2589 Berlin, Germany.",phone:"+856 (76) 259 6328",email:"info@vividmart.com"},{city:"Frankfurt Germany Store",addr:"259 Daniel Road, FKT 2589 Frankfurt, Germany.",phone:"+856 (76) 259 6329",email:"frankfurt@vividmart.com"}].map((loc, i) => (
                  <div key={i} className="location-single-card">
                    <div className="icon"><i className="fa-light fa-location-dot" /></div>
                    <div className="information">
                      <h3 className="title">{loc.city}</h3>
                      <p>{loc.addr}</p>
                      <a href="#" className="number">{loc.phone}</a>
                      <a href="#" className="email">{loc.email}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-8 pl--50 pl_sm--5 pl_md--5">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14602.288851207937!2d90.47855065!3d23.798243149999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1716725338558!5m2!1sen!2sbd" width={600} height={450} style={{ border: 0, width: '100%', borderRadius: 8 }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </div>
        </div>
      </div>
      <div className="rts-contact-form-area rts-section-gapBottom">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="bg_light-1 contact-form-wrapper-bg">
                <div className="row">
                  <div className="col-lg-7 pr--30 pr_md--10 pr_sm--5">
                    <div className="contact-form-wrapper-1">
                      <h3 className="title mb--50">Fill Up The Form If You Have Any Question</h3>
                      <form action="#" className="contact-form-1">
                        <div className="contact-form-wrapper--half-area">
                          <div className="single"><label>First Name</label><input type="text" placeholder="First name" /></div>
                          <div className="single"><label>Last Name</label><input type="text" placeholder="Last name" /></div>
                        </div>
                        <div className="single-input-area-form"><label>Email</label><input type="email" placeholder="your@email.com" /></div>
                        <div className="single-input-area-form"><label>Message</label><textarea placeholder="Your message..." rows={5}></textarea></div>
                        <button type="submit" className="rts-btn btn-primary">Send Message</button>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div style={{ padding: 32 }}>
                      <h4>Our Business Hours</h4>
                      {[["Monday - Friday","8:00 AM - 8:00 PM"],["Saturday","9:00 AM - 6:00 PM"],["Sunday","10:00 AM - 4:00 PM"]].map(([day, hours], i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee' }}>
                          <span style={{ color: '#666' }}>{day}</span>
                          <span style={{ fontWeight: 500 }}>{hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterTwo />
      <BackToTop />
    </div>
  );
}
