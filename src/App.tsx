import React, { useState, FC } from 'react';
import './App.css';

interface INasaResponse {
  readonly date: string;
  readonly explanation: string;
  readonly hdurl: string;
  readonly media_type: string;
  readonly service_version: string;
  readonly title: string;
  readonly url: string;
}

enum CameraNames {
  FHAZ = 'FHAZ',
  RHAZ = 'RHAZ',
  MAST = 'MAST',
  CHEMCAM = 'CHEMCAM',
  MAHLI = 'MAHLI',
  MARDI = 'MARDI',
  NAVCAM = 'NAVCAM',
  PANCAM = ' PANCAM',
  MINITES = 'MINITES',
}

interface ICamera {
  readonly id: number;
  readonly name: CameraNames;
  readonly rover_id: number;
  readonly full_name: string;
}

interface IRover {
  readonly id: number;
  readonly name: string;
  readonly landing_date: string;
  readonly launch_date: string;
  readonly status: "active"
}
interface IPhoto {
  readonly id: number;
  readonly sol: number;
  readonly camera: ICamera;
  readonly img_src: string;
  readonly earth_date: string;
  readonly rover: IRover;
}

type IState = ReadonlyArray<IPhoto>;

const App: FC = () => {
  const [photos, setData] = useState<IState>([]);

  const handleImage = () => {
    fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=100&page=1&api_key=DBorSIWRAyeARTgagXL1X1ljJ2yfMwqLhwPWp0PK')
      .then(response => response.json().then(data => setData(data.photos.slice(0, 10))))
  }

  return (
    <div>
      <button onClick={handleImage}>
        Get image
      </button>
      <ul>
        {photos.map(elem => (
          <li key={elem.id}>
            <img src={elem.img_src} width={100} height={100} />
          </li>)
        )}
      </ul>

    </div>
  );
}

export default App;
