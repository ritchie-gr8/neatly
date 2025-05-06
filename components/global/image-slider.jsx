import useEmblaCarousel from 'embla-carousel-react'

export default function ImageSlider({ images }) {
  const [emblaRef] = useEmblaCarousel({ loop: true })

  return (
    <div className="overflow-hidden px-10" ref={emblaRef}>
      <div className="flex justify-center">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`
              ${idx === 0 || idx === 4 ? 'flex-[0_0_40%]' : 'flex-[0_0_20%]'} 
              px-4`} // สัดส่วน 40% สำหรับภาพขอบๆ
          >
            <img
              src={img}
              alt={`slide-${idx}`}
              className="w-full h-auto object-cover rounded-xl shadow-md"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
