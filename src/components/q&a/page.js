import Accordion from "../accordion/page";

const QuestionAnswer = () => {
  const questions = [
    {
      name: "How can I book a service?",
      answer:
        "You can book a service directly on our website. Simply select the type of service you need, choose a date, and submit your request. A team member will contact you to confirm the details.",
    },
    {
      name: "How are service prices calculated?",
      answer:
        "Our prices vary depending on the type of work and specific requirements. We do not display fixed prices on the website because each project is unique. We will provide a personalized quote after assessing the job in person.",
    },
    {
      name: "Do I need to register to request a service?",
      answer:
        "Registration is not mandatory to submit a request, but we highly recommend it. Registered users can manage their bookings, receive special offers, and access exclusive discounts.",
    },
    {
      name: "How can I pay for the service?",
      answer:
        "We accept cash payments and online payments through our platform using secure methods such as PayPal and Stripe.",
    },
    // {
    //   name: "Do you offer a service guarantee?",
    //   answer:
    //     "Yes, all our services come with a guarantee. If you are not satisfied, we will make the necessary adjustments to ensure quality work.",
    // }, {
    //   name: "What geographic areas do you cover?",
    //   answer:
    //     "We currently offer services in Berlin and surrounding areas. If you are unsure whether we cover your location, contact us, and we will inform you.",
    // }, {
    //   name: "How can I modify or cancel my booking?",
    //   answer:
    //     "You can modify or cancel your booking up to 24 hours before the scheduled date. If you need urgent changes, please contact us as soon as possible.",
    // }, {
    //   name: "What type of materials do you use?",
    //   answer:
    //     "We work with high-quality materials and use tools from reputable brands like Bauhaus, Obi, and Ikea to ensure the best possible experience.",
    // }, {
    //   name: "Can I request a service that is not listed on the website?",
    //   answer:
    //     " Yes, if you need a special service that is not listed, you can send us a request, and we will see how we can help you.",
    // },
  ];
  return (
    <>
     <Accordion questions={questions}/>
    </>
  );
};

export default QuestionAnswer;