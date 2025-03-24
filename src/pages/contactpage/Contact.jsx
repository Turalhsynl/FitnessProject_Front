import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <section className=" text-white">
      <div className="relative bg-cover bg-center bg-no-repeat h-[610px] bg-[url('https://max-themes.net/demos/gym/gym/gym/upload/image-from-rawpixel-id-2107452-jpeg.jpg')] bg-black/60 bg-blend-overlay flex flex-col justify-center items-center">
        <h2 className="text-6xl font-bold mb-4">Contact Us</h2>
        <p className="text-2xl mb-10">Get Intouch</p>
      </div>

      <div className="container mx-auto text-center mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-center">
            <div className="bg-white text-black p-4 rounded-full mb-4">
              <FaPhone size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Phone</h3>
            <div className="w-8 h-0.5 bg-white mb-4"></div>
            <p className="mb-4 max-w-[300px]">A wonderful serenity has taken possession of my entire soul, like these.</p>
            <a href="tel:+1-2345-2345" className="font-bold underline mt-4">+1-2345-2345</a>
          </div>

            <div className="flex flex-col items-center">
            <div className="bg-white text-black p-4 rounded-full mb-4">
              <FaEnvelope size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email</h3>
            <div className="w-8 h-0.5 bg-white mb-4"></div>
            <p className="mb-4 max-w-[300px]">A wonderful serenity has taken possession of my entire soul, like these.</p>
            <a href="mailto:email@example.com" className="font-bold underline mt-4">[email protected]</a>
          </div>

          <div className="flex flex-col items-center">
            <div className="bg-white text-black p-4 rounded-full mb-4">
              <FaMapMarkerAlt size={32} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Location</h3>
            <div className="w-8 h-0.5 bg-white mb-4"></div>
            <p className="mb-4 max-w-[250px]">4 apt. Flawing Street. The Grand Avenue, Liverpool, UK 33342</p>
            <a href="https://www.google.com/maps" target="_blank" className="font-bold mt-4 underline">View On Google Map</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
