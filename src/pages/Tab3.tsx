import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab3.css";
import { useEffect, useState } from "react";

interface IProduct {
  ID: string;
  product_name: string;
  price_key: string;
  price_value: string;
  description_key: string;
  description_value: string;
  category_key: string;
  category_value: string;
  project_id_key: string;
  project_id_value: string;
}
interface Product {
  id: string;
  category: string;
  productId: string;
  description: string;
  name: string;
  price: string;
}

const Tab3: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch(
      `https://dev-cs-test-50-13.pantheonsite.io/wp-json/twentytwentyone-child/v1/products`
    )
      .then(res => res.json())
      .then(data => {
        const decoderProducts: Product[] = data.map((product: IProduct) => {
          return {
            id: product.ID,
            category: product["category_value"],
            productId: product["project_id_value"],
            description: product["description_value"],
            name: product["product_name"],
            price: product["price_value"],
          };
        });

        setProducts(decoderProducts);
      });
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            {products.map(({ id, name, category, price, description }) => (
              <IonCol
                size="4"
                key={id}
              >
                <IonCard color="light">
                  <IonCardHeader>
                    <IonCardTitle>{name}</IonCardTitle>
                    <IonCardSubtitle>category: {category}</IonCardSubtitle>
                  </IonCardHeader>

                  <IonCardContent>{description}</IonCardContent>
                  <IonCardContent>{price}</IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        {/* <ExploreContainer name="Tab 3 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
