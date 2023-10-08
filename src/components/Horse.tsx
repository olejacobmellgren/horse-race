

interface HorseProps{
  imgPath: string;
  selftop: number;
}

const Horse: React.FC<HorseProps> = ({ imgPath, selftop }) => {
  const style = {
    // top: selftop,
    // position: absolute,
    // top: 10vh,
    // width: 10vw,
    // height: 10vw,
  }
  // funciton moveHorse() {
  //   position += 10;
  // }
  return (
    <img className="Horse" src={imgPath}/>
  )
}

export default Horse;
