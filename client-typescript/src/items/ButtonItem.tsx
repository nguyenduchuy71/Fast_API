interface IButton {
  typeButton: any;
  classNameValue: string;
  nameButton: string;
}

export const ButtonItem = ({
  typeButton,
  classNameValue,
  nameButton,
}: IButton) => {
  return (
    <button type={typeButton} className={classNameValue}>
      {nameButton}
    </button>
  );
};
