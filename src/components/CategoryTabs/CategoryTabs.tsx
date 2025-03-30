import { motion } from 'framer-motion';
import styles from './CategoryTabs.module.scss';

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ categories, activeCategory, onChange }) => {
  return (
    <div className={styles.categoryTabs}>
      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tab} ${activeCategory === 'All' ? styles.active : ''}`}
          onClick={() => onChange('All')}
        >
          All
          {activeCategory === 'All' && (
            <motion.div 
              className={styles.activeIndicator} 
              layoutId="activeIndicator"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.tab} ${activeCategory === category ? styles.active : ''}`}
            onClick={() => onChange(category)}
          >
            {category}
            {activeCategory === category && (
              <motion.div 
                className={styles.activeIndicator} 
                layoutId="activeIndicator"
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs; 