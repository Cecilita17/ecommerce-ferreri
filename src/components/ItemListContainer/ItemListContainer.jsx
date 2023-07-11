import React, { useEffect, useState } from "react";
import "./ItemListContainer.css";
import { useParams } from "react-router-dom";
import ItemList from "../ItemList/ItemList";
import { db } from "../../service/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import perros from "../../assets/department-perros.webp";
import RadioFilter from "../Filters/RadioFilter";

const ItemListContainer = (props) => {
  const options = ['Royal Canin', 'Top Nutrition', 'Performance', 'Excellence'];
  const optionsW = ['10kg', '15kg', '18kg', '20kg'];
  const [products, setProducts] = useState([]);
  const [filteredBrand, setFilteredBrand] = useState('');
  const [filteredWeight, setFilteredWeight] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [resetFilters, setResetFilters] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    const collectionRef =
      categoryId ?
        query(collection(db, "products"), where("category", "==", categoryId)) :
        collection(db, "products");

    getDocs(collectionRef).then((res) => {
      const productsAdapted = res.docs.map((doc) => {
        const data = doc.data();
        return { id: doc.id, ...data };
      });

      setProducts(productsAdapted);
    });
  }, [categoryId]);

  useEffect(() => {
    const filtered = products.filter((prod) => {
      const brandMatch = filteredBrand ? prod.brand === filteredBrand : true;
      const weightMatch = filteredWeight ? prod.kg === filteredWeight : true;
      return brandMatch && weightMatch;
    });

    setFilteredProducts(filtered);
  }, [filteredBrand, filteredWeight, products]);

  const handleBrandChange = (selectedBrand) => {
    setFilteredBrand(selectedBrand);
    setResetFilters(false);
  };

  const handleWeightChange = (selectedWeight) => {
    setFilteredWeight(selectedWeight);
    setResetFilters(false);
  };

  const handleResetFilters = () => {
    setFilteredBrand('');
    setFilteredWeight('');
    setResetFilters(true);
  };

  return (
    <div className="divILContainer">
      <img className="image" src={perros} alt="" />
      <p>Alimento balanceado para perros:</p>
      <div className="content">
        <div className="filters">
          <div>
            <p>Brand</p>
            <RadioFilter options={options} onChange={handleBrandChange} resetFilters={resetFilters} />
          </div>
          <div>
            <p>Weight</p>
            <RadioFilter options={optionsW} onChange={handleWeightChange} resetFilters={resetFilters} />
          </div>
          <div>
            <button className="resetFl" onClick={handleResetFilters}>Reset Filters</button>
          </div>
        </div>
        {filteredProducts.length > 0 ? (
          <ItemList products={filteredProducts} />
        ) : (
          <ItemList products={products} />
        )}
      </div>
    </div>
  );
};

export default ItemListContainer;
