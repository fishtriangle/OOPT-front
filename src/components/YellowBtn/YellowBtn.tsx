import styles from './YellowBtn.module.scss';

interface YellowBtnProps {
  text: string;
  onClick: () => void;
  style?: {
    minWidth: string;
  };
}

const YellowBtn: React.FC<YellowBtnProps> = ({ text, onClick, style }) => {
  return (
    <div className={styles.yellowBtn}>
      <span onClick={() => onClick()} style={style}>
        {text}
      </span>
    </div>
  );
};

export default YellowBtn;
