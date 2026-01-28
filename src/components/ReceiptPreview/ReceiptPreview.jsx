import React from 'react';
import './ReceiptPreview.css';

const ReceiptPreview = ({ data, screenSize, containerRef }) => {
  const { name, amount, platform, date, note } = data;

  const getScreenClass = () => {
    switch(screenSize) {
      case 'sm': return 'screen-sm';
      case 'md': return 'screen-md';
      case 'lg': return 'screen-lg';
      case 'xl': return 'screen-xl';
      default: return 'screen-lg';
    }
  };

  return (
    <div className={`receipt-container ${getScreenClass()}`} ref={containerRef} id="receipt-capture">
      <div className="receipt-inner">
        {/* Header Greeting */}
        <div className="header-welcome">
          Hello, {name}
        </div>

        {/* PayPal Logo */}
        <div className="paypal-logo-section">
          <img 
            src="https://www.paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/paypal-rebranding/pp-logo-in-circle-2x.png" 
            alt="PayPal" 
            width="63" 
            height="63" 
          />
        </div>

        {/* Main Title */}
        <h1 className="main-title">
          {platform} sent you ${parseFloat(amount).toLocaleString('en-US')} USD
        </h1>

        {/* Note Section */}
        <div className="note-section">
          <p className="note-title">Note from {platform}</p>
        </div>

        {/* Quote Section - Table for Email Stability */}
        <div style={{ padding: '0 35px 25px 35px' }}>
          <table width="100%" cellPadding="0" cellSpacing="0" border="0" role="presentation">
            <tbody>
              <tr>
                <td width="30" valign="top" style={{ paddingTop: '0' }}>
                  <span className="quote-mark">“</span>
                </td>
                <td valign="top" align="center">
                  <div className="quote-text">
                    {note || 'Your funds have been successfully delivered. Enjoy!'}
                  </div>
                </td>
                <td width="30" valign="top" align="right" style={{ paddingTop: '0' }}>
                  <span className="quote-mark">”</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Transaction Details Card */}
        <div className="details-card">
          <h2 className="details-title">Transaction Details</h2>
          
          <div className="detail-row">
            <div className="detail-label">Transaction date</div>
            <div className="detail-value">{date}</div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Payment received</div>
            <div className="detail-value">${amount} USD</div>
          </div>
        </div>

        {/* Info Text */}
        <div className="info-text">
          <p style={{marginBottom: '15px'}}>
            Before we can deposit the money into your account, we need a bit more information about your account or recent transactions. To provide that, just log in to your account, and go to your account overview. Select the <strong>More</strong> menu, then choose the link that takes you to our Resolution Center.
          </p>
          <p>
            Please provide the missing information by {new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}, or the money will be returned to the sender.
          </p>
        </div>

        {/* Login Button */}
        <div className="login-btn-container">
          <a href="#" className="login-btn">Log In</a>
        </div>

        {/* Help Section */}
        <div className="help-section">
          <h2 className="help-title">Having trouble resolving this?</h2>
          <div className="info-text">
            Just click <strong>Contact</strong> at the bottom of any PayPal web page to reach PayPal Customer Service.
          </div>
        </div>

        {/* Footer */}
        <div className="footer-logo">
          <img 
            src="https://www.paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/paypal-rebranding/footer-logo-with-crop-2x.png" 
            alt="PayPal" 
            width="120" 
          />
          <hr style={{border: 'none', borderTop: '1px solid #c6c6c6', margin: '20px 0'}} />
        </div>

        <div className="footer-links">
          <a href="#">Help & Contact</a> | <a href="#">Security</a> | <a href="#">Apps</a>
        </div>

        {/* Social Icons (Simplified for demo) */}
        <div className="social-icons">
          <a href="#"><img src="https://www.paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/quantum_leap/footer-social-icons_x.png" width="28" height="28" alt="Twitter" /></a>
          <a href="#"><img src="https://www.paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/paypal-rebranding/footer-social-icons_instagram-2x.png" width="28" height="28" alt="Instagram" /></a>
          <a href="#"><img src="https://www.paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/paypal-rebranding/footer-social-icons_facebook-2x.png" width="28" height="28" alt="Facebook" /></a>
          <a href="#"><img src="https://www.paypalobjects.com/digitalassets/c/system-triggered-email/n/layout/images/paypal-rebranding/footer-social-icons_linkedin-2x.png" width="28" height="28" alt="LinkedIn" /></a>
        </div>

        {/* Legal Footer */}
        <div className="legal-text">
          <p>PayPal is committed to preventing fraudulent emails. Emails from PayPal will always contain your full name. <a href="#" style={{color: '#0070e0'}}>Learn to identify phishing</a></p>
          <p>Please don't reply to this email. To get in touch with us, click <a href="#" style={{color: '#0070e0'}}>Help & Contact</a>.</p>
          <p>Not sure why you received this email? <a href="#" style={{color: '#0070e0'}}>Learn more</a></p>
          <div style={{marginTop: '20px'}}>
            Copyright © 1999-{new Date().getFullYear()} PayPal. All rights reserved.<br/><br/>
            PayPal Pte. Ltd. is licensed by the Monetary Authority of Singapore as a Major Payment Institution under the Payment Services Act 2019.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPreview;
