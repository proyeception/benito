import React, { useState } from "react";
import { hot } from "react-hot-loader";
import "./styles.scss";
import { Category } from "../../types";
import Carousel from "react-bootstrap/Carousel";
import CategorySearch from "./CategorySearch";

const categories: Array<Category> = [
  {
    name: "Sistemas",
    imageUrl: "https://www.frro.utn.edu.ar/imagenes/slider/sistemas_1.jpg",
    tagName: "sistemas",
  },
  {
    name: "Medicina",
    imageUrl:
      "https://imagenes.universia.net/gc/net/images/educacion/f/fa/fac/facultades-de_medicina_argentina.jpg",
    tagName: "medicina",
  },
  {
    name: "Educación",
    imageUrl:
      "https://www.vidanuevadigital.com/wp-content/uploads/2020/06/educacioncato%CC%81lica.jpg",
    tagName: "educacion",
  },
  {
    name: "Química",
    imageUrl:
      "https://es.unesco.org/sites/default/files/styles/img_688x358/public/courier/photos/gettyimages-874157664.jpg?itok=UcRccWOp",
    tagName: "quimica",
  },
  {
    name: "Música",
    imageUrl:
      "https://www.oscyl.com/assets/foto-oficial-web-oscyl-2019-2020-630x323.jpg",
    tagName: "musica",
  },
];

type Props = {};

const CategoriesSearchCarousel = (_: Props) => {
  console.log(categories);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number, _: any) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="container mt-3">
      <div className="text-center pt-3 pb-3 text-uppercase font-weight-bold qui-remarkable-title">
        Tendencias
      </div>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {categories.map((category, idx) => {
          return (
            <Carousel.Item key={idx}>
              <CategorySearch category={category} />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

export default hot(module)(CategoriesSearchCarousel);
