import React from "react";

const Bio = () => {
  const bio = [
    {
      image: "/images/1lambo.webp",
      title: "Lamborghini 350 GT",
      content:
        "After the debut of the 350 GTV concept, Lamborghini launched its first production car, the 350 GT, at the 1964 Geneva Motor Show. It featured a long bonnet, compact cabin, and a V12 engine with a double overhead camshaft—a first in production cars. The interior had luxury leather upholstery and wool carpeting, with a 2+1 seating layout. A total of 150 units were built, plus two Spider versions by Carrozzeria Touring with Zagato Kamm tails. The body, designed with Touring’s Superleggera construction, used lightweight aluminum panels, giving elegance, strength, and weight savings. The design followed Ferruccio Lamborghini’s vision of a clean, uncluttered silhouette, originally shaped by Franco Scaglione.",
    },
    {
      image: "/images/1ferrari.avif",
      title: "Ferrari 125 S",
      content:
        "This was the very first car to wear the Ferrari badge. The V12 engine was designed by Gioacchino Colombo with contributions from Giuseppe Busso and Luigi Bazzi. Sport and competition versions of the 125 S were built with different bodywork although the chassis and running gear of the cars remained basically identical. The 125 S’s debut on the Piacenza circuit was, in the words of Enzo Ferrari himself, “a promising failure.” In fact, Franco Cortese had to pull out because of a problem with the fuel pump while leading the race. However, over the following four months, the 125 S was back on the track 13 times, winning six of its races.",
    },
    {
      image: "/images/1rolls.png",
      title: "Rolls Royce 10hp",
      content:
        "The Rolls-Royce 10 hp, introduced in 1904, was the very first car produced by Rolls-Royce Limited and marked the beginning of the brand’s legendary journey in the automotive world. Designed by Henry Royce and first displayed at the Paris Salon, the car was powered by a 1.8-liter two-cylinder engine that delivered around 10 horsepower, giving it a top speed of about 39 mph (63 km/h). Although modest by today’s standards, it was considered advanced for its time. Only 16 examples of the 10 hp were built between 1904 and 1906, making it one of the rarest Rolls-Royce models. With its elegant open-top two-seater body, handcrafted wooden frames, and brass fittings, the 10 hp combined engineering precision with luxury craftsmanship, setting the foundation for the Rolls-Royce reputation as the “best car in the world.”",
    },
  ];

  return (
    <section className="p-6 mt-20">
      <h1 className="text-center text-6xl md:text-8xl mb-20 font-extrabold border-b-4 border-gray-400 ">
        Ever Cars
      </h1>
      {bio.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col md:flex-row px-[5vw] md:px-[12vw] mb-16 items-center gap-10 ${
            index % 2 !== 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Image */}
          <img
            src={item.image}
            alt={item.title}
            className="w-[320px] h-[360px] md:w-[420px] md:h-[470px] object-cover rounded-xl shadow-lg bg-black hover:scale-105 hover:shadow-2xl transition-transform duration-500"
          />

          {/* Text Content */}
          <div
            className={`${
              index % 2 === 0 ? "md:ml-16 text-left" : "md:mr-16 text-right"
            }`}
          >
            <h1 className="text-black text-4xl md:text-6xl font-extrabold mb-4">
              {item.title}
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed">
              {item.content}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Bio;
