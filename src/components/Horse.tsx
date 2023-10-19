import { CSSProperties } from "react";
interface HorseProps{
  imgPath: string;
  style: CSSProperties;
  id: string;
}

const Horse: React.FC<HorseProps> = ({ imgPath, style, id }) => {
  return (
    <>
      <img style={style} id={id} className="horse" src={imgPath} />
    </>
  )
}

export default Horse;

