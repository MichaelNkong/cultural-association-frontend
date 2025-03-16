interface ButtonProps {
    onClick: () => void;
    children: React.ReactNode;
    size?: string;
  }
  
  export const Button: React.FC<ButtonProps> = ({ onClick, children, size }) => {
    // Component logic
    return <button onClick={onClick}>{children}</button>;
  };