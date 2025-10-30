const Button = ({
  className,
  text,
  onClick,
  disabled,
}: {
  className?: string;
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: () => boolean | undefined;
}) => {
  return (
    <button
      className={`  cursor-pointer font-medium ${
        className ? className : "px-5 py-3 rounded-lg  text-[14px] bg-button "
      }  `}
      onClick={onClick}
      disabled={disabled?.()}
    >
      {text}
    </button>
  );
};

export default Button;
