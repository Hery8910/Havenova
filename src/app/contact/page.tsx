import styles from './page.module.css';
import Hero from '../../components/hero/page';
import WhoWeAre from '../../components/whoWeAre/page';

const Contact = () => {
  const contactHero = {
    title: "Contact Havenova – Professional Home Services in Berlin",
    description:
      "We are ready to assist you with any questions or service inquiries. Reach out to us digitally for quick responses and personalized support.",
    image: {
      src: "/svg/hero_home.svg",
      alt: "Havenova digital customer support team assisting clients in Berlin",
    },
    cta: "",
    href: "",
  };
  const weAre = {
    title: "Why Contact Havenova?",
    description:
      "At Havenova, we believe in providing high-quality and reliable home services. Founded in 2023, our mission is to simplify home maintenance with expert solutions tailored to our clients' needs.",
    list: [
      {
        title: "",
        description: "Certified and skilled team.",
      },
      {
        title: "",
        description: "Tailored to your specific needs.",
      },
      {
        title: "",
        description: "Service with attention to detail.",
      },
      {
        title: "",
        description: "We ensure top-quality results.",
      },
    ],
  };
  return (
    <>
    <Hero hero={contactHero}/>
    <WhoWeAre weAre={weAre} />
    </>
  );
};

export default Contact;