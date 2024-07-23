interface Props {
  styles?: string;
  text: string;
  onClick?: VoidFunction;
}

export const Button = ({ styles, text, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`py-2 px-5 bg-blue-gradient font-poppins
  font-medium text-[14px] text-primary outline-none ${styles} rounded-[10px]`}
    >
      {text}
    </button>
  );
};
