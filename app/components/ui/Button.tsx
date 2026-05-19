import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

type ButtonProps =
  | ({
      as?: "button";
      variant?: ButtonVariant;
      size?: ButtonSize;
      className?: string;
    } & ButtonHTMLAttributes<HTMLButtonElement>)
  | ({
      as: "a";
      variant?: ButtonVariant;
      size?: ButtonSize;
      className?: string;
    } & AnchorHTMLAttributes<HTMLAnchorElement>);

const variantClasses: Record<ButtonVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-ghost",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "btn-md",
  lg: "btn-lg",
};

export default function Button(props: ButtonProps) {
  const {
    as = "button",
    variant = "primary",
    size = "md",
    className = "",
    ...rest
  } = props as ButtonProps;

  const classes = `btn ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim();

  if (as === "a") {
    const anchorProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return <a {...anchorProps} className={classes} />;
  }

  const buttonProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonProps.type ?? "button"} {...buttonProps} className={classes} />
  );
}
