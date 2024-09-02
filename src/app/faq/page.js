import React from 'react';
import "./page.css";

export default function faq() {
  

  return (
    <div className='flex flex-col mt-20'>

    <div style={{ marginTop: 24,maxWidth:800 }} className="container text-center">
        <h1 style={{fontWeight: 'bold', marginTop: 100}} className="">We are here to Answer all you Questions</h1>
        <h6 style={{marginTop:40,color:'grey'}} className="">This section would help you learn more about the platform</h6>
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
        
      </div>
      <div className="got-questions">Got any more questions ?</div>
      <div>
  <button type="button" className="btn btn-outline-info" style={{  }}><a href="/contact" style={ {color:' #250729',textDecoration: 'none' }}>Get In Touch</a></button>
</div>
    </div>
    </div>

  );
}
