import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import one from '../../assets/carousel/festival1.jpg';
import two from '../../assets/carousel/festival2.jpg';
import three from '../../assets/carousel/festival3.jpg';

const images = [one, two, three];

const CarouselComponent = () => {
  return (
    <Carousel
      showIndicators={false}
      infiniteLoop={true}
      autoPlay={true}
      showThumbs={false}
      showStatus={false}
      showArrows={false}
      centerMode={true}
      centerSlidePercentage={100}
    >
      {images.map((img, idx) => (
        <img className='object-cover h-48 over' key={idx} src={img} />
      ))}
    </Carousel>
  );
  //<div className='flex items-center justify-center h-48 bg-zinc-300'>사진과 우측 하단 버튼</div>;
};
export default CarouselComponent;
