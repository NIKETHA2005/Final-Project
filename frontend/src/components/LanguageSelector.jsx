import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LanguageSelector.module.css';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    console.log(`Language changed to: ${lng}`); // Debugging log
  };

  return (
    <div className={styles.container}>
      <button onClick={() => changeLanguage('en')} className={styles.button}>
        English
      </button>
      <button onClick={() => changeLanguage('ta')} className={styles.button}>
        Tamil
      </button>
      <button onClick={() => changeLanguage('hi')} className={styles.button}>
        Hindi
      </button>
    </div>
  );
};

export default LanguageSelector;
