export const IconContainer = (props: {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  className?:string
}) => {
  return (
    <div className={`rounded-lg border  p-4 w-fit  shadow-custom ${props.className}`}>
      <props.icon />
    </div>
  );
};

export default IconContainer;
