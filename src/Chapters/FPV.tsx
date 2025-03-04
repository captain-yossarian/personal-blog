import React from "react";
import { Anchor } from "../Shared/Links";

import styled from "styled-components";

const Flex = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  margin-top: 24px;
`;

const FPV = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "3rem",
    }}
  >
    <div>
      <p>
        Благодійний фонд{" "}
        <Anchor
          text="Створені перемагати"
          href="https://www.facebook.com/people/%D0%91%D0%A4-%D0%A1%D1%82%D0%B2%D0%BE%D1%80%D0%B5%D0%BD%D1%96-%D0%9F%D0%B5%D1%80%D0%B5%D0%BC%D0%B0%D0%B3%D0%B0%D1%82%D0%B8/100087463445783/"
        />
        відкрив збір на FPV-дрони "Бомбери" для{" "}
        <Anchor
          text="155-ої окремої механізованої бригади"
          href="https://en.wikipedia.org/wiki/155th_Mechanized_Brigade_(Ukraine)"
        ></Anchor>
      </p>
      <p
        style={{
          display: "flex",
          justifyContent: "center",
          border: "2px solid #fdba08",
          borderRadius: "10px",
        }}
      >
        <Anchor
          href="https://send.monobank.ua/jar/AUdgydtFwG"
          text="Тут Ви знайдете монобанку"
          style={{
            width: "auto",
          }}
        />
      </p>
    </div>
    <div>
      <p>
        Fund{" "}
        <Anchor
          text="Built to win"
          href="https://stvoreni-peremahaty.com/pro-nas/"
        />{" "}
        started a drone campaign for
        <Anchor
          text="155th Separate Mechanized Brigade"
          href="https://en.wikipedia.org/wiki/155th_Mechanized_Brigade_(Ukraine)"
        ></Anchor>
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            border: "2px solid #fdba08",
            borderRadius: "10px",
          }}
        >
          <Anchor
            href="https://send.monobank.ua/jar/AUdgydtFwG"
            text="Here you can find a monobank jar"
            style={{
              width: "auto",
            }}
          />{" "}
        </p>
        <p> which we have opened to gather the money</p>
        <Flex>
          <img src="./155th_Infantry_Brigade_Insignia.png" />

          <Anchor
            href="https://stvoreni-peremahaty.com/pro-nas/"
            style={{
              backgroundColor: "#333330",
              height: "fit-content",
              width: "auto",
            }}
          >
            <img src="./built_to_win.webp" />
          </Anchor>
        </Flex>
      </p>
    </div>
    <div
      style={{
        width: "100%",
      }}
    >
      <video autoPlay loop muted playsInline controls={false}>
        <source type="video/mp4" src="/video.mp4" data-src="/video.mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
);

export default FPV;
