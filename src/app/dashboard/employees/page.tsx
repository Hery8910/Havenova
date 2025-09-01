'use client';
import { useState } from 'react';
import CreateWorkerForm from '../../../components/dashboard/createWorkerForm/page';
import { DashboardNav } from '../../../components/dashboardNav/page';
import styles from './page.module.css';

const Employees = () => {
  const [selected, setSelected] = useState<string>('');
  return (
    <main className={styles.main}>
      <DashboardNav
        tabs={['Trabajadores', 'Calendario', 'Reportes']}
        selected={selected}
        onSelect={(tab) => setSelected(tab)}
      />
      <h1>Employees</h1>
      <CreateWorkerForm />
    </main>
  );
};

export default Employees;
