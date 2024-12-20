import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Tab1.css";
import { useState, useEffect } from "react";

interface IClient {
  ID: string;
  post_title: string;
  client_name_key: string;
  client_name_value: string;
  client_photo_key: string;
  client_photo_value: string;
  client_photo_url: string;
  client_email_key: string;
  client_email_value: string;
}

interface Client {
  id: string;
  name: string;
  email: string;
  title: string;
  imageUrl: string;
}

const Tab1: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    fetch(
      `https://dev-cs-test-50-13.pantheonsite.io/wp-json/twentytwentyone-child/v1/clients`
    )
      .then(res => res.json())
      .then(data => {
        const gotClients: Client[] = data.map((item: IClient) => {
          return {
            id: item.ID,
            name: item["client_name_value"],
            imageUrl: item["client_photo_url"],
            email: item["client_email_value"],
            title: item["post_title"],
          };
        });
        setClients(gotClients);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 1</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Reviews from our clients</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            {clients.map(({ id, name, imageUrl, email, title }) => (
              <IonCol
                size="4"
                key={id}
              >
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>{name}</IonCardTitle>
                    <IonCardSubtitle>{email}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonImg src={imageUrl} />
                  <IonCardContent>{title}</IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        {/* <ExploreContainer name="Tab 1 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
