import styles from './BuyMeACoffee.module.css';

const BuyMeACoffeeWidget = () => {
  const path =
    'https://www.buymeacoffee.com/widget/page/CodingUkraine?description=Support%20me%20on%20Buy%20me%20a%20coffee!&color=%235#FF813F';

  return <iframe className={styles.bmc} src={path} />;
};
export default BuyMeACoffeeWidget;
