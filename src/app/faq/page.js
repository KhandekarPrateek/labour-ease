import React from 'react';
import "./page.css";

export default function faq() {
  

  return (
    <div className='flex flex-col mt-20'>
        <div style={{ marginTop: 24 }} className="container text-center">
      <h1 className="display-1">Frequently Asked Questions</h1>
      <div className="row">
        <div className="col">
          <div className="accordion accordion-flush" id="accordionFlushExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                  How can I request a laborer for my shop?
                </button>
              </h2>
              <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  To request a laborer, simply log in to our platform and navigate to the &quot;Request Labor&quot; section. Enter the details of the task, your shop&rsquo;s location, and the required time frame. Once submitted, we will match you with a suitable laborer based on your needs.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                  What types of tasks can laborers assist with?
                </button>
              </h2>
              <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  Our laborers can assist with a variety of tasks, including stocking shelves, organizing inventory, handling customer service, and more. If you have a specific task in mind, please detail it in your request so we can match you with a laborer who has the appropriate skills.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                  How are laborers vetted and selected?
                </button>
              </h2>
              <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  All laborers on our platform are thoroughly vetted through background checks and skill assessments. We ensure they meet our quality standards before they are listed on the platform. Additionally, you can view reviews and ratings from other shopkeepers to help you make an informed choice.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFour" aria-expanded="false" aria-controls="flush-collapseFour">
                  What are the payment terms for hiring a laborer?
                </button>
              </h2>
              <div id="flush-collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  Payment is handled through the platform. You will be billed based on the hours worked or the task completed, as agreed upon when hiring. Payments are processed securely, and you will receive an invoice for each transaction. You can also review and manage payment details in your account settings.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseFive" aria-expanded="false" aria-controls="flush-collapseFive">
                  Can I cancel or reschedule a labor request?
                </button>
              </h2>
              <div id="flush-collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body">
                  Yes, you can cancel or reschedule a labor request through the platform. Please note that cancellations made within 24 hours of the scheduled start time may incur a cancellation fee. For rescheduling, simply contact our support team or adjust the request details in your account.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="accordion accordion-flush" id="accordionFlushExample2">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSix" aria-expanded="false" aria-controls="flush-collapseSix">
                  How do I provide feedback on a laborer?
                </button>
              </h2>
              <div id="flush-collapseSix" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample2">
                <div className="accordion-body">
                  After the laborer&apos;s job is complete, you will receive a prompt to rate their performance and provide feedback. Your input is valuable in maintaining high standards and helps other shopkeepers make informed decisions. You can also leave feedback in the &quot;My Orders&quot; section of your account.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseSeven" aria-expanded="false" aria-controls="flush-collapseSeven">
                  What should I do if I encounter a problem with a laborer?
                </button>
              </h2>
              <div id="flush-collapseSeven" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample2">
                <div className="accordion-body">
                  If you encounter any issues with a laborer, please contact our support team immediately. We will address your concerns promptly and work to resolve any problems. You can reach support through the &quot;Help&quot; section of your account or by contacting us directly via phone or email.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseEight" aria-expanded="false" aria-controls="flush-collapseEight">
                  Are there any long-term contracts or commitments required?
                </button>
              </h2>
              <div id="flush-collapseEight" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample2">
                <div className="accordion-body">
                  No, there are no long-term contracts or commitments required. You can request labor as needed for specific tasks or time periods. Our platform is designed to offer flexibility, so you can use our services on a short-term or as-needed basis.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseNine" aria-expanded="false" aria-controls="flush-collapseNine">
                  How do I update my account information?
                </button>
              </h2>
              <div id="flush-collapseNine" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample2">
                <div className="accordion-body">
                  You can update your account information by logging into your account and navigating to the &quot;Profile&quot; or &quot;Account Settings&quot; section. Here, you can edit your personal details, payment information, and shop preferences.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTen" aria-expanded="false" aria-controls="flush-collapseTen">
                  What should I do if I forget my password?
                </button>
              </h2>
              <div id="flush-collapseTen" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample2">
                <div className="accordion-body">
                  If you forget your password, click on the &quot;Forgot Password&quot; link on the login page. Follow the instructions to reset your password via the email address associated with your account. If you encounter any issues, please contact our support team for assistance.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="got-questions">Got any more questions ?</div>
      <div>
  <button type="button" className="btn btn-outline-info" style={{ color: 'white' }}><a href="/contact" style={{ color: 'white', textDecoration: 'none' }}>Get In Touch</a></button>
</div>
    </div>
    </div>

  );
}
