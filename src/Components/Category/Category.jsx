import React from "react";
import classes from "./Category.module.css";
import { categoryInfo } from "./CategoryFullInfo";
import CategoryCard from "./CategoryCard";
function Category() {
  return (
    <section className={classes.category_container}>
      {categoryInfo.map((info, i) => {
        return <CategoryCard key={i} data={info} />;
      })}
    </section>
  );
}
export default Category;
