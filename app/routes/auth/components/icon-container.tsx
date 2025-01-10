export const IconContainer = (props: {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}) => {
  return (
    <div className="rounded-lg border  p-4 w-fit  shadow-custom">
      <props.icon />
    </div>
  );
};

export default IconContainer;
