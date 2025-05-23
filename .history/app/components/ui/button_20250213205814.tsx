interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    variant?: string;
    size?: string;
  }
  
  export const Button: React.FC<ButtonProps> = ({ onClick, children, variant, size }) => {
    // Component logic
    return <button onClick={onClick}>{children}</button>;
  };