import { TextInput, TextInputProps, View } from "react-native";

interface InputProps extends Omit<TextInputProps, "onChange"> {
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  error?: any;
  onChange?: (text: string) => void;
  errors?: any;
}

export default function Input({
  placeholder,
  value,
  onChange,
  onChangeText,
  onBlur,
  error,
  errors,
  icon,
  rightIcon,
  ...rest
}: InputProps) {
  const hasError = !!(error || (errors && errors.name));

  const handleChangeText = onChangeText || onChange;

  return (
    <View
      className={`flex-row items-center border rounded-xl px-4  bg-gray-50 ${
        hasError ? "border-red-400" : "border-gray-200"
      }`}
    >
      {icon}
      <TextInput
        className="flex-1 text-neutral font-inter text-base"
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        onBlur={onBlur}
        onChangeText={handleChangeText}
        value={value}
        {...rest}
      />
      {rightIcon}
    </View>
  );
}
