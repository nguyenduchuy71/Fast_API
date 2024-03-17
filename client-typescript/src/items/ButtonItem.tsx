interface IButton {
  typeButton: any;
  classNameValue: string;
  nameButton: string;
  action?: any;
  isDisabled?: boolean;
}

export const ButtonItem = ({
  typeButton,
  classNameValue,
  nameButton,
  action = null,
  isDisabled = false,
}: IButton) => {
  return (
    <button
      onClick={action}
      disabled={isDisabled}
      type={typeButton}
      className={classNameValue}
    >
      {nameButton}
    </button>
  );
};
