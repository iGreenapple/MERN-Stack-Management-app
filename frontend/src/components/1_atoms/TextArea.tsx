interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea: React.FC<TextAreaProps> = ({ className, cols, rows, form, placeholder, onChange, ...rest }) => {
  return (
    <textarea
      className={`
        ${className}
        resize-none
        px-3 py-2 w-full h-[10rem] bg-light border border-gray-500/50 rounded-xl text-sm text-black
        focus:border-gray-600
        focus:shadow-lg focus:shadow-gray-600
        transition
        duration-300
        ease-in-out
        `}
      form={form}
      placeholder={placeholder}
      onChange={onChange}
      {...rest}
    />
  );
};

export default TextArea;
