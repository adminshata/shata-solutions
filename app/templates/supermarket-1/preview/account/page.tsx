"use client";
import React, { useState } from "react";
import Link from "next/link";
import HeaderOne from "@/components/templates/supermarket1/header/HeaderOne";
import FooterOne from "@/components/templates/supermarket1/footer/FooterOne";

const BASE_PATH = "/templates/supermarket-1/preview";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("track");

  return (
    <div className="demo-one">
      <HeaderOne />

      <div className="rts-navigation-area-breadcrumb bg_light-1">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="navigator-breadcrumb-wrapper">
                <Link href={BASE_PATH}>Home</Link>
                <i className="fa-regular fa-chevron-right" />
                <a className="current" href="#">My Account</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-seperator bg_light-1">
        <div className="container"><hr className="section-seperator" /></div>
      </div>

      <div className="account-tab-area-start rts-section-gap">
        <div className="container-2">
          <div className="row">
            <div className="col-lg-3">
              <div className="nav accout-dashborard-nav flex-column nav-pills me-3" role="tablist">
                {[
                  { key: "dashboard", icon: "fa-chart-line", label: "Dashboard" },
                  { key: "order", icon: "fa-bag-shopping", label: "Order" },
                  { key: "track", icon: "fa-tractor", label: "Track Your Order" },
                  { key: "address", icon: "fa-location-dot", label: "My Address" },
                  { key: "account", icon: "fa-user", label: "Account Details" },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    className={`nav-link ${activeTab === tab.key ? "active" : ""}`}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    <i className={`fa-regular ${tab.icon}`}></i> {tab.label}
                  </button>
                ))}
                <button className="nav-link">
                  <Link href={`${BASE_PATH}/login`}>
                    <i className="fa-light fa-right-from-bracket"></i> Log Out
                  </Link>
                </button>
              </div>
            </div>

            <div className="col-lg-9 pl--50 pl_md--10 pl_sm--10 pt_md--30 pt_sm--30">
              <div className="tab-content">

                {activeTab === "dashboard" && (
                  <div className="dashboard-account-area">
                    <h2 className="title">
                      Hello Raisa! (Not Raisa?) <Link href={`${BASE_PATH}/login`}>Log Out.</Link>
                    </h2>
                    <p className="disc">
                      From your account dashboard you can view your recent orders,
                      manage your shipping and billing addresses, and edit your password and account details.
                    </p>
                  </div>
                )}

                {activeTab === "order" && (
                  <div className="order-table-account">
                    <div className="h2 title">Your Orders</div>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Order</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Total</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>#1357</td>
                            <td>March 15, 2024</td>
                            <td>Processing</td>
                            <td>$125.00 for 2 items</td>
                            <td><a href="#" className="btn-small d-block">View</a></td>
                          </tr>
                          <tr>
                            <td>#2468</td>
                            <td>June 29, 2024</td>
                            <td>Completed</td>
                            <td>$364.00 for 5 items</td>
                            <td><a href="#" className="btn-small d-block">View</a></td>
                          </tr>
                          <tr>
                            <td>#2366</td>
                            <td>August 02, 2024</td>
                            <td>Completed</td>
                            <td>$280.00 for 3 items</td>
                            <td><a href="#" className="btn-small d-block">View</a></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === "track" && (
                  <div className="tracing-order-account">
                    <h2 className="title">Orders tracking</h2>
                    <p>
                      To keep up with the status of your order, kindly input your Order ID
                      in the designated box below and click the &ldquo;Track&rdquo; button.
                    </p>
                    <form className="order-tracking">
                      <div className="single-input">
                        <label>Order Id</label>
                        <input type="text" placeholder="Found in your order confirmation email" required />
                      </div>
                      <div className="single-input">
                        <label>Billing email</label>
                        <input type="email" placeholder="Email You use during checkout" />
                      </div>
                      <button className="rts-btn btn-primary" type="submit">Track</button>
                    </form>
                  </div>
                )}

                {activeTab === "address" && (
                  <div className="shipping-address-billing-address-account">
                    <div className="half">
                      <h2 className="title">Billing Address</h2>
                      <p className="address">
                        3522 Interstate<br />
                        75 Business Spur,<br />
                        Sault Ste.<br />
                        Marie, MI 49783<br />
                        New York
                      </p>
                      <a href="#">Edit</a>
                    </div>
                    <div className="half">
                      <h2 className="title">Shipping Address</h2>
                      <p className="address">
                        3522 Interstate<br />
                        75 Business Spur,<br />
                        Sault Ste.<br />
                        Marie, MI 49783<br />
                        New York
                      </p>
                      <a href="#">Edit</a>
                    </div>
                  </div>
                )}

                {activeTab === "account" && (
                  <form className="account-details-area">
                    <h2 className="title">Account Details</h2>
                    <div className="input-half-area">
                      <div className="single-input">
                        <input type="text" placeholder="First Name" />
                      </div>
                      <div className="single-input">
                        <input type="text" placeholder="Last Name" />
                      </div>
                    </div>
                    <input type="text" placeholder="Display Name" required />
                    <input type="email" placeholder="Email Address *" required />
                    <input type="password" placeholder="Current Password *" required />
                    <input type="password" placeholder="New Password *" />
                    <input type="password" placeholder="Confirm Password *" />
                    <button className="rts-btn btn-primary">Save Change</button>
                  </form>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterOne />
    </div>
  );
}
