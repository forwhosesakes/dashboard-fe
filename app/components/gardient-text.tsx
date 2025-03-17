
interface IProps {

    text:string,
    gradientStart? :string, 
    gradientEnd ?:string,
    className ?:string,
    direction ?:string
}
const GradientText = ({ 
    text,
    gradientStart = "#EF7BE3", 
    gradientEnd = "#FF5A5A",
    className = "",
    direction = "to right"
  }:IProps) => {
    return (
      <span
        className={`font-bold bg-clip-text text-transparent ${className}`}
        style={{
          backgroundImage: `linear-gradient(${direction}, ${gradientStart}, ${gradientEnd})`
        }}
      >
        {text}
      </span>
    );
  };


  export default GradientText