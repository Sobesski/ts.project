import { Link } from "react-router-dom";
interface Link1Props {
  to: string;
  text: string;
}
const Link1: React.FC<Link1Props> = (props) => {
  return (
    <Link to={props.to} className="link1">
      {props.text || <img src="src/common/UI/link" />}
    </Link>
  );
};

export default Link1;
