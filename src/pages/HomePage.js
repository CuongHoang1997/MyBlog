import React from "react";
import styled from "styled-components";
import Header from "components/layout/Header";
import HomeBanner from "module/home/HomeBanner";
import DefaultLayout from "components/layout/DefaultLayout";
import HomeFeature from "module/home/HomeFeature";
import HomeNewest from "module/home/HomeNew";

const HomePageStyle = styled.div``;

const HomePage = () => {
  return (
    <HomePageStyle>
      <DefaultLayout>
        <HomeBanner></HomeBanner>
        <HomeFeature></HomeFeature>
        <HomeNewest></HomeNewest>
      </DefaultLayout>
    </HomePageStyle>
  );
};

export default HomePage;
