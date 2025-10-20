"use client";

import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@monorepo/utils";
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = cva(
  "text-red-500 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        contained: "text-white",
        outlined: "bg-white border hover:text-white",
        transparent: "bg-transparent",
        ghost: "hover:bg-accent hover:bg-black dark:hover:bg-gray-900",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link: "text-black dark:text-white underline-offset-4 hover:underline",
      },
      color: {
        primary: "",
        secondary: "",
        success: "",
        warning: "",
        danger: "",
        info: "",
        light: "",
        dark: "",
      },
      size: {
        small: "h-8 px-2 py-1.5 text-xs",
        medium: "h-10 px-6 py-2.5 text-sm",
        large: "h-12 px-6 py-3.5 text-base",
        xLarge: "h-14 px-8 py-4 text-lg",
        icon: "h-10 w-10",
      },
      shape: {
        regular: "rounded",
        rounded: "rounded-lg",
        circle: "rounded-full",
        square: "rounded-none",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
      bold: {
        true: "font-bold",
        false: "font-medium",
      },
    },
    compoundVariants: [
      // Contained variants
      {
        variant: "contained",
        color: "primary",
        className:
          "bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600",
      },
      {
        variant: "contained",
        color: "secondary",
        className: "bg-green-600 hover:bg-green-700",
      },
      {
        variant: "contained",
        color: "success",
        className: "bg-emerald-500 hover:bg-emerald-600",
      },
      {
        variant: "contained",
        color: "warning",
        className: "bg-orange-500 hover:bg-orange-600",
      },
      {
        variant: "contained",
        color: "danger",
        className: "bg-red-500 hover:bg-red-600",
      },
      {
        variant: "contained",
        color: "info",
        className: "bg-blue-500 hover:bg-blue-600",
      },
      {
        variant: "contained",
        color: "light",
        className: "bg-gray-100 hover:bg-gray-200 text-gray-900",
      },
      {
        variant: "contained",
        color: "dark",
        className: "bg-gray-900 hover:bg-gray-800 text-gray-100",
      },
      // Outlined variants
      {
        variant: "outlined",
        color: "primary",
        className: "text-blue-500 border-blue-500 hover:bg-blue-500",
      },
      {
        variant: "outlined",
        color: "secondary",
        className: "text-green-600 border-green-600 hover:bg-green-600",
      },
      {
        variant: "outlined",
        color: "success",
        className: "text-emerald-500 border-emerald-500 hover:bg-emerald-500",
      },
      {
        variant: "outlined",
        color: "warning",
        className: "text-orange-500 border-orange-500 hover:bg-orange-500",
      },
      {
        variant: "outlined",
        color: "danger",
        className: "text-red-500 border-red-500 hover:bg-red-500",
      },
      {
        variant: "outlined",
        color: "info",
        className: "text-blue-500 border-blue-500 hover:bg-blue-500",
      },
      {
        variant: "outlined",
        color: "light",
        className:
          "text-gray-900 border-gray-100 hover:bg-gray-100 hover:text-gray-900",
      },
      {
        variant: "outlined",
        color: "dark",
        className: "text-gray-900 border-gray-900 hover:bg-gray-900",
      },
      // Transparent variants
      {
        variant: "transparent",
        color: "primary",
        className: "text-blue-500 hover:bg-blue-100",
      },
      {
        variant: "transparent",
        color: "secondary",
        className: "text-green-500 hover:bg-green-100",
      },
      {
        variant: "transparent",
        color: "success",
        className: "text-emerald-500 hover:bg-emerald-100",
      },
      {
        variant: "transparent",
        color: "warning",
        className: "text-orange-500 hover:bg-orange-100",
      },
      {
        variant: "transparent",
        color: "danger",
        className: "text-red-500 hover:bg-red-100",
      },
      {
        variant: "transparent",
        color: "info",
        className: "text-blue-500 hover:bg-blue-100",
      },
      {
        variant: "transparent",
        color: "light",
        className: "text-gray-500 hover:bg-gray-100",
      },
      {
        variant: "transparent",
        color: "dark",
        className: "text-gray-900 hover:bg-gray-100",
      },
      // Ghost variants
      {
        variant: "ghost",
        color: "primary",
        className: "text-blue-500 hover:bg-blue-50",
      },
      {
        variant: "ghost",
        color: "secondary",
        className: "text-green-500 hover:bg-green-50",
      },
      {
        variant: "ghost",
        color: "success",
        className: "text-emerald-500 hover:bg-emerald-50",
      },
      {
        variant: "ghost",
        color: "warning",
        className: "text-orange-500 hover:bg-orange-50",
      },
      {
        variant: "ghost",
        color: "danger",
        className: "text-red-500 hover:bg-red-50",
      },
      {
        variant: "ghost",
        color: "info",
        className: "text-blue-500 hover:bg-blue-50",
      },
      {
        variant: "ghost",
        color: "light",
        className: "text-gray-500 hover:bg-gray-50",
      },
      {
        variant: "ghost",
        color: "dark",
        className: "text-gray-900 hover:bg-gray-50",
      },
    ],
    defaultVariants: {
      variant: "contained",
      color: "primary",
      size: "medium",
      shape: "regular",
      fullWidth: false,
      bold: false,
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  testId?: string;
  href?: string;
  target?: string;
  isLoading?: boolean;
  loadingText?: string;
  frontColor?: string;
  hoverColor?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      color,
      size,
      shape,
      fullWidth,
      bold,
      testId,
      href,
      target,
      isLoading = false,
      loadingText = "Loading...",
      frontColor,
      hoverColor,
      asChild = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const content = isLoading ? loadingText : children;
    const isDisabled = disabled || isLoading;
    const buttonClasses = cn(
      buttonVariants({
        variant: variant as
          | "contained"
          | "outlined"
          | "transparent"
          | "ghost"
          | undefined,
        color: color as
          | "primary"
          | "secondary"
          | "success"
          | "warning"
          | "danger"
          | "info"
          | "light"
          | "dark"
          | undefined,
        size,
        shape,
        fullWidth,
        bold,
        className,
      })
    );

    const style: React.CSSProperties = {};
    if (frontColor) style.color = frontColor;
    if (hoverColor) style.backgroundColor = hoverColor;

    if (href && !isDisabled) {
      return (
        <a
          href={href}
          target={target}
          className={cn(buttonClasses, "hover:no-underline")}
          style={style}
          aria-disabled={isDisabled}
          data-testid={testId}
          data-attributes={cn(variant, color, size, shape, fullWidth, bold)}
        >
          {content}
        </a>
      );
    }

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={buttonClasses}
        style={style}
        ref={ref}
        disabled={isDisabled}
        data-testid={testId}
        data-attributes={cn(variant, color)}
        {...props}
      >
        {content}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
