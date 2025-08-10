'use client';
import styles from './page.module.css';
import ServiceCart from '../../../components/services/serviceCart/page';
import FurnitureAssemblyForm from '../../../components/services/furnitureAssembly/furnitureAssemblyForm/page';
import Reviews from '../../../components/reviews/page';

const FurnitureAssemblyPage = () => {
  return (
    <main className={styles.main}>
    
      <section className={styles.section}>
        <FurnitureAssemblyForm />
      </section>
      {/* <ServiceCart /> */}
      <Reviews />
    </main>
  );
};

export default FurnitureAssemblyPage;
